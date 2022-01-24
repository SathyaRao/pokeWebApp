/*import { Pokemon } from '../models/pokemon.model';
import { PokemonAction, PokemonActionType } from '../actions/pokemon.actions';
//create a dummy initial state
const initialState: Array<Pokemon> = [
  {
    id: 1,
    name: 'Pikachu',
    height: 6,
    weight: 66,
    abilities:[],
    sprites: { 
        other: {
            "official-artwork": {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            }
        }
    }

  },
];
export function pokemonReducer(
  state: Array<Pokemon> = initialState,
  action: PokemonAction
) {
  switch (action.type) {
    case PokemonActionType.SHOW_DETAILS:
      return [...state, action.payload];
    default:
      return state;
  }
}*/


import { createReducer, on } from '@ngrx/store';

import { retrievedPokemonList } from 'src/actions/pokemon.actions';
import { Pokemon } from 'src/models/pokemon.model';
import { StoreModule } from '@ngrx/store';
export const initialState: ReadonlyArray<Pokemon> = [];

export const pokemonReducer = createReducer(
  initialState,
  on(retrievedPokemonList, (state, { pokemons }) => pokemons)
);