import { Component } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-main-leads',
  templateUrl: './main-leads.component.html',
  styleUrls: ['./main-leads.component.scss']
})
export class MainLeadsComponent {
  totalRecords:any;
  bootcampCount: number = 0;
  followUpCount: number = 0;
  interestedCount: number = 0;
  notInterestedCount: number = 0;
  inquiryCount: number = 0;

  selectedCard = 'leads';

  constructor(private mongodbService: MongodbService){}

  ngOnInit(): void {
    this.fetchTotalRecords();
  }

  onCardClick(card: string) {
    this.selectedCard =  card;
  }


  fetchTotalRecords(): void {
    this.mongodbService.getTotalRecords().subscribe(
      (data) => {
        this.totalRecords = data; 

        this.inquiryCount = this.totalRecords.students;
        this.followUpCount = this.totalRecords.followUp;
        this.interestedCount = this.totalRecords.interested;
        this.notInterestedCount = this.totalRecords.notInterested;
        this.bootcampCount = this.totalRecords.bootcamp;
       
        console.log('Total Records:', this.totalRecords);
      },
      (error) => {
        console.error('Error fetching total records:', error);
      }
    );
  }

}
