import { Vector } from "./math/vector";
import { Digit, knownValue } from "./digit";

export class Cell {
  private _state: Vector;

  public constructor(state: Vector) {
    this._state = state;
  }

  /* ------------------------------------------------------------------------ */

  public get state() {
    return this._state;
  }

  public isNot(value: Digit) {
    const u = knownValue(value);
    const p = u.scale(this.state.dot(u));
    this._state = this.state.sub(p);
  }

  public couldBe(value: Digit): boolean {
    const query = knownValue(value);
    return this.state.dot(query) > 0;
  }
}
