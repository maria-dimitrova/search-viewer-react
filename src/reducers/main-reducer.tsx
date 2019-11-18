import { SET_ACTIVE_TAB, ADD_TAB, REMOVE_TAB } from '../actions/tabs-actions';
import { SET_SEARCH_RESULT, SET_SEARCH_TYPE, UPDATE_SEARCH_INPUT, ADD_RESULT, ADD_ACTION, EXECUTE_SEARCH_FN } from '../actions/search-actions';
import ITab from '../components/Tabs/ITab';

const initialState = {
    name: "",
    id: "0",
    searchProperties: { query: "", type: null },
    searchResult: [] as any
};

function updateTabs(tabs: any, activeTabID: string,  payload: any) {
    return (fn: (tab: ITab, payload: any) => ITab) => {
        return tabs.map((tab: ITab) => {
            if(tab.id === activeTabID) {
                return fn(tab, payload);
            }
            return tab;
        });
    };
}

export default function reducer(state = { tabs: [] as any, activeTab: initialState, executeSearch: (e: string)=>{} }, { type, payload }: any) {
    const updateTabsFn = updateTabs(state.tabs, state.activeTab.id, payload);
    let updatedTabs: ITab[];
    switch(type) {
        case ADD_TAB:
            return { ...state, tabs: [...state.tabs, ...[payload.tab]], activeTab: payload.tab };
        case REMOVE_TAB:
            let tabIndexToRemove = state.tabs.indexOf(payload.tab);
            return {
                ...state,
                activeTab: state.tabs[tabIndexToRemove > 0 ? tabIndexToRemove - 1 : 1],
                tabs: state.tabs.filter((tab: ITab) => tab !== payload.tab)
            };
        case SET_ACTIVE_TAB:
            return { ...state, activeTab: state.tabs.find((tab: ITab) => { return tab.id.toString() === payload.id }) };
        case ADD_ACTION:
            return { ...state, executeSearch: payload.fn };
        case EXECUTE_SEARCH_FN:
            state.executeSearch('scroll');
            return state;
        case SET_SEARCH_TYPE:
            updatedTabs = updateTabsFn((tab: ITab, payload: any) => {
                tab.searchProperties.type = payload.type;
                return tab;
            })
            return { ...state, tabs: updatedTabs, activeTab: { ...state.activeTab, searchProperties: { ...state.activeTab.searchProperties, type: payload.type }} };
        case SET_SEARCH_RESULT:
            updatedTabs = updateTabsFn((tab: ITab, payload: any) => {
                tab.searchResult = payload.result;
                return tab;
            });
            return { ...state, tabs: updatedTabs, activeTab: { ...state.activeTab, searchResult: payload.result } };
        case ADD_RESULT:
            updatedTabs = updateTabsFn((tab: ITab, payload: any) => {
                tab.searchResult = [...tab.searchResult, ...payload.result];
                return tab;
            });
            return { ...state, tabs: updatedTabs, activeTab: { ...state.activeTab, searchResult: [...state.activeTab.searchResult, ...payload.result] } };
        case UPDATE_SEARCH_INPUT:
            updatedTabs = updateTabsFn((tab: ITab, payload: any) => {
                tab.searchProperties.query = payload.inputValue;
                return tab;
            });
            return { ...state, tabs: updatedTabs, activeTab: { ...state.activeTab, searchProperties: { ...state.activeTab.searchProperties, query: payload.inputValue } }};
        default:
            return state;
    }
}