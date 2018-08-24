
import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import local from 'redux-persist/lib/storage'
import {formatHours} from './core'

export interface Item {
    value: string;
    minutes: number;
}

export type State = {
    items: Item[];
    minutes: number;
    rate: number;
    insert?: number;
    version: number;
}

type Action = {
    type: 'ITEM_NEW';
    minutes?: number;
} | {
    type: 'ITEM_EDIT';
    index: number;
    item: Item;
} | {
    type: 'ITEM_REMOVE';
    index: number;
} | {
    type: 'ITEM_CLEAR';
} | {
    type: 'RATE_EDIT';
    rate: number;
} | {
    type: 'INSERT_READY';
    insert: number;
} | {
    type: 'INSERT_DONE';
}

const init_state: State = {
    items: [{
        value: '',
        minutes: 0,
    }],
    minutes: 0,
    rate: 26,
    version: 0,
}

function reducer(state = init_state, action: Action): State {
    let items = state.items.slice(0);
    switch (action.type) {
        case 'ITEM_NEW':
            if (state.items.length == 1 && state.minutes == 0 && action.minutes) {
                return {
                    ...state,
                    items: [{
                        value: formatHours(action.minutes),
                        minutes: action.minutes,
                    }],
                    insert: 0,
                    minutes: action.minutes,
                    version: state.version + 1,
                }
            }
            return {
                ...state,
                items: (items.push({
                    value: action.minutes ? formatHours(action.minutes) : '',
                    minutes: action.minutes || 0,
                }), items),
                insert: 0,
                minutes: sum(items),
            }
        
        case 'ITEM_EDIT':
            return {
                ...state,
                items: (items[action.index] = action.item, items),
                minutes: sum(items),
            }
        
        case 'ITEM_REMOVE':
            items.splice(action.index, 1);
            return {
                ...state,
                items,
                minutes: sum(items),
            }
        
        case 'ITEM_CLEAR':
            return {
                ...init_state,
                version: state.version + 1,
            }
        
        case 'RATE_EDIT':
            return {
                ...state,
                rate: action.rate,
            }
        
        case 'INSERT_READY':
            return {
                ...state,
                insert: action.insert,
            }
        
        case 'INSERT_DONE':
            return {
                ...state,
                insert: undefined,
            }
    }
    return state;
}

function sum(items: Item[]) {
    return items.reduce((sum, item) => sum + item.minutes, 0);
}

const persist = {
    key: 'loutime',
    storage: local,
}

export const store = createStore(
    persistReducer(persist, reducer),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export const persistor = persistStore(store);

export type Store = typeof store;

export default store;
