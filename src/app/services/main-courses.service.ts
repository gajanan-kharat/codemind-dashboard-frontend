import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainCoursesService {

  constructor() { }

  getServices() {
    return [
      {
        title: 'Java Full Stack mastery ',
        description: 'Our Java Full Stack Mastery program equips talent with hands-on skills for tech success.',
        image: '/assets/img/courses/Java-img.jpg',
        icon: 'fa-brands fa-java',
        link: '/courses/java',
        delay: 500
      },
      {
        title: 'Anuglar Means Stack',
        description: 'Our program focuses on developing talent with in-depth Angular skills for web development success.',
        image: '/assets/img/courses/Angular-img.png',
        icon: 'fa-brands fa-angular',
        link: '/courses/angular',
        delay: 550
      },
      {
        title: 'Full Stack Dot Net Excellence',
        description: 'We focus on developing top talent with expert .NET skills for outstanding results in technology.',
        image: '/assets/img/courses/dotnet.jpg',
        icon: 'fas fa-code',
        link: '/courses/dotnet',
        delay: 600
      },
      {
        title: 'React Means Stack',
        description: 'We focus on building top React skills to help people succeed in web development.',
        image: '/assets/img/courses/React-img.png',
        icon: 'fa-brands fa-react',
        link: '/courses/react',
        delay: 650
      },
      {
        title: 'Manual And Automations',
        description: 'We specialize in developing skills for both manual and automated testing to ensure quality and efficiency.',
        image: '/assets/img/courses/Testing-img.jpg',
        icon: 'fas fa-clipboard-list',
        link: '/courses/testing',
        delay: 700
      },
      {
        title: 'Devops & Cloud Integration',
        description: 'We train people in DevOps and cloud skills for smooth operations and integration.',
        image: '/assets/img/courses/devops.jpg',
        icon: 'fas fa-cloud',
        link: '/courses/devops',
        delay: 750
      },
      {
        title: 'Manual And Automations',
        description: 'We are convinced that nothing we do is more important than hiring and developing people...',
        image: '/assets/img/courses/Testing-img.jpg',
        icon: 'fas fa-clipboard-list',
        link: '/courses/testing',
        delay: 800
      },
      {
        title: 'Paython With Data Science',
        description: 'We teach Python and data science skills to help you excel in analyzing and using data.',
        image: '/assets/img/courses/paython.jpeg',
        icon: 'fa-brands fa-python',
        link: '/courses/paython',
        delay: 850
      }
    ];
  }
}

