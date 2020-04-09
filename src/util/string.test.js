import { split } from './string';
import { toHumanCase } from './string';
import { toCamelCase } from './string';
import { transformString } from './string';

test('split', () => {
  expect(split('Test String').join(' ')).toBe('test string');
  expect(split('Test String A').join(' ')).toBe('test string a');
  expect(split('Test StringA').join(' ')).toBe('test string a');
  expect(split('Test String 1').join(' ')).toBe('test string 1');
  expect(split('Test String1').join(' ')).toBe('test string 1');
  expect(split('test string').join(' ')).toBe('test string');
  expect(split('tEst string').join(' ')).toBe('t est string');
  expect(split('tEst stRing').join(' ')).toBe('t est st ring');
  expect(split('test-string').join(' ')).toBe('test string');
  expect(split('test_string').join(' ')).toBe('test string');
  expect(split('test-string-123').join(' ')).toBe('test string 123');
  expect(split('test_string_123').join(' ')).toBe('test string 123');
  expect(split('test+string+123').join(' ')).toBe('test string 123');
  expect(split('test-string123').join(' ')).toBe('test string 123');
  expect(split('test_string123').join(' ')).toBe('test string 123');
  expect(split('testString123').join(' ')).toBe('test string 123');
  expect(split('test123String').join(' ')).toBe('test 123 string');
  expect(split('Test123string').join(' ')).toBe('test 123 string');
  expect(split('test  string   123').join(' ')).toBe('test string 123');
  expect(split('testAString').join(' ')).toBe('test a string');
  expect(split('ABCString').join(' ')).toBe('a b c string');
});

test('to human case', () => {
  expect(toHumanCase('testString')).toBe('Test String');
});

test('to camel case', () => {
  expect(toCamelCase('Test String')).toBe('testString');
});

test('transform string', () => {
  expect(
    transformString('translate', 100, '50%', 'rotate', 45, 'scaleX', '2.0')
  ).toBe('translate(100, 50%) rotate(45) scaleX(2.0)');
});
