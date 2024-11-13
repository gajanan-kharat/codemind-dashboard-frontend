import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HireusService } from 'src/app/services/hireus.service';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-main-company-leads',
  templateUrl: './main-company-leads.component.html',
  styleUrls: ['./main-company-leads.component.scss']
})
export class MainCompanyLeadsComponent {

  totalRecords:any;
  followUpCount: number = 0;
  interestedCount: number = 0;
  notInterestedCount: number = 0;
  HireUsNewLeads: number = 0;
  totalRecords$!: Observable<any>;
  selectedCard = 'leads';
  constructor(private mongodbService: MongodbService, 
              private hireusService: HireusService,){
   
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
    this.fetchTotalRecords();
  }

  fetchTotalRecords(): void {
   this.hireusService.getHireUsTotalRecords().subscribe(
      (data) => {
        this.totalRecords = data;  
        this.HireUsNewLeads= this.totalRecords.HireUsNewLeads;
        this.followUpCount = this.totalRecords.followUp;
        this.interestedCount = this.totalRecords.interested;
        this.notInterestedCount = this.totalRecords.notInterested;
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