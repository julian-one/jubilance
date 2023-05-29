import { add, multiply } from "../src/math";

describe("math functions", () => {
  test("multiply 5 by 3", () => {
    const result = multiply(5, 3);
    expect(result).toEqual(15);
  });

  test("add 5 by 3", () => {
    const result = add(5, 3);
    expect(result).toEqual(8);
  });
});