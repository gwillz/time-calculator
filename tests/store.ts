
import * as test from 'tape'
import reducer, {sum, Action} from '../src/appstate'

test('sum() of items', assert => {
    const items = [
        {
            value: 'abc',
            minutes: 100
        },
        {
            value: 'xyz',
            minutes: 123
        },
        {
            value: '1234',
            minutes: 10
        }
    ]
    
    const actual = sum(items);
    const expected = 233;
    
    assert.equal(actual, expected);
    assert.end();
})

test('ITEM_NEW empty', assert => {
    const action: Action = {
        type: 'ITEM_NEW',
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.items.length, 2);
    assert.equal(state.items[0].minutes, 0);
    assert.equal(state.items[1].minutes, 0);
    assert.end();
})

test('ITEM_NEW with minutes', assert => {
    const action: Action = {
        type: 'ITEM_NEW',
        minutes: 100,
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.items.length, 1);
    assert.equal(state.items[0].minutes, 100);
    assert.equal(state.items[0].value, '1:40');
    assert.equal(state.minutes, 100);
    assert.end();
})

test('ITEM_EDIT', assert => {
    const action: Action = {
        type: 'ITEM_EDIT',
        index: 0,
        item: {
            value: '1:23 + 1:23',
            minutes: 166,
        }
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.items.length, 1);
    assert.equal(state.items[0].minutes, 166);
    assert.equal(state.minutes, 166);
    assert.end();
})

test('ITEM_REMOVE', assert => {
    const action: Action = {
        type: 'ITEM_REMOVE',
        index: 0,
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.items.length, 0);
    assert.equal(state.minutes, 0);
    assert.end();
})

test('ITEM_CLEAR', assert => {
    const action: Action = {
        type: 'ITEM_CLEAR',
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.items.length, 1);
    assert.deepEqual(state.items[0], {
        value: '',
        minutes: 0,
    });
    assert.equal(state.minutes, 0);
    assert.equal(state.version, 1);
    assert.end();
})

test('RATE_EDIT', assert => {
    const action: Action = {
        type: 'RATE_EDIT',
        rate: 100,
    }
    const state = reducer(undefined, action);
    
    assert.equal(state.rate, 100);
    assert.end();
})

test('INSERT', assert => {
    let state, action: Action;
    
    action = {
        type: 'INSERT_READY',
        insert: 100,
    }
    state = reducer(undefined, action);
    
    assert.equal(state.items.length, 1);
    assert.equal(state.items[0].minutes, 0);
    assert.equal(state.insert, 100);
    
    action = {
        type: 'ITEM_EDIT',
        index: 0,
        item: {
            value: '1:40',
            minutes: 100,
        }
    }
    state = reducer(state, action);
    
    assert.equal(state.items.length, 1);
    assert.equal(state.items[0].minutes, 100);
    assert.equal(state.minutes, 100);
    assert.equal(state.insert, 100);
    
    action = {
        type: 'INSERT_DONE'
    }
    state = reducer(state, action);
    
    assert.equal(state.items.length, 1);
    assert.equal(state.items[0].minutes, 100);
    assert.equal(state.minutes, 100);
    assert.equal(state.insert, undefined);
    assert.end();
})
