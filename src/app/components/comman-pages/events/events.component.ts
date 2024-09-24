import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  eventsData: any[] = [];
  bootcamps:any[] = [];
  upcomingBatches:any[] = [];
  campusConnections:any[] = [];

  constructor(private eventService: EventsService, private router:Router) {}


    carouselOptions: OwlOptions = {
      nav: true,
      dots: false,
      autoplayHoverPause: true,
      margin: 30,
      navText: ['<', '>'],
      // autoplay: true,
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
        1300: {
          items: 3,
        }
      },
    };


  ngOnInit() {
    this.bootcamps = this.eventService.getBootcamps();
    this.upcomingBatches = this.eventService.getUpcomingBatches();
    this.campusConnections = this.eventService.getCampusConnections();
  }

  navigateToRegisterNow(){
    this.router.navigate(['/contact']);
  }

 /* @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const sections = document.querySelectorAll('.event');
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const topPosition = 120 + (index * 10) + 20; 
      // const marginLeftRight = index * 10 + 5; 
      
      if (rect.top <= topPosition && rect.bottom >= topPosition) {
        section.classList.add(`stricky-${index + 1}-active`);
        // (section as HTMLElement).style.position = 'sticky';  
        // (section as HTMLElement).style.top = `${topPosition}px !important`; 
        // (section as HTMLElement).style.marginLeft = `${marginLeftRight}px`; 
        // (section as HTMLElement).style.marginRight = `${marginLeftRight}px`;
        if (section.classList.contains('event-container')) {
          (section as HTMLElement).style.zIndex = '1001';
        }
      } else {
        section.classList.remove(`stricky-${index + 1}-active`);
        // (section as HTMLElement).style.position = '';
        (section as HTMLElement).style.top = ''; 
        // (section as HTMLElement).style.marginLeft = ''; 
        // (section as HTMLElement).style.marginRight = '';
        if (section.classList.contains('event-container')) {
          (section as HTMLElement).style.zIndex = '1000';  // Reset z-index
        }
      }
    });
  }*/
  
  
    
}
