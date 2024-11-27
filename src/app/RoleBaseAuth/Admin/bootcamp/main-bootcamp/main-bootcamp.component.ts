import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-main-bootcamp',
  templateUrl: './main-bootcamp.component.html',
  styleUrls: ['./main-bootcamp.component.scss']
})
export class MainBootcampComponent {
  totalRecords: any;
  bootcampCount: number = 0;
  followUpCount: number = 0;
  interestedCount: number = 0;
  notInterestedCount: number = 0;
  codemindBootcampCount: number = 0;
  totalRecords$!: Observable<any>;
  selectedCard = 'leads';

  constructor(private mongodbService: MongodbService, 
              private bootcampService: BootcampService) {
  }
  ngAfterViewInit(): void {
    this.bootcampService.booleanSubject.subscribe(value => {
      if (value == true) {
        this.fetchTotalRecords();
      }
    });
  }

  ngOnInit(): void {
    this.fetchTotalRecords();
  }

  onCardClick(card: string) {
    this.selectedCard = card;
  }

  fetchTotalRecords(): void {
    this.bootcampService.getBootcampTotalRecords().subscribe(
      (data) => {
        this.totalRecords = data; 
        this.followUpCount = this.totalRecords.followUp;
        this.interestedCount = this.totalRecords.interested;
        this.notInterestedCount = this.totalRecords.notInterested;
        this.bootcampCount = this.totalRecords.bootcamp;
        this.codemindBootcampCount = this.totalRecords.codemindBootcamp; 
      },
      (error) => {
        console.error('Error fetching total records:', error);
      }
    );
  }
}
