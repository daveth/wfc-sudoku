import { SudokuCell } from "../source/cell";

describe("SudokuCell", function () {
  test("", function () {
    const cell = SudokuCell.unknown();
    console.log(cell.value.toString());

    cell.isNot(4);
    console.log(cell.value.toString());
  });
});
