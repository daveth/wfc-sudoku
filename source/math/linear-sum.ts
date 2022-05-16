/**
 * Represents a linear sum of scaled disjoint values.
 */
export class LinearSum<T> {
  private readonly elements: ReadonlyMap<T, number>;

  private constructor(elements: Iterable<[T, number]>) {
    this.elements = new Map(elements);
  }

  /* ------------------------------------------------------------------------ */

  /**
   * Constructs an empty linear sum
   */
  public static zero() {
    return new LinearSum([]);
  }

  /**
   * Constructs a linear sum of a single unscaled element.
   */
  public static atom<T>(value: T): LinearSum<T> {
    return new LinearSum([[value, 1]]);
  }

  /**
   * Constructs a linear sum from a sequence of [value, coeffient] pairs.
   */
  public static from<T>(elements: Iterable<[T, number]>): LinearSum<T> {
    return new LinearSum(elements);
  }

  /**
   * Constructs a linear sum from an argument list of [value, coeffient] pairs.
   */
  public static of<T>(...elements: Array<[T, number]>): LinearSum<T> {
    return new LinearSum(elements);
  }

  /* ------------------------------------------------------------------------ */

  /**
   * Returns the number of elements in the sum.
   */
  public get size() {
    return this.elements.size;
  }

  /**
   * Returns an iterator to the underlying [element, coefficient] sequence.
   */
  public get entries(): IterableIterator<[T, number]> {
    return this.elements.entries();
  }

  /**
   * Returns an iterator to the underlying [element, coefficient] sequence.
   */
  public [Symbol.iterator](): Iterator<[T, number]> {
    return this.elements.entries();
  }

  /**
   * Returns the coefficient for a given element, or zero if it isn't included.
   */
  public get(elem: T): number {
    return this.elements.get(elem) || 0;
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public equals(that: LinearSum<T>) {
    if (this === that) return true;
    if (this.size !== that.size) return false;
    for (const [e, k] of this) if (that.get(e) !== k) return false;
    return true;
  }

  /**
   *
   */
  public add(that: T | LinearSum<T>) {
    const result = addAll(new Map(), this);

    if (that instanceof LinearSum) addAll(result, that);
    else add(result, [that, 1]);

    return new LinearSum(result);
  }

  /**
   *
   */
  public sub(that: T | LinearSum<T>) {
    const result = addAll(new Map(), this);

    if (that instanceof LinearSum) addAll(result, that, -1);
    else add(result, [that, -1]);

    return new LinearSum(result);
  }

  /**
   *
   */
  public scale(k: number) {
    return new LinearSum(addAll(new Map(), this, k));
  }

  /**
   *
   */
  public negate() {
    return this.scale(-1);
  }

  /* ------------------------------------------------------------------------ */

  /**
   *
   */
  public get [Symbol.toStringTag]() {
    return "LinearSum";
  }

  /**
   *
   */
  public toString() {
    return [...this]
      .map(([e, k]) => (k === 1 ? `${e}` : `(${k} * ${e})`))
      .reduce((sum, part) => `${sum} + ${part}`);
  }
}

/* -------------------------------------------------------------------------- */

/**
 * Helper function to add an [element, coefficient] pair to a map.
 * Removes any entries with resulting 0-valued coefficients.
 */
function add<T>(sink: Map<T, number>, [e, k]: [T, number], f = 1) {
  const ek = k * f + (sink.get(e) || 0);
  if (ek === 0) sink.delete(e);
  else sink.set(e, ek);
  return sink;
}

/**
 * Helper function to add a sequence of [element, coefficient] pairs to a map.
 */
function addAll<T>(sink: Map<T, number>, seq: Iterable<[T, number]>, f = 1) {
  for (const value of seq) add(sink, value, f);
  return sink;
}
