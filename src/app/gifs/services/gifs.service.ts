import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] =[];
  private _tagsHistory: string[] = [];
  private baseUrlGifs: string = 'http://api.giphy.com/v1/gifs';
  private apiKeyGifs: string ='g8KJg4lt3a9gvikHheZSjGXk4E4JtGtu';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Loaded History");
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
    console.log("Search First tag");
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  searchTag( tag:string ):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=g8KJg4lt3a9gvikHheZSjGXk4E4JtGtu&q=valorant&limit=10')
    // .then(resp => resp.json())
    // .then(data => console.log(data));
    const params = new HttpParams()
    .set('api_key',this.apiKeyGifs)
    .set('q',tag)
    .set('limit',10);

    this.http.get<SearchResponse>(`${this.baseUrlGifs}/search`,{params})
    .subscribe(resp => {
      this.gifsList = resp.data
      console.log({gifs: this.gifsList});
    });
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

}
