import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-main-leads',
  templateUrl: './main-leads.component.html',
  styleUrls: ['./main-leads.component.scss']
})
export class MainLeadsComponent implements AfterViewInit {
  totalRecords:any;
  bootcampCount: number = 0;
  followUpCount: number = 0;
  interestedCount: number = 0;
  notInterestedCount: number = 0;
  inquiryCount: number = 0;
  totalRecords$!: Observable<any>;
  selectedCard = 'leads';
  constructor(private mongodbService: MongodbService){
   
  }
  ngAfterViewInit(): void {
    this.mongodbService.booleanSubject.subscribe(value => {
      if (value == true) {
        this.fetchTotalRecords();
      }
    });
  }

  ngOnInit(): void {
    this.fetchTotalRecords();    
  }

  

  onCardClick(card: string) {
    this.selectedCard =  card;
    // this.fetchTotalRecords();
  }

  fetchTotalRecords(): void {
   this.mongodbService.getTotalRecords().subscribe(
      (data) => {
        this.totalRecords = data; 
        console.log(" before data:=>",data);
        this.inquiryCount = this.totalRecords.students;
        this.followUpCount = this.totalRecords.followUp;
        this.interestedCount = this.totalRecords.interested;
        this.notInterestedCount = this.totalRecords.notInterested;
        this.bootcampCount = this.totalRecords.bootcamp;
        // console.log(" after data:=>",data);
       
        console.log('Total Records:', this.totalRecords);
      },
      (error) => {
        console.error('Error fetching total records:', error);
      }
    );
    // Poll the server every 5 seconds (5000 ms)
    // this.totalRecords$ = interval(1000).pipe(
    //   // Switch to the latest observable (data) from the service
    //   switchMap(() => this.mongodbService.getTotalRecords())
    // );
  }

}
