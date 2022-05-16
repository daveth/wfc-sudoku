import { LinearSum } from "../../source/math/linear-sum";

describe("LinearSum", function () {
  test("The zero sum equals itself", () =>
    expect(LinearSum.zero().equals(LinearSum.zero())).toBeTruthy());

  test("The zero sum has zero size", () =>
    expect(LinearSum.zero()).toHaveProperty("size", 0));

  test("The zero sum has no elements", () =>
    expect([...LinearSum.zero()]).toHaveLength(0));

  const x = LinearSum.of(["x", 1]);
  const y = LinearSum.of(["y", 1]);
  const z = LinearSum.of(["z", 1]);

  test.each([
    [x, x],
    [x, y],
    [y, z],
  ])("Equality is commutative", (a, b) =>
    expect(a.equals(b)).toEqual(b.equals(a))
  );

  test.each([
    [x, x],
    [x, y],
    [y, z],
  ])("Addition is commutative", (a, b) =>
    expect(a.add(b).equals(b.add(a))).toBeTruthy()
  );

  test("A sum's negative is its additive inverse", () =>
    expect(x.add(y).add(y.negate()).equals(x)).toBeTruthy());

  test("A sum subtracted from zero is equal to its negative", () =>
    expect(LinearSum.zero().sub(x).equals(x.negate())).toBeTruthy());

  test("A sum subtracted from itself is the zero sum", () =>
    expect(x.sub(x).equals(LinearSum.zero())).toBeTruthy());

  test("A sum scaled by zero is the zero sum", () =>
    expect(x.scale(0).equals(LinearSum.zero())).toBeTruthy());

  test("A sum added to itself equals the sum scaled by two", () =>
    expect(x.add(x).equals(x.scale(2))).toBeTruthy());
});
