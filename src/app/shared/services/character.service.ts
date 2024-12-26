import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '@environment/environment.development';
import { Character } from '../interfaces/character.interface';
import {  BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { ResponseObject } from '../interfaces/response.interface';

const favourites : any = [];
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private favourite$ = new BehaviorSubject<any>(favourites);

  constructor(private http: HttpClient) {}
  
getCharacters():Observable<ResponseObject>{
  return this.http.get<ResponseObject>(`${environment.Url}?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`).pipe(map((data:any)=>data.data.results));
}

getComics(id:number):Observable<ResponseObject>{
  return this.http.get<any>(`${environment.Url}/${id}/comics?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`);
}

async getStories(id:number){
  return await (this.http.get<ResponseObject>(`${environment.Url}/${id}/series?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`));
}

getDetails(id:number):Observable<ResponseObject>{
  return this.http.get<any>(`${environment.Url}?id=${id}&ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`);
}

getComicDetailsByUrl(urlComic:string){
  return this.http.get(`${urlComic.replace("http","https")}?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`);
}

searchCharacters(query='', orderBy=''){
  let urlBase = `${environment.Url}?`;
  let search = `ts=1&apikey=${environment.apiKey}&hash=${environment.hash}&limit=${100}&offset=${0}`;

  urlBase += query != ''? `nameStartsWith=${query}&`:'';
  urlBase += orderBy != ''? `orderBy=${orderBy}&`:'';

  return this.sendQuery(urlBase + search);
}

sendQuery(query=''){
  return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data.results));
}

get selectedFavourites$(): Observable<any>{
  return this.favourite$.asObservable();
}

setFavourite(favourite: any){
  this.favourite$.next(favourite);
}
}
