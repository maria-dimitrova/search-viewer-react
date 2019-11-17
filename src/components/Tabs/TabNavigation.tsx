import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Search from '../Search/Search';
import Grid from '../Grid/Grid';
import { connect } from 'react-redux';
import { setActiveTab, addTab, removeTab } from '../../actions/tabs-actions';
import ITab from './ITab';

interface ITabNavigation {
    tabs: [];
    activeTab: ITab;
    onSetActiveTab(id: string): void;
    onAddTab(tab: ITab): void;
    onRemoveTab(tab: ITab): void;
}

class TabNavigation extends React.Component<ITabNavigation> {
    private count = 1;

    constructor(props: any){
        super(props);

        this.onSetActiveTab = this.onSetActiveTab.bind(this);
        this.onAddTab = this.onAddTab.bind(this);
        this.onRemoveTab = this.onRemoveTab.bind(this);
    }
    
    componentDidMount() {
        this.onAddTab();
        this.onSetActiveTab("1");
    }

    public onSetActiveTab(id: string) {
        this.props.onSetActiveTab(id);
    }

    public onAddTab(): void {
        this.props.onAddTab(this.createTab());
        this.count = this.count + 1;
    }

    public onRemoveTab(tab: ITab) {
        this.props.onRemoveTab(tab);
    }

    private createTab(): ITab {
        return {
            name: `Tab ${this.count}`,
            id: this.count.toString(),
            searchProperties: { type: null, query: ""},
            searchResult: []
        };
    }

    private createTabsNavBar(){
        return (
            <Tabs id="controlled-tab-example" activeKey={this.props.activeTab.id.toString()} onSelect={this.onSetActiveTab} onScroll={()=>{console.log('scroll')}}>
                {this.props.tabs.map((tab: ITab)=>{
                    return (
                    <Tab key={tab.id} eventKey={tab.id} title={tab.name}>
                        <div>
                            <div className="text-right">{this.props.tabs.length >= 2 && <Button className="m-2" variant="outline-dark" size="sm" onClick={()=>this.onRemoveTab(tab)}>Close this tab X</Button>}</div>
                            <div className="search-container"><Search/></div>
                            <div><Grid/></div>
                        </div>
                    </Tab>
                    )
                })}
            </Tabs>
        );
    }

    public render() {
        return (
            <>
                <div className="text-right m-1"><Button className="m-1" variant="outline-secondary" size="sm" onClick={this.onAddTab}>Add new tab +</Button></div>
                {this.createTabsNavBar()}
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    tabs: state.tabs,
    activeTab: state.activeTab
});

const mapActionsToProps = {
    onSetActiveTab: setActiveTab,
    onAddTab: addTab,
    onRemoveTab: removeTab
};

export default connect(mapStateToProps, mapActionsToProps)(TabNavigation);