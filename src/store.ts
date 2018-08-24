
import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import local from 'redux-persist/lib/storage'
import {formatHours} from './core'

export interface Item {
    name: string;
    calc: string;
    minutes: number;
}

export type State = {
    items: Item[];
    minutes: number;
    rate: number;
    insert?: number;
}

type Action = {
    type: 'ITEM_NEW';
    minutes?: number;
} | {
    type: 'ITEM_EDIT';
    index: number;
    item: Partial<Item>;
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
    items: [],
    minutes: 0,
    rate: 26,
}

function reducer(state = init_state, action: Action): State {
    let items = state.items.slice(0);
    switch (action.type) {
        case 'ITEM_NEW':
            return {
                ...state,
                items: (items.push({
                    name: '',
                    calc: action.minutes ? formatHours(action.minutes) : '',
                    minutes: action.minutes || 0,
                }), items),
                minutes: sum(items),
            }
        
        case 'ITEM_EDIT':
            return {
                ...state,
                items: (items[action.index] = {
                    ...items[action.index],
                    ...action.item,
                }, items),
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
                ...state,
                items: [],
                minutes: 0,
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
