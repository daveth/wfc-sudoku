import { SudokuCell } from "../source/cell";

describe("SudokuCell", function () {
  test("", function () {
    const cell = SudokuCell.oneOf(1, 2, 3, 4);
    expect(cell.couldBe(4)).toBeTruthy();

    cell.isNot(4);
    expect(cell.couldBe(4)).toBeFalsy();
  });
});
