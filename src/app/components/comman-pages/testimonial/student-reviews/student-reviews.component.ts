import { Component } from '@angular/core';
import { StudentreviewsService } from 'src/app/services/studentreviews.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-student-reviews',
  templateUrl: './student-reviews.component.html',
  styleUrls: ['./student-reviews.component.scss']
})
export class StudentReviewsComponent {
  studentReviews: any[] = [];
  selectedReview: any;
  isModalOpen = false;
  carouselOptions: OwlOptions = {
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
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  constructor(private studentreviews: StudentreviewsService) {}
  ngOnInit(): void {
    this.studentReviews = this.studentreviews.getTestimonials();
  }
  openModal(review: any): void {
    this.selectedReview = review;
    const modal = document.getElementById('testimonialModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
