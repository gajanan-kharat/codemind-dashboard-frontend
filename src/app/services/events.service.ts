import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
 
  private upcomingBatches = [
    {
      title: 'Angular Development',
      image: '/assets/img/courses/Angular-img.png',
      icon: 'fa-brands fa-angular',
      hightlight:'100% Job Placement',
      hightlight1:'Hands-On Live Projects',
      hightlight2:'Industry-Expert Mentors',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'5',
          month:'Agust',
          time:'7:30 PM'
        }
      ]
    },
    {
      title: 'React Development',
      image: '/assets/img/courses/React-img.png',
      icon: 'fa-brands fa-react',
      hightlight:'100% Job Placement',
      hightlight1:'Hands-On Live Projects',
      hightlight2:'Industry-Expert Mentors',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'10',
          month:'Spet',
          time:'8:00 PM'
        }
      ]
    },
    {
      title: 'Java Development',
      image: '/assets/img/courses/Java-img.jpg',
      icon: 'fa-brands fa-java',
      hightlight:'100% Job Placement',
      hightlight1:'Hands-On Live Projects',
      hightlight2:'Industry-Expert Mentors',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ],
    },
    {
      title: '.NET Development',
      image: '/assets/img/courses/dotnet.jpg',
      icon: 'fas fa-code',
      hightlight:'100% Job Placement',
      hightlight1:'Hands-On Live Projects',
      hightlight2:'Industry-Expert Mentors',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'5',
          month:'AGUST',
          time:'07:30 PM'
        }
      ],
    },
  ];

  private bootcamps = [
    {
      title: '3-Day HTML CSS Bootcamp',
      description: 'Become proficient in HTML & CSS in just 3 days.',
      image: '/assets/img/courses/Html.jpg',
      icon: 'fa-brands fa-html5',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: '1-Day HTML CSS Bootcamp',
      description: 'Quickly learn HTML & CSS in a day.',
      image: '/assets/img/courses/Html1.png',
      icon: 'fa fa-code',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: '2-Day HTML CSS Bootcamp',
      description: 'Become proficient in HTML & CSS in just 3 days.',
      image: '/assets/img/courses/html-css.jpg',
      icon: 'fa-brands fa-css3',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: '5-Day HTML CSS Bootcamp',
      description: 'Quickly learn HTML & CSS in a day.',
      image: '/assets/img/courses/Html3.jpg',
      icon: 'fa fa-code',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    }
  ];

  private campusConnections = [
    {
      title: 'Codemind Drive',
      description: 'An exclusive recruitment drive at Codemind for upcoming graduates',
      image:'/assets/codemindTeam-img/Drive-img.jpeg',
      icon: 'fa-brands fa-google-drive',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: 'A.G. Patil College Visit',
      description: 'An insightful visit to A.G. Patil College to discuss industry trends.',
      image:'/assets/codemindTeam-img/karmayogi-1.jpg',
      icon: 'fa-solid fa-chalkboard-teacher',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: 'Karmayogi Session',
      description: 'Motivational session at Karmayogi Auditorium.',
      image:'/assets/codemindTeam-img/agpatil-4.png',
      icon: 'fa-solid fa-school',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    },
    {
      title: 'Jalgaon Visit',
      description: 'A campus tour and guest lecture at Jalgaon University.',
      image:'/assets/codemindTeam-img/Jalgaon-img.JPG',
      icon: 'fa-solid fa-users',
      dateInfo : [
        {
          day:'Monday',
          dayNumber:'8',
          month:'Jul',
          time:'9:00 PM'
        }
      ]
    }
  ];

  getBootcamps() {
    return this.bootcamps;
  }

  getUpcomingBatches() {
    return this.upcomingBatches;
  }

  getCampusConnections() {
    return this.campusConnections;
  }
}
