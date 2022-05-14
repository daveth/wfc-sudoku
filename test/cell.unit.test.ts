import { SudokuCell } from "../source/cell";

describe("SudokuCell", function () {
  test("", function () {
    const cell = SudokuCell.unknown();
    expect(cell.couldBe(4)).toBeTruthy();

    cell.isNot(4);
    expect(cell.couldBe(4)).toBeFalsy();
  });
});
