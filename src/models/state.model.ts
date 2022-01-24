import { Pokemon } from './pokemon.model';

export interface State {
  readonly pokemonState: Array<Pokemon>;
}