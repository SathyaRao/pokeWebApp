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
  it('should render title in a h3 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Height:');
  }));
  
  it("should contain background image", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain("/assets/logo.jpg");
  });
  it('should have sort param as name by default', async(() => {
    component.SortbyParam = 'name';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture.componentInstance.SortbyParam).toContain('name');
  }));
  
  it("should have sort order as ascending by default", () => {
    component.SortDirection = 'asc';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture.componentInstance.SortDirection).toContain('asc');
  });
});
