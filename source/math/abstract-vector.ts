import { Vector, UnitVector } from "./vector";
import { AbstractBasis } from "./abstract-basis";
import { LinearSum } from "./linear-sum";

/**
 * Represents a linear sum of abstract basis vectors.
 */
export class AbstractVector implements Vector<AbstractVector | AbstractBasis> {
  private readonly data: LinearSum<AbstractBasis>;

  private constructor(elems: Iterable<[AbstractBasis, number]>) {
    this.data = LinearSum.from(elems);
  }

  /* ------------------------------------------------------------------------ */

  /**
   * Returns a representation of the zero vector.
   */
  public static zero() {
    return new AbstractVector([]);
  }

  /**
   * Constructs a new basis vector.
   * NOTE: Convenience to avoid the user needing to import AbstractBasis.
   */
  public static basis(id: string) {
    return AbstractBasis.create(id);
  }

  /**
   * Constructs a vector from a sequence of [basis, coeffient] pairs.
   */
  public static from(elems: Iterable<[AbstractBasis, number]>) {
    return new AbstractVector(elems);
  }

  /**
   * Constructs a vector from a parameter list of [basis, coeffient] pairs.
   */
  public static of(...elems: Array<[AbstractBasis, number]>) {
    return new AbstractVector(elems);
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public equals(that: AbstractBasis | AbstractVector) {
    if (that instanceof AbstractBasis) {
      if (this.data.size !== 1) return false;
      return this.data.get(that) === 1;
    }

    return this.data.equals(that.data);
  }

  /**
   *
   */
  public magnitude() {
    return Math.sqrt([...this.data].reduce((s, [, k]) => s + k * k, 0));
  }

  /**
   *
   */
  public scale(k: number) {
    return new AbstractVector(this.data.scale(k));
  }

  /**
   *
   */
  public unit() {
    if (this.data.size === 1) {
      const [first] = this.data;
      const [elem] = first!;
      return elem;
    }

    return this.scale(1 / this.magnitude()) as UnitVector;
  }

  /**
   *
   */
  public negate() {
    return this.scale(-1);
  }

  /**
   *
   */
  public add(that: AbstractBasis | AbstractVector) {
    const res = this.data.add(that instanceof AbstractBasis ? that : that.data);
    return new AbstractVector(res);
  }

  /**
   *
   */
  public sub(that: AbstractBasis | AbstractVector) {
    const res = this.data.sub(that instanceof AbstractBasis ? that : that.data);
    return new AbstractVector(res);
  }

  /**
   *
   */
  public dot(that: AbstractBasis | AbstractVector) {
    if (that instanceof AbstractBasis) return this.data.get(that);
    return [...this.data].reduce((s, [e, k]) => s + k * that.data.get(e), 0);
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public get [Symbol.toStringTag]() {
    return "AbstractVector";
  }

  /**
   *
   */
  public toString() {
    return this.data.toString();
  }
}
