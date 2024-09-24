import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentreviewsService {

  constructor() { }
  getTestimonials() {
    return [
      {
        name: 'Pratiksha Bhuse',
        username: '@pratikshabhuseweb',
        image: '/assets/img/testimonial-img/priyanka.jpg',
        rating: 4,
        comment: `I joined CodeMind Technology training center for learning Java. 
                  The environment of the Institute is very friendly, and they provide 
                  helpful study materials. The trainers are highly skilled and have in-depth 
                  knowledge. Thanks to the entire team!`
      },
      {
        name: 'Priyanka Gaikwad',
        username: '@priyankagaikwadweb',
        image: 'assets/img/testimonial-img/P1-letter.jpg',
        rating: 5,
        comment: `CodeMind Technology is an excellent institute, with less fees they provide such good 
                                courses thats helps us getting our dream job in desired field...the way teacher 
                                explaining each concepts with real time examples in an easy manner helped me to learn 
                                and gain confidence in testing and the support they provide is really appreciated. 
                                thank you Chandan Sir for all your support. #codemindTechnology#bestteacher .`
      },
      {
        name: 'Siddheshwar deore',
        username: '@siddheshwardeoreweb',
        image: '/assets/img/testimonial-img/R-letter.png',
        rating: 5,
        comment: `Codemind Technology is an excellent institute for IT courses. The course was well
                  structured and covered everything from basics to advanced. The instructors are 
                  well experienced and passionate about their job, they explained all concepts 
                  clearly and focused on each and every individual. All HR teams and staff are very 
                  helpful and supportive. strongly recommend it to all who want to start their 
                  career in IT. I was especially thankful to Mr. Gajanan Kharat Sir and CodeMind 
                  Technology. .`
      },
      {
      name: 'Mayur Patil',
      username: '@mayurpatilweb',
      image: '/assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `Codemind Technology is the one of the best platform for learning.Codemind technology
                is the one of the best institute as per my experience. I never find such types of 
                trainers in my life. Specially Our trainer Mr. Gajanan sir. He is really great 
                teacher .He does not only focus on completing topics but also he checks the level of
                students understanding.with the help of Codemind Technology we can achieve our  Dream 
                job. Because of their best career guidance.I am very glad to have best trainers and
                the part of this institute.Thank you so much Codemind Technology..!!❤️ .`
    },
    {
      name: 'Datta Sonalkar',
      username: '@dattasonalkarweb',
      image: '/assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `I have recently joined C# class and had fantastic experience. The teacher is 
                knowledgeable and so supportive, providing Realtime practical knowledge , hands on 
                exercises that helps lot of me to improve my skills. I got confidence in c#. heartly
                thankful to CODEMIND TECHNOLOGY. I highly recommend code mind technology to any one 
                who want to enhance their skills and do his carrier in IT...Thank you CODEMIND TECHNOLOGY.`
    },
    {
      name: 'Swati Ajane',
      username: '@swatiajaneweb',
      image: '/assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `Codemind Technology is the best Institute for software courses. This Institute
                provides us recording session, and I recently enrolled in their Angular Developer 
                class, and I've been impressed with the experience so far. Our mentor, Gajanan Sir,
                is exceptionally supportive and knowledgeable, Thankyou codemind team. `
    },
    {
      name: 'Mayuri Hunge',
      username: '@mayurihungeweb',
      image: 'assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `I recently enrolled in Codemind Technologies react course. I had an excellent 
                experience while learning. They provide the recorded session which is very useful 
                for further revision. Also the trainer  I got in this course teach each and every 
                concept with real life examples. The most impressive thing which I experience in 
                daily lecture is there are 7 min techbyte session which is very much helpful. .`
    },
    {
      name: 'Amruta Bidri',
      username: '@amrutabidriweb',
      image: 'assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `Codemind technology is excellent institute for IT courses in affordable fees and 
                they have industry experienced instructors. Covers all in course content and teaches
                in easy way which makes one understand concepts in-depth. Real time interview Q & A
                sessions helps lot. Conducts mock interviews which helps to boost your confidence. 
                Special thanks to Mr. Chandan Jadhav sir for their valuable support & guidance.
                Best manual and automation testing class. .`
    },
    {
      name: 'Madhuri Dighe',
      username: '@madhuridigheweb',
      image: 'assets/img/testimonial-img/kalyani.png',
      rating: 5,
      comment: `CodeMind Technology is an excellent institute in Pune. I recently enrolled in their
                software testing class, and I've been impressed with the experience so far. Our 
                mentor, Chandan Sir, is exceptionally supportive and knowledgeable. He ensures that
                each student receives individual attention during classes, which has greatly 
                enhanced our learning experience. His teaching style is engaging and effective.
                Additionally, all the staff members are supportive and contribute to creating a 
                conducive learning environment.`
    },
    ];
  }
}
