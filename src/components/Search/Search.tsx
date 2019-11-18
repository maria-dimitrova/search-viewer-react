import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setSearchResult, setSearchType, updateSearchInput, addResult, addActionToStore } from '../../actions/search-actions';

const BUTTON_STATE: { ACTIVE: 'info', INACTIVE: 'outline-secondary' } = {
    ACTIVE: 'info',
    INACTIVE: 'outline-secondary'
};
const SEARCH_TYPE = {
    WEB: null,
    IMAGE: 'image'
};

interface ISearch {
    query: string;
    type: "outline-secondary" | "info";
    result: [];
    onSetSearchResult(result: []): void;
    onUpdateSearchInput(event: any): void;
    onSetSearchType(type: string | null): void;
    onAddResult(result: []): void;
    onAddActionToStore(fn: any): void;
}

class Search extends React.Component<ISearch> {
    private startSearchIndex = 1;
    private scrollExecuting = false;

    constructor(props: any){
        super(props);
        this.onSetSearchResult = this.onSetSearchResult.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onSetSearchType = this.onSetSearchType.bind(this);
        this.onSearchExecute = this.onSearchExecute.bind(this);
        this.addScrollEventHandler();
        this.props.onAddActionToStore(this.onSearchExecute);
    }

    public onSetSearchResult(result: []) {
        this.props.onSetSearchResult(result);
    }

    private onSetSearchType(type: string | null): void {
        this.props.onSetSearchType(type);
    }

    private inputChange(event: any): void {
        this.props.onUpdateSearchInput(event.target ? event.target.value : "");
    }

    private addScrollEventHandler() {
        window.onscroll = () => {
            let scrollHeight = document.body.scrollHeight,
                totalHeight = window.scrollY + window.innerHeight;
        
            if(totalHeight >= scrollHeight && !this.scrollExecuting) {
                this.scrollExecuting = true;
                this.onSearchExecute('scroll').finally(()=>{this.scrollExecuting = false;});
            }
        };
    }

    public onSearchExecute(event?: string) {
        if(event !== 'scroll') {
            this.startSearchIndex = 1;
        }

        return new Promise((resolve, reject)=>{gapi.client.search.cse.list({   
            q: this.props.query,
            cx: "010854315116711862176:asahfhyujqz",
            searchType: this.props.type,
            start: this.startSearchIndex
        })
        .then((response: any) => {
            let result = [];
            if(this.props.type === SEARCH_TYPE.IMAGE) {
                result = response.result.items.map((imageInfo: any) => {
                    return {
                        title: imageInfo.title,
                        thumbnail: imageInfo.image.thumbnailLink,
                        link: imageInfo.link
                    }
                });
            } else {
                result = response.result.items.reduce((result: any[], videoInfo: any) => {
                    if(videoInfo.pagemap.videoobject) {
                        let videoObj = videoInfo.pagemap.videoobject[0];
                        result.push({
                            title: videoInfo.title,
                            thumbnail: videoObj.thumbnailurl,
                            link: videoObj.embedurl
                        })
                    }
                    return result;
                }, []);
            }
            this.startSearchIndex = response.result.queries.nextPage[0].startIndex;
            if(event === 'scroll'){
                this.props.onAddResult(result);
            } else {
                this.props.onSetSearchResult(result);
            }
            resolve();
        }, (error: any) => {
            console.error("Execute error", error);
            reject(error);
        })}).catch(()=>{});
    }

    public render() {
        return (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={this.props.query}
                    onChange={this.inputChange}
                    />
                    <InputGroup.Append>
                        <Button onClick={()=>this.onSetSearchType(SEARCH_TYPE.WEB)} variant={this.props.type === SEARCH_TYPE.WEB ? BUTTON_STATE.ACTIVE : BUTTON_STATE.INACTIVE}>Video</Button>
                        <Button onClick={()=>this.onSetSearchType(SEARCH_TYPE.IMAGE)} variant={this.props.type === SEARCH_TYPE.IMAGE ? BUTTON_STATE.ACTIVE : BUTTON_STATE.INACTIVE}>Image</Button>
                        <Button onClick={()=>this.onSearchExecute()} variant="secondary" disabled={this.props.query === ""}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    query: state.activeTab.searchProperties.query,
    type: state.activeTab.searchProperties.type,
    result: state.activeTab.searchResult
});

const mapActionsToProps = {
    onSetSearchType: setSearchType,
    onSetSearchResult: setSearchResult,
    onUpdateSearchInput: updateSearchInput,
    onAddResult: addResult,
    onAddActionToStore: addActionToStore
};

export default connect(mapStateToProps, mapActionsToProps)(Search);