import { toHumanCase } from './string';
import { toCamelCase } from './string';
import { transformString } from './string';

test('to human case', () => {
  expect(toHumanCase('Test String')).toBe('Test String');
  expect(toHumanCase('Test String A')).toBe('Test String A');
  expect(toHumanCase('Test StringA')).toBe('Test String A');
  expect(toHumanCase('Test String 1')).toBe('Test String 1');
  expect(toHumanCase('Test String1')).toBe('Test String 1');
  expect(toHumanCase('test string')).toBe('Test String');
  expect(toHumanCase('tEst string')).toBe('T Est String');
  expect(toHumanCase('tEst stRing')).toBe('T Est St Ring');
  expect(toHumanCase('test-string')).toBe('Test String');
  expect(toHumanCase('test_string')).toBe('Test String');
  expect(toHumanCase('test-string-123')).toBe('Test String 123');
  expect(toHumanCase('test_string_123')).toBe('Test String 123');
  expect(toHumanCase('test-string123')).toBe('Test String 123');
  expect(toHumanCase('test_string123')).toBe('Test String 123');
  expect(toHumanCase('testString123')).toBe('Test String 123');
  expect(toHumanCase('testsTring123')).toBe('Tests Tring 123');
  expect(toHumanCase('test  string   123')).toBe('Test String 123');
});

test('to camel case', () => {
  expect(toCamelCase('Test String')).toBe('testString');
  expect(toCamelCase('Test String A')).toBe('testStringA');
  expect(toCamelCase('Test StringA')).toBe('testStringA');
  expect(toCamelCase('Test String 1')).toBe('testString1');
  expect(toCamelCase('Test String1')).toBe('testString1');
  expect(toCamelCase('test string')).toBe('testString');
  expect(toCamelCase('tEst string')).toBe('tEstString');
  expect(toCamelCase('tEst stRing')).toBe('tEstStRing');
  expect(toCamelCase('test-string')).toBe('testString');
  expect(toCamelCase('test_string')).toBe('testString');
  expect(toCamelCase('test-string-123')).toBe('testString123');
  expect(toCamelCase('test_string_123')).toBe('testString123');
  expect(toCamelCase('test-string123')).toBe('testString123');
  expect(toCamelCase('test_string123')).toBe('testString123');
  expect(toCamelCase('testString123')).toBe('testString123');
  expect(toCamelCase('testsTring123')).toBe('testsTring123');
  expect(toCamelCase('test  string   123')).toBe('testString123');
});

test('transform string', () => {
  expect(
    transformString('translate', 100, '50%', 'rotate', 45, 'scaleX', '2.0')
  ).toBe('translate(100, 50%) rotate(45) scaleX(2.0)');
});
