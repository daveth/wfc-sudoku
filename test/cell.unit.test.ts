import { Cell } from "../source/cell";
import { oneOf } from "../source/digit";

describe("Cell", function () {
  test("", function () {
    const cell = new Cell(oneOf(1, 2, 3, 4));
    expect(cell.couldBe(4)).toBeTruthy();

    cell.isNot(4);
    expect(cell.couldBe(4)).toBeFalsy();
  });
});
