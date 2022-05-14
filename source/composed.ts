import { Vector, UnitVector } from "./vector";

export class ComposedVector<T> implements Vector<T> {
  private constructor(private readonly data: ReadonlyMap<Vector<T>, number>) {}

  private decompose(): Array<[Vector<T>, number]> {
    const entries = Array.from(this.data);
    return entries.flatMap(([vec, k]) => {
      if (vec instanceof ComposedVector) return vec.decompose();
      return [[vec, k]];
    });
  }

  public static zero() {
    return new ComposedVector(new Map());
  }

  public static from<T>(...values: [Vector<T>, number][]) {
    const data = new Map<Vector<T>, number>();
    const contibute = ([v, k]: [Vector<T>, number]) => {
      const ks = (data.get(v) || 0) + k;
      if (ks === 0) data.delete(v);
      else data.set(v, ks);
    };

    for (const [v, k] of values) {
      if (v instanceof ComposedVector)
        v.decompose()
          .map(([c, ck]): [Vector<T>, number] => [c, k * ck])
          .forEach(contibute);
      else contibute([v, k]);
    }

    return new ComposedVector(data);
  }

  /* ------------------------------------------------------------------------ */

  //
  public eq(that: Vector<T>): boolean {
    if (this === that) return true;

    if (this.data.size === 1) {
      const [v, k] = [...this.data][0]!;
      if (k === 1) return v.eq(that);
    }

    if (that instanceof ComposedVector) {
      if (this.data.size !== that.data.size) return false;
      for (const [v, k] of this.data) if (that.data.get(v) !== k) return false;
      return true;
    }

    return that.eq(this);
  }

  //
  public magnitude() {
    if (this.data.size === 0) return 0;

    const squared = [...this.data.values()]
      .map((k) => k * k)
      .reduce((sum, k2) => sum + k2);

    return Math.sqrt(squared);
  }

  //
  public unit(): UnitVector<T> {
    return this.scale(1 / this.magnitude()) as UnitVector<T>;
  }

  //
  public neg() {
    return this.scale(-1);
  }

  //
  public scale(k: number) {
    const data = new Map(this.data);
    for (const [vec, coef] of data) data.set(vec, coef * k);
    return new ComposedVector(data);
  }

  //
  public add(that: Vector<T>): Vector<T> {
    return ComposedVector.from(...this.decompose(), [that, 1]);
  }

  //
  public sub(that: Vector<T>): Vector<T> {
    return ComposedVector.from(...this.decompose(), [that, -1]);
  }

  //
  public dot(rhs: Vector<T>) {
    return [...this.data]
      .map(([vec, coef]) => vec.dot(rhs) * coef)
      .reduce((sum, e) => sum + e);
  }

  //
  public toString() {
    return [...this.data]
      .map(([e, k]) => (k === 1 ? `${e}` : `(${k} * ${e})`))
      .reduce((s, p, i) => s + (i === 0 ? "" : " + ") + p, "");
  }
}
