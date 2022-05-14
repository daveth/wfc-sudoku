import { basis, isUnit } from "../source/vector";

describe("Vector", function () {
  test("Basis vectors are unit", function () {
    const x = basis();
    expect(x.magnitude()).toBe(1);
    expect(isUnit(x)).toBeTruthy();
  });
});
