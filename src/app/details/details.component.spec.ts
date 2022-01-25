import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { FilterPipe } from '../../pipes/filter.pipe';
import { SortPipe } from '../../pipes/sort.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { PokemonListService } from 'src/services/pokemonList.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let listService: PokemonListService;
  var pokemonList:any = [];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, StoreModule.forRoot({}), NgxPaginationModule],
      providers : [PokemonListService],
      declarations: [ DetailsComponent, FilterPipe, SortPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    listService = TestBed.get(PokemonListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Height:');
  }));
  
  it("should contain background image", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain("/assets/logo.jpg");
  });
  it("should invoke pokemonList service", () => {
    let list:any;
    listService.getPokemons().subscribe(response => {list = response
    });

    let url = "https://pokeapi.co/api/v2/pokemon/10/";

    pokemonList = listService.getImages(url);
    fixture.detectChanges();
    expect(pokemonList.length).toBeGreaterThan(0);
  });
});
