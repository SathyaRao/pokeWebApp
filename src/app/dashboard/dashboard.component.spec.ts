import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { FilterPipe } from '../../pipes/filter.pipe';
import { SortPipe } from '../../pipes/sort.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, StoreModule.forRoot({}), NgxPaginationModule],
      providers : [
        { provide: Router, useValue: mockRouter}],
      declarations: [ DashboardComponent, FilterPipe, SortPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onSearchFilter method on component load', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture.componentInstance.onSearchFilter).toHaveBeenCalled;
  }));
  
  it("should contain background image", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain("/assets/logo.jpg");
  });
  it('should have sort param as name by default', async(() => {
    component.SortbyParam = 'name';
    fixture.detectChanges();
    expect(fixture.componentInstance.SortbyParam).toContain('name');
  }));
  
  it("should have sort order as ascending by default", () => {
    component.SortDirection = 'asc';
    fixture.detectChanges();
    expect(fixture.componentInstance.SortDirection).toContain('asc');
  });
  it("should set page value", () => {
    component.handlePageChange(3);
    fixture.detectChanges();
    expect(fixture.componentInstance.page).toEqual(3);
  });
  it("should set pageSize value", () => {
    let event = {target:{value:5}};
    component.handlePageSizeChange(event);
    fixture.detectChanges();
    expect(fixture.componentInstance.pageSize).toEqual(5);
  });
  it("should set filter values", () => {
    component.pokemonName = 'Pikachu';
    component.pokemonAbilities = 'thunder bolt';
    component.onSearchFilter();
    fixture.detectChanges();
    expect(sessionStorage.getItem('pokemonName')).toEqual('Pikachu');
    expect(sessionStorage.getItem('pokemonAbilities')).toEqual('thunder bolt');
  });
  it("should clear filter values", () => {
    component.onSearchFilterClear();
    fixture.detectChanges();
    expect(fixture.componentInstance.pokemonName).toBe('');
    expect(fixture.componentInstance.pokemonAbilities).toBe('');
    expect(sessionStorage.getItem('pokemonName')).toBe('');
    expect(sessionStorage.getItem('pokemonAbilities')).toBe('');
  });
  it("should change sort direction", () => {
    component.SortDirection = 'asc';
    component.onSortDirection();
    fixture.detectChanges();
    expect(fixture.componentInstance.SortDirection).toEqual('desc');
  });
});
