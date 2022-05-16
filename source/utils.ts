export function* count(min: number, max: number) {
  for (let i = min; i <= max; i++) yield i;
}

export function* map<T, U>(g: Iterable<T>, f: (e: T) => U): Generator<U> {
  for (const e of g) yield f(e);
}

export function* zip<T, U>(
  lhs: Iterable<T>,
  rhs: Iterable<U>
): Generator<[T, U]> {
  for (const el of lhs) for (const er of rhs) yield [el, er];
}

export function toLookup<KT extends string | number, VT>(
  entries: Iterable<[KT, VT]>
) {
  type Res = { [K in KT]: VT };

  return Array.from(entries)
    .map(([k, v]) => ({ [k]: v }))
    .reduce((res: Res, cur) => Object.assign(res, cur), {} as Res);
}
