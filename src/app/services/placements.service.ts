import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacementsService {

  constructor() { }
  getCourses() {
    return [
      {
        id: 1,
        image: '/assets/img/akash_channe.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Naman Bhalla',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: ' linear-gradient(to right, #37234F, #6A4198)',
      },
      {
        id: 2,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #3e747b, #508fa7)'
      },
      {
        id: 3,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #c84d6a, #e76683)'
      },
      {
        id: 4,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      },
      {
        id: 5,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      },
      {
        id: 6,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      },
      {
        id: 7,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      },
      {
        id: 8,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      },
      {
        id: 9,
        image: '/assets/img/akash.png',
        description: 'I would recommend Scaler Academy course to everyone who wants to revamp their career as they have an excellent curriculum which is coupled with a highly talented pool of instructors.',
        name: 'Nipun Suradkar',
        details: 'B.E → Angular Developer',
        link: '#',
        gradient: 'linear-gradient(to right, #b89c56, #deae31)'
      }
    ];
  }
}
