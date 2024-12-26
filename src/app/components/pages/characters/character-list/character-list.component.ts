import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, take } from 'rxjs';
import { trigger, style,transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  animations: [
    trigger('enterState',[
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0.5
      })),
      transition(':enter',[
        animate(300,style({
          transform:'translateX(0%)',
          opacity:0.5
        }))
      ])
    ])
  ]
})
export class CharacterListComponent {

  title='Characters';
  
  constructor(private characterSvc: CharacterService, private router: ActivatedRoute ){}

  characters?:Observable<any>;

  ngOnInit(){
    this.loadCharactersList();
    this.favourites = this.getLocalStorage();
    this.characterSvc.setFavourite(this.favourites);
  }

  private query : string = '';
  keyOption : string = 'Sort By';

  characterList:any=[];

  //Comic Modal
  comic:any;
  btnImgAdd='';
  switchAdd: boolean = false;
  favourites: any=[];
  titlebutton ='';
  closeResult = '';

  private loadCharactersList(){
    this.router.params.subscribe(params => {
      this.query = params['query'];
      this.getAllCharacters();
    });
  }

  public config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
 
  getAllCharacters(){
    this.characters =  this.characterSvc.searchCharacters(this.query);    
  }

  public orderAs_A_Z(){
    this.characters =  this.characterSvc.searchCharacters(this.query, 'name');
    this.config.currentPage = 1;
  }

  public orderAs_Z_A(){
    this.characters =  this.characterSvc.searchCharacters(this.query, '-name');
    this.config.currentPage = 1;
  }

  public orderAsAsc(){
    this.characters =  this.characterSvc.searchCharacters(this.query, 'modified');
    this.config.currentPage = 1;
  }

  public orderAsDesc(){
    this.characters =  this.characterSvc.searchCharacters(this.query, '-modified');
    this.config.currentPage = 1;
  }

  DescriptionCharacter(text:String){
    return text.length > 143 ? text.slice(0,140)+ "..." : text && 
      text != undefined  ? text : "Description Not Found" ;
  }

  // Comics
  comicArrays(character:any): any[]{
    let listComics: any[] = [];
    let comics = character.comics?.items;
    if(comics.length != 0)
    {
      let i = 0;
      for(var comic of comics){
        if (i < 4) {
          listComics.push(comic);
        }
        else{
          break;
        }
        i++;
      }
    }
    else
    {
      listComics.push("");
    }
    return listComics;
  }

  nameComic(text:String){
    return text != undefined  ? text : "Comics No found "; 
  }

  modalComic(urlComic: string){
    this.characterSvc.getComicDetailsByUrl(urlComic) 
    .pipe(take(1))
    .subscribe((res: any) =>{
      this.comic= Object.values(res.data.results);
      this.comic = this.comic[0];
      console.log(this.comic)
      this.switchAdd=false;
      this.btnImgAdd="assets/btn-favourites-default.png";
      this.titlebutton="ADD TO FAVOURITES"
      for(let element of this.favourites)
      {
        if (element.id == this.comic.id)
        {
          this.switchAdd=true;
          this.btnImgAdd="assets/btn-favourites-primary.png";
          this.titlebutton="ADDED TO FAVOURITES"
          break;
        }
      } 
 
    })
  }
  DescriptionComic(text:String){
    return  text != null  ?  text.slice(0,200) + "..." : text;
  }

  addFavorites(){
    this.switchAdd=!this.switchAdd;
    if(this.switchAdd){
      this.btnImgAdd="assets/btn-favourites-primary.png";
      this.titlebutton="ADDED TO FAVOURITES";
      this.favourites.push(this.comic);
      this.characterSvc.setFavourite(this.favourites);
      
    } else{
      this.btnImgAdd="assets/btn-favourites-default.png";
      this.titlebutton="ADD TO FAVOURITES";
      var cont:number=0;
      var index:number=-1;
      for(let element of this.favourites)
      {
        if(element.id==this.comic.id)
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
    }
    this.saveLocalStorage(this.favourites);
    this.getLocalStorage();
  }

  saveLocalStorage(fav :any){
    sessionStorage.setItem('favourites', JSON.stringify (fav))
  }

  getLocalStorage(){
    var favouritesArray : any=[];
    favouritesArray=sessionStorage.getItem('favourites');
    if (favouritesArray==null || favouritesArray.length==0)
      return [];
    return JSON.parse(favouritesArray);
  }

}
