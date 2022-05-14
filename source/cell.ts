import { Vector, basis, sum } from "./vector";

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function* count(min: number, max: number) {
  for (let i = min; i <= max; i++) yield i;
}

function* digits() {
  yield* count(1, 9) as Generator<Digit>;
}

function* map<T, U>(g: Iterable<T>, f: (e: T) => U): Generator<U> {
  for (const e of g) yield f(e);
}

function toLookup<KT extends string | number, VT>(entries: Iterable<[KT, VT]>) {
  type Res = { [K in KT]: VT };

  return Array.from(entries)
    .map(([k, v]) => ({ [k]: v }))
    .reduce((res: Res, cur) => Object.assign(res, cur), {} as Res);
}

export class SudokuCell {
  private static readonly bases = toLookup(map(digits(), (d) => [d, basis(d)]));
  private constructor(private _value: Vector) {}

  /* ------------------------------------------------------------------------ */

  public static unknown(): SudokuCell {
    return new SudokuCell(sum(...Object.values(this.bases)));
  }

  public static solved(digit: Digit) {
    return new SudokuCell(this.bases[digit]);
  }

  public static oneOf(...digits: Digit[]): SudokuCell {
    return new SudokuCell(sum(...digits.map((d) => this.bases[d])));
  }

  /* ------------------------------------------------------------------------ */

  public get value() {
    return this._value;
  }

  public isNot(digit: Digit) {
    const u = SudokuCell.bases[digit];
    const p = u.scale(this.value.dot(u));
    this._value = this.value.sub(p);
  }

  public couldBe(digit: Digit): boolean {
    const query = SudokuCell.bases[digit];
    return this.value.dot(query) > 0;
  }
}
