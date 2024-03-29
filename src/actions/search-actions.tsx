export const SET_SEARCH_RESULT = 'search:setResult';
export const UPDATE_SEARCH_INPUT = 'search:updateInput';
export const SET_SEARCH_TYPE = 'search:setType';
export const ADD_RESULT = 'search:addResult';
export const ADD_ACTION = 'search:addAction';
export const EXECUTE_SEARCH_FN = 'search:executeSearchFn';

export function setSearchResult(result: any[]){
    return {
        type: SET_SEARCH_RESULT,
        payload: { result }
    }
}

export function updateSearchInput(inputValue: string) {
    return {
        type: UPDATE_SEARCH_INPUT,
        payload: { inputValue }
    }
}

export function setSearchType(type: string | null) {
    return {
        type: SET_SEARCH_TYPE,
        payload: { type }
    }
}

export function addResult(result: any) {
    return {
        type: ADD_RESULT,
        payload: { result }
    }
}

export function addActionToStore(fn: any) {
    return {
        type: ADD_ACTION,
        payload: { fn }
    }
}

export function executeSearchFn() {
    return {
        type: EXECUTE_SEARCH_FN
    }
}