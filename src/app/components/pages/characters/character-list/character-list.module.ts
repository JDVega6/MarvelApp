import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from './character-list-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [  
   
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  exports: [
    
  ]
})
export class CharacterListModule { }
