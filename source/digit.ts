import { Vector } from "./math/vector";
import { AbstractBasis } from "./math/abstract-basis";
import { AbstractVector } from "./math/abstract-vector";
import { count, map, toLookup } from "./utils";

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function* digitValues() {
  yield* count(1, 9) as Generator<Digit>;
}

const basisStates = toLookup(
  map(digitValues(), (d) => [d, AbstractBasis.create(d.toString())])
);

export function knownValue(value: Digit): AbstractBasis {
  return basisStates[value];
}

export function oneOf(...values: Digit[]): Vector {
  return AbstractVector.from(values.map((d) => [knownValue(d), 1]));
}

export function anyDigit(): Vector {
  return oneOf(...digitValues());
}
