import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { of, Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constants } from 'src/constants';
import { IPokemon } from 'src/interface/IPokemon';
import { Pokemon } from 'src/models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonListService {
  @Output()  pokemonList = new EventEmitter<Array<any>>();
  pokeList:any = [];
  private list = new BehaviorSubject('');
  sharedData = this.list.asObservable();
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Array<Pokemon>> {
    return this.http.get<{list:any[]}>(Constants.pokemonListUrl).pipe(map((response:any)=> response.results || []));
  }

  getImages(pokemons:any): Observable<any>{
    let result:any;
    let listLength = pokemons.length;
    this.pokeList = [];
    for(let i = 0;i<pokemons.length;i++){
        //this.getImageService(pokemons[i].url,length,i);
        this.pokeList.push(this.http.get<IPokemon>(pokemons[i].url).pipe(tap(res => res)));  
    }

    return this.pokeList;
  }
}