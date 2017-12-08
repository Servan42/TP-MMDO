import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResolvedReflectiveFactory } from '@angular/core/src/di/reflective_provider';
import { DetailsPage } from '../details/details';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeResults: Result[] = [{
  author: 'Servan',
  date: 2017,
  image: 'http://lorempixel.com/300/300/',
  title:'Le ninja de l\'ombre',
  }, {
  author: 'Zoran',
  date: 1996,
  image: 'http://lorempixel.com/300/300/',
  title:'Une journée en enfer'
  }, {
    author: 'Julien',
    date: 1683,
    image: 'http://lorempixel.com/300/300/',
    title: 'Coup de vent a Noting Hill'
  }, {
    author: 'Vincent',
    date: 2024,
    image: 'http://lorempixel.com/300/300/',
    title: 'Les Seigneurs'
  }, {
    author: 'Cedric',
    date: 2003,
    image: 'http://lorempixel.com/300/300/',
    title: 'Le loup de Polytech Street'
  }, {
    author: 'Bastien',
    date: 1975,
    image: 'http://lorempixel.com/300/300/',
    title: 'ALT+F4'
  }, {
    author: 'Amina',
    date: 666,
    image: 'http://lorempixel.com/300/300/',
    title: 'L\'absence'
  }]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  films : Result[];
  params : Object;
  pushPage : any;

  constructor(public navCtrl: NavController) {
    this.films = [];
    this.pushPage = DetailsPage;
    this.params ={id :42};
  }

  initializeItems(){
    this.films = fakeResults;
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.films = this.films.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.author.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    } else {
      this.films = [];
    }
  }

}
