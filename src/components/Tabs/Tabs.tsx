import React, { useState } from 'react';
// import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Search from '../Search/Search';

export class TabsOverview extends React.Component {
    private count = 0;

    state = { 
        activeTab: 'hofdfdfme',
        tabs:[
            {name: 'Tab Test', key: 'hofdfdfme', info: 'info 1'},
        {name: 'Tab Test 2', key: 'home2', info: 'info 2'}
        ]
    };

    public addTab(){
        this.setState((state: any)=>{
            return {tabs: state.tabs.concat([{name: 'Tab ' + this.count, key: 'tab ' + this.count, info: 'info ' + this.count }])};
        });
        this.count = this.count + 1;
    }

    public removeTab(tabToRemove: any){
        this.setState((state: any)=>{
            if(state.tabs.length === 1) {
                return;
            }
            let indexToRemove = state.tabs.indexOf(tabToRemove);

            return {
                activeTab: state.tabs[indexToRemove > 0 ? indexToRemove - 1 : 0].key,
                tabs: state.tabs.filter((tab: any)=>tab !== tabToRemove)
            }
        });

    }

    public setActiveTab(key: string) {
        this.setState({activeTab: key});
    }

    render() {
        return (
            <>
            <button onClick={this.addTab.bind(this)}>add</button>
            <Tabs id="controlled-tab-example" activeKey={this.state.activeTab} onSelect={(k: any) => this.setActiveTab(k)}>
                {this.state.tabs.map((tab: any)=>{
                            return (
                            <Tab key={tab.key} eventKey={tab.key} title={tab.name}>
                                <button onClick={(event)=>{this.removeTab(tab)}}>Remove</button>
                                <div>{tab.info}</div>
                                <div><Search/></div>
                            </Tab>
                            )
                })}
            </Tabs>
            </>
        );
    }
}