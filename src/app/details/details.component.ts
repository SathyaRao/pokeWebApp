import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokemonList:any = [];
  pokemonName = '';
  searchPokemon = '';
  pokemonDetails:any;
  cols : number =0;

gridByBreakpoint = {
  xl: 10,
  lg: 10,
  md: 10,
  sm: 10,
  xs: 10
}

constructor(private breakpointObserver: BreakpointObserver){
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
  
  ngOnInit(): void {
    let pokemonName = localStorage.getItem('pokemonName')?.toString();
    this.pokemonDetails = JSON.parse(sessionStorage.getItem('pokemonDetails') || '{}');
    this.getStats(this.pokemonDetails.stats||{});
  }

  getStats(statsList:any){
    let pokemonMoves = '';
    let stats = [];
    for(let i=0;i<statsList.length ;i++){
      stats.push({name:this.pokemonDetails.stats[i].stat.name, value:this.pokemonDetails.stats[i].base_stat});
      pokemonMoves += this.pokemonDetails.moves[i]?.move.name + ", ";      
    }
    this.pokemonDetails.topMoves = pokemonMoves.substring(0,pokemonMoves.length-2);
  }

}
