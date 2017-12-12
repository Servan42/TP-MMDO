import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api_key } from '../../app/tmdb';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';

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
  shakeSubscription : Subscription;
  shake : Shake;

  constructor(private http: HttpClient, public alerCtrl: AlertController, public navCtrl: NavController) {
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
      params: new HttpParams().set('api_key', api_key).set('query', query).set('language', 'fr-FR')
    }).pluck('results');
  }

  private discoverMovies(): Observable<Result[]> {
    return this.http.get<Result[]>('http://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', api_key).set('primary_release_year', '2018').set('language', 'fr-FR')
    }).pluck('results');
  }

  get2018(){
    this.films = this.discoverMovies();
  }

  showRandomMovieAlert(movies: Result[]): void {
    let randFilm = movies[Math.random() * movies.length + 1];
    this.params = randFilm;
    let confirm = this.alerCtrl.create({
      title: randFilm.title,
      message: 'Consulter les details de ce film ?',
      buttons: [
        {
        text: 'Non',
        handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.push(this.pushPage);
          }
        }
      ]
      });
      confirm.present()
  }

  ionViewDidLoad() {
    this.shakeSubscription = this.shake.startWatch().switchMap(() => this.discoverMovies()).subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }
}
