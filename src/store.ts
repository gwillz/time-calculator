
import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import local from 'redux-persist/lib/storage'

export interface Item {
    name: string;
    calc: string;
    minutes: number;
}

export type State = {
    items: Item[];
    minutes: number;
    rate: number;
}

type Action = {
    type: 'ITEM_NEW';
} | {
    type: 'ITEM_EDIT';
    index: number;
    item: Partial<Item>;
} | {
    type: 'ITEM_REMOVE';
    index: number;
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
                    calc: '',
                    minutes: 0,
                }), items)
            }
        
        case 'ITEM_EDIT':
            items[action.index] = {
                ...items[action.index],
                ...action.item,
            }
            
            return {
                ...state,
                items,
                minutes: items.reduce((sum, item) => sum + item.minutes, 0),
            }
        
        case 'ITEM_REMOVE':
            items.splice(action.index, 1);
            return {
                ...state,
                items,
            }
    }
    return state;
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
