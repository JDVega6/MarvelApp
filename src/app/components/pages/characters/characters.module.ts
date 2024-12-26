import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CharacterDetailsComponent } from './character-details/character-details.component';




const myComponents=[CharacterListComponent, FavouritesComponent, CharacterDetailsComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
    
  ],
  exports:[...myComponents]
})
export class CharactersModule { }
