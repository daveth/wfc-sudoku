import { Vector, UnitVector } from "./vector";
import { AbstractVector } from "./abstract-vector";

/**
 * Represents an abstract basis vector with some ID.
 * Each instance is a unique unit vector perpendicular to every other instance.
 */
export class AbstractBasis implements UnitVector<AbstractBasis> {
  private constructor(public readonly id: string) {}

  /**
   *
   */
  public static create(id: string) {
    return new AbstractBasis(id);
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public equals(that: AbstractBasis) {
    return this === that;
  }

  /**
   *
   */
  public magnitude(): 1 {
    return 1;
  }

  /**
   *
   */
  public add(that: AbstractBasis) {
    return AbstractVector.of([this, 1], [that, 1]);
  }

  /**
   *
   */
  public sub(that: AbstractBasis) {
    return AbstractVector.of([this, 1], [that, -1]);
  }

  /**
   *
   */
  public negate(): Vector {
    return this.scale(-1);
  }

  /**
   *
   */
  public scale(k: number) {
    return AbstractVector.of([this, k]);
  }

  /**
   *
   */
  public unit(): UnitVector {
    return this;
  }

  /**
   *
   */
  public dot(_: AbstractBasis): number {
    return 0;
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public get [Symbol.toStringTag]() {
    return "AbstractBasis";
  }

  /*
   *
   */
  public toString() {
    return this.id;
  }
}
