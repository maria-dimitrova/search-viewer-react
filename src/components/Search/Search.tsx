import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setSearchResult, setSearchType, updateSearchInput, addResult } from '../../actions/search-actions';

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
}

class Search extends React.Component<ISearch> {
    private startSearchIndex = 1;

    constructor(props: any){
        super(props);
        this.onSetSearchResult = this.onSetSearchResult.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onSetSearchType = this.onSetSearchType.bind(this);
        this.onSearchExecute = this.onSearchExecute.bind(this);
        this.addScrollEventHandler();
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
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                this.onSearchExecute('scroll');
            }
        };
    }

    public onSearchExecute(event?: string) {
        if(event !== 'scroll') {
            this.startSearchIndex = 1;
        }

        gapi.client.search.cse.list({   
            q: this.props.query,
            cx: "010854315116711862176:asahfhyujqz",
            searchType: this.props.type,
            start: this.startSearchIndex
        })
        .then((response: any) => {
            let result = [];
            if(this.props.type === SEARCH_TYPE.IMAGE) {
                result = response.result.items.map((imageInfo: any)=>{
                    return {
                        title: imageInfo.title,
                        thumbnail: imageInfo.image.thumbnailLink,
                        link: imageInfo.link
                    }
                });
            } else {
                result = response.result.items.map((videoInfo: any) => {
                    let videoObj;
                    if(videoInfo.pagemap.videoobject) {
                        videoObj = videoInfo.pagemap.videoobject[0];
                    } else {
                        videoObj = videoInfo.pagemap.cse_image[0];
                    }
                    return {
                        title: videoObj.title || videoInfo.title,
                        thumbnail: videoObj.thumbnailurl || videoObj.src,
                        link: videoObj.url || videoInfo.link
                    }
                });
            }
            if(event === 'scroll'){
                this.startSearchIndex = response.result.queries.nextPage[0].startIndex;
                this.props.onAddResult(result);
            } else {
                this.startSearchIndex = 1;
                this.props.onSetSearchResult(result);
            }
        }, (error: any) => {
            console.error("Execute error", error);
        });
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
    onAddResult: addResult
};

export default connect(mapStateToProps, mapActionsToProps)(Search);