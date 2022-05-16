/**
 *
 */
export interface Vector<T = any> {
  equals(rhs: T): boolean;
  magnitude(): number;

  add(rhs: T): Vector;
  sub(rhs: T): Vector;
  negate(): Vector;

  scale(k: number): Vector;
  unit(): UnitVector;

  dot(rhs: T): number;
}

/**
 *
 */
export interface UnitVector<T = any> extends Vector<T> {
  magnitude(): 1;
}

/**
 *
 */
export function isUnit(v: Vector): v is UnitVector {
  return v.magnitude() === 1;
}
