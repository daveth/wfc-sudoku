import { Vector, UnitVector } from "./vector";
import { ComposedVector } from "./composed";

export class BasisVector<T> implements UnitVector<T> {
  private constructor(public readonly value?: T) {}

  public static create(): BasisVector<void>;
  public static create<T>(value: T): BasisVector<T>;
  public static create<T>(value?: T): BasisVector<T> {
    return new BasisVector(value!);
  }

  /* ----------------------------------------------------------------------- */

  public eq(that: Vector<T>): boolean {
    if (that instanceof BasisVector) return this === that;
    return that.eq(this);
  }

  public magnitude(): 1 {
    return 1;
  }

  public neg(): Vector<T> {
    return this.scale(-1);
  }

  public unit(): UnitVector<T> {
    return this;
  }

  public scale(k: number): Vector<T> {
    if (k === 1) return this;
    return ComposedVector.from([this, k]);
  }

  public add(that: Vector<T>): Vector<T> {
    return ComposedVector.from([this, 1], [that, 1]);
  }

  public sub(that: Vector<T>): Vector<T> {
    return ComposedVector.from([this, 1], [that, -1]);
  }

  public dot(that: Vector<T>) {
    if (this === that) return 1;
    return 0;
  }

  public toString() {
    return String(this.value);
  }
}
