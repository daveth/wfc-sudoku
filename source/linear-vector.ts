import { Vector } from "./vector";

export class LinearSum<T> implements Vector<T> {
  private constructor(private readonly data: ReadonlyMap<Vector<T>, number>) {}

  private decompose(): Array<{ vec: Vector<T>; k: number }> {
    return Array.from(this.data.entries()).flatMap(([vec, k]) => {
      if (vec instanceof LinearSum) return vec.decompose();
      return { vec, k };
    });
  }

  public static zero() {
    return new LinearSum(new Map());
  }

  public static from<T>(...values: { vec: Vector<T>; k: number }[]) {
    const coefficients = new Map<Vector<T>, number>();
    const contribute = ({ vec, k }: { vec: Vector<T>; k: number }) => {
      const coeff = (coefficients.get(vec) || 0) + k;
      if (coeff === 0) coefficients.delete(vec);
      else coefficients.set(vec, coeff);
    };

    for (const { vec, k } of values) {
      if (vec instanceof LinearSum) vec.decompose().forEach(contribute);
      else contribute({ vec, k });
    }

    return new LinearSum(coefficients);
  }

  /* ------------------------------------------------------------------------ */

  //
  public magnitude() {
    const squared = [...this.data.values()]
      .map((k) => k * k)
      .reduce((sum, k2) => sum + k2);

    return Math.sqrt(squared);
  }

  //
  public unit() {
    return this.scale(1 / this.magnitude());
  }

  //
  public neg() {
    return this.scale(-1);
  }

  //
  public scale(k: number) {
    const data = new Map(this.data.entries());
    for (const [vec, coef] of data) data.set(vec, coef * k);
    return new LinearSum(data);
  }

  //
  public add(that: Vector<T>): Vector<T> {
    return LinearSum.from({ vec: this, k: 1 }, { vec: that, k: 1 });
  }

  //
  public sub(that: Vector<T>): Vector<T> {
    return LinearSum.from({ vec: this, k: 1 }, { vec: that, k: -1 });
  }

  //
  public dot(rhs: Vector<T>) {
    return [...this.data.entries()]
      .map(([vec, coef]) => vec.dot(rhs) * coef)
      .reduce((sum, e) => sum + e);
  }

  //
  public toString() {
    return [...this.data.entries()]
      .map(([e, k]) => (k === 1 ? `${e}` : `(${k} * ${e})`))
      .reduce((s, p, i) => s + (i === 0 ? "" : " + ") + p, "");
  }
}
