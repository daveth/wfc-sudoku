import { BasisVector } from "./basis-vector";
import { LinearSum } from "./linear-vector";

/* -------------------------------------------------------------------------- */

export interface Vector<T = void> {
  magnitude(): number;
  scale(k: number): Vector<T>;
  unit(): Vector<T>;
  neg(): Vector<T>;

  add(rhs: Vector<T>): Vector<T>;
  sub(rhs: Vector<T>): Vector<T>;
  dot(rhs: Vector<T>): number;
}

export interface UnitVector<T = void> extends Vector<T> {
  magnitude(): 1;
}

export function isUnit<T>(vec: Vector<T>): vec is UnitVector<T> {
  return vec.magnitude() === 1;
}

/* -------------------------------------------------------------------------- */

export function zero<T>(): Vector<T> {
  return LinearSum.zero();
}

export function sum<T>(...values: Vector<T>[]): Vector<T> {
  return LinearSum.from(...values.map((vec) => ({ vec, k: 1 })));
}

let anonBases = 0;

export function basis<T>(data?: T): UnitVector<T> {
  return BasisVector.create(data || `e${++anonBases}`);
}
