import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from 'src/interface/IPokemon';
import { Constants } from 'src/constants';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from 'src/models/pokemon.model'; 
import { State } from 'src/models/state.model'; 
import { Router } from '@angular/router';
//import { PokemonAction } from 'src/actions/pokemon.actions';
import { retrievedPokemonList } from 'src/actions/pokemon.actions';
import { PokemonListService } from 'src/services/pokemonList.service';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

title = 'pokeWeb';
url = "https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0";
pokemonList:any = [];
rawData:any = [];
currentIndex = -1;
page = 1;
count = 0;
pageSize = 10;
pageSizes = [10, 20, 50];
SortbyParam = 'name';
SortDirection = 'asc';
pokemonName = '';
searchPokemon = '';
pokemonAbilities = '';
listLength = 0;
pokemonObj$: Observable<Array<Pokemon>> | undefined;
cols : number =0;

gridByBreakpoint = {
  xl: 2,
  lg: 2,
  md: 4,
  sm: 8,
  xs: 10
}

constructor(private http: HttpClient, private store: Store<State>, private router:Router, 
  private pokemonListService:PokemonListService, private breakpointObserver: BreakpointObserver){
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }
 ngOnInit(){
   this.pokemonName = sessionStorage.getItem('pokemonName')?.toString()||"";
   this.pokemonAbilities = sessionStorage.getItem('pokemonAbilities')?.toString()||"";
   this.SortDirection = sessionStorage.getItem('sortOrder')?.toString()||"";
   this.SortbyParam = sessionStorage.getItem('sortBy')?.toString()||"";
   
   this.pokemonListService
      .getPokemons()
      .subscribe(
        (pokemons) => {
        let observableList:any = this.pokemonListService.getImages(pokemons);
          forkJoin(observableList).subscribe((allResults:any) => {
            let pokemonDetails:any, abilities:any, ability:string;
            //pokemonDetails = allResults;
            this.pokemonList = allResults;
            for(let i =0;i<allResults.length;i++){
              this.pokemonList[i].image = allResults[i].sprites.other["official-artwork"].front_default;
              abilities = allResults[i].abilities;
              ability = "";
              for(let i=0;i<abilities.length;i++){
                ability += abilities[i].ability.name + ", ";
              }
              this.pokemonList[i].ability = ability.substring(0,ability.length-2);
              let type = this.pokemonList[i].types[0].type.name;
              this.pokemonList[i].type = Constants.type[type];
            }
        });
      });
 }

handlePageChange(event: number): void {
  this.page = event;
}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
}

getRequestParams(searchTitle: string, page: number, pageSize: number): any {
  let params: any = {};
  if (searchTitle) {
    params[`title`] = searchTitle;
  }
  if (page) {
    params[`page`] = page - 1;
  }
  if (pageSize) {
    params[`size`] = pageSize;
  }
  return params;
}

onSearchFilter() {
  sessionStorage.setItem('pokemonName',this.pokemonName);
  sessionStorage.setItem('pokemonAbilities',this.pokemonAbilities);
  this.pokemonList = [];
    for (const item of this.rawData) {
        if (item['name'].startsWith(this.pokemonName ) && item['ability'].includes(this.pokemonAbilities ) ) {
            this.pokemonList.push(item);
        }
    }
}

onSearchFilterClear() {
  this.pokemonName = '';
  this.pokemonAbilities = '';
  sessionStorage.setItem('pokemonName','');
  sessionStorage.setItem('pokemonDetails', '{}');
  sessionStorage.setItem('pokemonAbilities','');
  sessionStorage.setItem('sortOrder','asc');
  sessionStorage.setItem('sortBy','name');
  this.pokemonList = this.rawData;
}

onSortDirection() {
  if (this.SortDirection === 'desc') {
    this.SortDirection = 'asc';
  } else {
    this.SortDirection = 'desc';
  }
}

pokemonDetails(id:string) {
  let pokemonDetails;
  for(let i=0;i<this.pokemonList.length;i++){
    if(this.pokemonList[i].id == id){
      pokemonDetails = this.pokemonList[i];
      break;
    }
  }
  sessionStorage.setItem('pokemonName',this.pokemonName);
  sessionStorage.setItem('pokemonDetails', JSON.stringify(pokemonDetails));
  sessionStorage.setItem('pokemonAbilities',this.pokemonAbilities);
  sessionStorage.setItem('sortOrder', this.SortDirection);
  sessionStorage.setItem('sortBy', this.SortbyParam);
  this.router.navigateByUrl('/details');
}

selectSortOption(selected:any){
  sessionStorage.setItem('sortBy',selected);
}

}
