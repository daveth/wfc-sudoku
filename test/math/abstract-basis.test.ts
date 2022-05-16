import { AbstractBasis } from "../../source/math/abstract-basis";

/**
 *
 */
describe("AbstractBasis", function () {
  const e1 = AbstractBasis.create("e1");
  const e2 = AbstractBasis.create("e2");
  const e3 = AbstractBasis.create("e3");

  test.each([e1, e2, e3])("are unit magnitude", (v) =>
    expect(v.magnitude()).toBe(1)
  );

  test.each([
    [e1, e2],
    [e2, e3],
    [e3, e1],
  ])("are mutually not equal", (a, b) => expect(a.equals(b)).toBeFalsy());

  test.each([
    [e1, e2],
    [e2, e3],
    [e3, e1],
  ])("are mutually perpendicular", (a, b) => expect(a.dot(b)).toBe(0));
});
