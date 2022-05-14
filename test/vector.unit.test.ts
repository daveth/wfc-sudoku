import { zero, basis, isUnit } from "../source/vector";

describe("Vector", function () {
  const e1 = basis("e1");
  const e2 = basis("e2");
  const e3 = basis("e3");

  test("The zero vector has zero magnitude", function () {
    expect(zero().magnitude()).toBe(0);
  });

  test("Basis vectors are unit magnitude", function () {
    expect(e1.magnitude()).toBe(1);
    expect(isUnit(e1)).toBeTruthy();
  });

  test.each([
    [e1, e1, true],
    [e1, e2, false],
    [e2, e1, false],
    [e2, e2, true],
    [e1, e3, false],
    [e2, e3, false],
  ])("Basis vector equality makes sense", (a, b, r) => expect(a.eq(b)).toBe(r));

  test("Vector addition identities", function () {
    const x = e1.add(e2);
    const y = x.sub(e2);
    console.log(x.toString());
    console.log(y.toString());
    expect(e1.eq(y)).toBeTruthy();
  });
});
