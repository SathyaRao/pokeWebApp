/*import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pokemon } from 'src/models/pokemon.model';

export const selectBooks = createFeatureSelector<ReadonlyArray<Pokemon>>('books');

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);
*/