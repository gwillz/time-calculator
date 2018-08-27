
import * as test from 'tape'
import {calculate, formatHours} from '../src/core'

test('calculate() simple', assert => {
    const actual = calculate('1:23');
    const expected = 83;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() minutes', assert => {
    const actual = calculate('0:16');
    const expected = 16;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() shorthand hours', assert => {
    const actual = calculate('4:');
    const expected = 240;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() shorthand minutes', assert => {
    const actual = calculate(':56');
    const expected = 56;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() with sign', assert => {
    const actual = calculate('+ 2:34');
    const expected = 154;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() negative', assert => {
    const actual = calculate('- 5:10');
    const expected = -310;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() minutes', assert => {
    const actual = calculate('- 0:11');
    const expected = -11;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() positive sum', assert => {
    const actual = calculate('1:11 + 2:22');
    const expected = 213;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() negative sum', assert => {
    const actual = calculate('1:11 - 2:22');
    const expected = -71;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() complex', assert => {
    const actual = calculate('+ :10 - 6:55 + 4:30 + 3:');
    const expected = 225;
    
    assert.equal(actual, expected);
    assert.end();
})

test('calculate() invalid', assert => {
    const actual = calculate('1.1');
    const expected = 0;
    
    assert.equal(actual, expected);
    assert.end();
})

test('formatHours() simple', assert => {
    const actual = formatHours(1000);
    const expected = '16:40';
    
    assert.equal(actual, expected);
    assert.end();
})

test('formatHours() single minute', assert => {
    const actual = formatHours(1);
    const expected = '0:01';
    
    assert.equal(actual, expected);
    assert.end();
})

test('formatHours() 61 minutes', assert => {
    const actual = formatHours(61);
    const expected = '1:01';
    
    assert.equal(actual, expected);
    assert.end();
})

test('formatHours() negative', assert => {
    const actual = formatHours(-100);
    const expected = '-1:40';
    
    assert.equal(actual, expected);
    assert.end();
})
