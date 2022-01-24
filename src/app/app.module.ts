import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from 'src/reducers/pokemon.reducer';
import { Pokemon } from 'src/models/pokemon.model';
import { localStorageSync } from 'ngrx-store-localstorage';
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SortPipe,
    DetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    NgxPaginationModule,
    StoreModule.forRoot(pokemonReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
