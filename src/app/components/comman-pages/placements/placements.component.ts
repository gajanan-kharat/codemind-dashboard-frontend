import { ViewChild, ElementRef, Component, ViewEncapsulation } from '@angular/core';

import { StudentreviewsService } from 'src/app/services/studentreviews.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlacedstudentService } from 'src/app/services/placedstudent.service';
declare var $: any;
@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss'],
  
})
export class PlacementsComponent {
  placedStudent: any[] = [];
  display = 'none';
  selectedCandidateIndex: number = 0;
  isDialogOpen = false;
  displayBackdrop: string = 'none';
  constructor(private placedstudents: PlacedstudentService) {

  }
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
  ngOnInit(): void {
    this.placedStudent = this.placedstudents.getAllPlacedCandidates();
  }
  openModal(candidate: any, index: number) {
    this.selectedCandidateIndex = index;
    this.display = 'block';
    this.displayBackdrop = 'block';
    this.isDialogOpen = true;
  }

  onCloseHandled() {
    this.selectedCandidateIndex = 0;
    this.display = 'none';
    this.displayBackdrop = 'none';
    this.isDialogOpen = false;
  }
}
