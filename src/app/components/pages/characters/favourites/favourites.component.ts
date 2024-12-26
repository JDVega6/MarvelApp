import { Component } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  constructor(private characterService : CharacterService){}

  favourites: any=[];

  ngOnInit(): void {
    this.characterService.selectedFavourites$.subscribe((value:any)=>{
      this.favourites = value;
    })
  }

  deleteFavourite(img:any){
    var cont:number=0;
    var index:number=-1;
    for(let element of this.favourites)
    {
      if(element.id==img.id)
      {
        index=cont;
        break;
      }
      cont=cont+1;
    }
    if(index>-1)
    {
      this.favourites.splice(index,1)
      
    }
    this.save(this.favourites);
    this.characterService.setFavourite(this.favourites);
  }

  save(fav :any){
    sessionStorage.setItem('favourites', JSON.stringify (fav))
  }

  get(){
    var favArray : any=[];
    favArray=sessionStorage.getItem('favourites');
    if (favArray==null || favArray.length==0)
      return [];
    return JSON.parse(favArray);
  }

}
