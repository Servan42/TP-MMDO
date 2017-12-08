import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api_key } from '../../app/tmdb';

export interface Result {
  title: string;
  overview : string;
  poster_path : string;
  backdrop_path : string;
  id : string;
  release_date : string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  films: Observable<Result[]>;
  params : Object;
  pushPage : any;

  constructor(private http: HttpClient) {
    this.films = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    if (val) {
      this.films = this.fetchResults(val);
    } else {
      this.films = Observable.of([]);
    }

  }

  fetchResults(query : string):Observable<Result[]>{
    return this.http.get<Result[]>('http://api.themoviedb.org/3/search/movie', {
      params: new HttpParams().set('api_key', api_key).set('query', query)
    }).pluck('results');
  }

}
