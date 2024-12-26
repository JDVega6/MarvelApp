import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {
  
  constructor(private characterSvc: CharacterService, private router: ActivatedRoute ){}

  character:any;
  characterComic:any;
  characterStories:any=[];
  display : boolean = false;
  id:any;

  ngOnInit(){
    this.loadCharactersList();
  }

  private loadCharactersList(){
 
    this.router.params.pipe(take(1)).subscribe((params)=>{
      this.id = params['id'];
      this.modalCharacter(params['id']);
      
    })
  }

  public async modalCharacter(characterId: number){
      this.characterSvc.getDetails(characterId)
      .pipe(take(1))
      .subscribe(async (res: any) =>{
        this.character = res.data.results[0];
        this.characterSvc.getComics(characterId)
        .pipe(take(1))
        .subscribe((res:any) =>{
          this.characterComic = res.data.results;
          console.log(this.characterComic)
        });
      });
        (await this.characterSvc.getStories(characterId)).subscribe( async (res:any) => {
          this.characterStories = res.data.results;
       })
      }

  DescriptionStories(text:String){
        return  text != null  ?  text.slice(0,200) + "..." : text;
      }
}
