import { Component , ViewEncapsulation} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialComponent {

  candidateSlides: OwlOptions = {
    nav: true,
    dots: false,
    autoplayHoverPause: false,
    margin: 30,
    navText: ['<', '>'],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
  };


  items = [
    { src: '/assets/img/offer-letter/Akshay Shisode.jpg'},
    { src: '/assets/img/offer-letter/SHREYAS DESHPANDE.jpg' },
    { src: '/assets/img/offer-letter/Vikas Ganpatil.jpg' },
    { src: '/assets/img/offer-letter/prem_rathor.jpg' },
    { src: '/assets/img/offer-letter/Rohit_Pawar.jpg' },
    { src: '/assets/img/offer-letter/sachin_kadam.jpg' },
    { src: '/assets/img/offer-letter/sarvesh_holla.jpg' },
    { src: '/assets/img/offer-letter/sonali_krande.jpg' }
  ];
  modalImage: string | null = null;

  openModal(src: string) {
    this.modalImage = src;
  }

  closeModal() {
    this.modalImage = null;
  }
}
