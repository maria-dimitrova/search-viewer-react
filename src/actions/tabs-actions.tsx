import ITab from "../components/Tabs/ITab";

export const SET_ACTIVE_TAB = 'tabs:setActiveTab';
export const ADD_TAB = 'tabs:addTab';
export const REMOVE_TAB = 'tabs:removeTab';

export function setActiveTab(id: string) {
    return {
        type: SET_ACTIVE_TAB,
        payload: { id }
    }
}

export function addTab(tab: ITab){
    return {
        type: ADD_TAB,
        payload: { tab }
    }
}

export function removeTab(tab: ITab){
    return {
        type: REMOVE_TAB,
        payload: { tab }
    }
}