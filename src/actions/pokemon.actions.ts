import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/models/pokemon.model';

export const retrievedPokemonList = createAction(
  '[Pokemon List/API] Retrieve Pokemon Success',
  props<{ pokemons: ReadonlyArray<Pokemon> }>()
);