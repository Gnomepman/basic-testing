// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: -100, b: -20, action: Action.Subtract, expected: -80 },
  { a: 10, b: 4, action: Action.Multiply, expected: 40 },
  { a: 4, b: 10, action: Action.Multiply, expected: 40 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 10000, b: 1, action: Action.Divide, expected: 10000 },
  { a: 0, b: 2324314, action: Action.Divide, expected: 0 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return the correct result $expected for $action when a = $a and b = $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a: a, b: b, action: action });
      expect(result).toBe(expected);
    },
  );
});
