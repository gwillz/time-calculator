
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
    version: string;
}

export type Action = {
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
    version: 'a',
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
                version: state.minutes > 0
                    ? nextVersion(state.version) : state.version,
                minutes: sum(items),
            }
        
        case 'ITEM_CLEAR':
            return {
                ...init_state,
                rate: state.rate,
                version: nextVersion(state.version),
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

export function sum(items: Item[]) {
    return items.reduce((sum, item) => sum + item.minutes, 0);
}

export function nextVersion(version: string) {
    return (parseInt(version, 36) + 1).toString(36);
}

export default reducer;
