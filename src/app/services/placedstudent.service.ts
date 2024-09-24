import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacedstudentService {

  constructor() { }
  getAllPlacedCandidates() {
    return [
        {
            image: 'assets/img/placed-candidate/swati.png',
            name: 'Swati P',
            company: 'City Bank',
            image2: 'assets/img/placed-candidate/placed-company-name/citybank1.png',
            quote: "CodeMind Technology is an excellent institute the way of teaching, explaining each concepts with real time examples in an easy manner helped me to learn and gain confidence in Java and the support they provide is really appreciated. I would thank my colleague who recommended me and thank you Umesh sir for all your support A #codemindTechnology",
            package: '28 LPA',
            designation: 'Java Developer',
            from:'BE Computer Science',
            To:'Java Developer '
        },
        {
            image: 'assets/img/placed-candidate/rajashree.png',
            name: 'Rajashree N',
            company: 'Persistent System',
            image2: "assets/img/placed-candidate/placed-company-name/persistent.jpg",
            quote: "The key to success is to focus on goal not on obstacles #bond #Dream journey starts but it is not possible without codemind. It was really great experience with codemind learning from basics to advance, real time scenarios discussion, live projects implementation & many more things. Thanks is so small word for your constant support. Thank you for your passion and for your willingness to share that passion with us",
            package: '8.5 LPA',
            designation: 'Angular Developer',
            from:'Msc (Computer Science)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/hemant.png',
            name: 'Hemnat K',
            company: 'Globant',
            image2: "assets/img/placed-candidate/placed-company-name/globant.jpg",
            quote: "It wasn't easy to come back after having gap of 8 plus year, I knew it is golden era for IT industry but always having doubts whether I would be able to get the job or not. Just wanted to have have job at least for 20k per month but training in depth content with hands on gave me this 9 LPA without even demand. Tons of thanks team. You helped me to chase my dream. I will be always greatful to you from bottom my heart.",
            package: '9 LPA',
            designation: 'Test Engineer',
            from:'BE (CSE)',
            To:'Software Test Engineer'

        },
        {
            image:'assets/img/placed-candidate/satish.jpeg',
            name:'Satish R.',
            company:'NeoSoft',
            image2:'assets/img/placed-candidate/placed-company-name/neosoft.png',
            quote:'So happy that I am able to achieve the good position in IT industry and it all happened because of codemind team day in and day out and effortsAssignment and project development along with mock interview helped me alot. Thank you so much team.',
            package:'4.25 LPA',
            designation:'React Developer',
            from:'BE information Technology',
            To:'React Developer',
           },
        {
            image: 'assets/img/placed-candidate/dinesh.png',
            name: 'Dinesh S',
            company: 'Yash technologies',
            image2: "assets/img/placed-candidate/placed-company-name/yash2.png",
            quote: "It wasn't easy to come back after having a gap of 8 years (non-tech), I knew it is a golden era for the IT industry but always had doubts about whether I would be able to get the job or not. I wasn't worried about the package, just wanted to have a job in IT. but training in-depth content with my hands-on gave me magical results without even demand. Tons of thanks team. You helped me to chase my dream.",
            package: '7.8 LPA',
            designation: 'Senior Angular Developer',
            from:'BE (CSE)',
            To:'Senior Angular Developer'
        },
        {
        image:'assets/img/placed-candidate/kiran.jpeg',
        name:'Kiran',
        company:'Persistent System',
        image2:'assets/img/placed-candidate/placed-company-name/persistent.jpg',
        quote:'Thank you codemind technology. It is an excellent Institute, explaning each concept with real time examples and teaching help me to gain knowledge and confidence in  programming.  Special Thanks to umesh sir  for teaching & all your support and pankaj sir for teaching and guidance.Thanks to all my codemind friends for supporting me',
        package:' 5.5 LPA',
        designation:' software Developer ',
        from:'B.E',
        To:'software Developer'
        },
        {
         image:'assets/img/placed-candidate/yoganshi.jpeg',
         name:'Yogyashri S',
         company:'Ecotech IT Solutions',
         image2:'assets/img/placed-candidate/placed-company-name/echotech2.png',
         quote:'Codemind Technology is not just a Institute it is a family which helps me to achieve my goal. Before joining the Codemind Technology i was scared of programming and having low  confidence but daily assignments and mock becomes very helpfull for me .All trainers are very supportive, Thank you Codemind family, Specially thanks to the Gajanan sir And Dhanaji sir',
         package:'2.4LPA',
         designation:'Test Engineer',
         from:'BE (CSE)',
         To:'Test Engineer'
        },
       
        {
         image:'assets/img/placed-candidate/swapnil.jpeg',
         name:'Swapnil Potdar',
         company:' Accenture ',
         image2:'assets/img/placed-candidate/placed-company-name/accenture.png',
         quote:'Its wasnt easy to get a job in IT industry. But, Codemind has given me that faith to achieve magical results without even dimand. You are my success partner. First job is always special so as you team Codemind. Thanks a lot❤',
         package:'5.5 LPA',
         designation:'Java Developer',
         from:'BE',
         To:'Java Developer'
        },
        {
            image:'assets/img/placed-candidate/pranjal.jpeg',
            name:'Pranjal S',
            company:'Xoriant',
            image2:'assets/img/placed-candidate/placed-company-name/xoriant.png',
            quote:'Thank you Codemind for a great course. Great presentation style with lots of opportunities to ask questions and talk about real life examples which all made for a really enjoyable and informative course. The content was great and very relevant to me both personally and professionally. ',
            package:'2.5 LPA',
            designation:'Test Engineer',
            from:'BE civil',
            To:'Test Engineer'
        },
      
        {
            image: 'assets/img/placed-candidate/shubham.png',
            name: 'Shubham Z',
            company: 'Tech Mahindra',
            image2: "assets/img/placed-candidate/placed-company-name/tech.png",
            quote: "After graduation, I was studying for competitive exams. Year after year passed but no success came. I don't know what to do. Now if I go to enter IT, the gap has become very big issue. A ray of sunshine came in my dark life by the name of CODEMIND and today my life changed. Thanks again everyone.",
            package: '5.0 LPA',
            designation: 'Angular Developer',
            from:'Bsc',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/sushant.png',
            name: 'Sushant J',
            company: 'LNT Infotech',
            image2: "assets/img/placed-candidate/placed-company-name/landt.jpeg",
            quote: "The good Education can change anyone but good teachers can change everything. My journey is started from very basic. I learn each and every point and it is possible due to Gajanan sir and Dhyanesh sir ....Thank you so much codemind family and all group friends",
            package: '4.8 LPA',
            designation: 'Angular Developer',
            from:'BE Mechnical',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/dnyaneshwar.png',
            name: 'Dnyaneshwar R',
            company: 'NeoSoft',
            image2: "assets/img/placed-candidate/placed-company-name/neosoft.png",
            quote: "It wasn't easy after long gap. I lost my all confidence. Never thought that I would be able to start my career in IT industry. My dream come true it is all because of the effort and codemind team help. Thank you so much for supporting me and helping me to achieve my dream job.",
            package: '5.0 LPA',
            designation: 'Test Engineer',
            from:'BE (CSE)',
            To:'Software Teat Engineer'
        },
        {
            image: 'assets/img/placed-candidate/chandrashekhar.png',
            name: 'Chandrashekhar T',
            company: 'Clover Infotech',
            image2: "assets/img/placed-candidate/placed-company-name/clover.jpeg",
            quote: "Changing your whole career in a span of 3  to 5 months is not an easy task and CodeMind has helped me to achieve this in very easy way.  Their way of teaching and continue support had helped me to get this offer. Thank you CodeMind Team ♥.",
            package: '2.8 LPA',
            designation: 'Angular Developer',
            from:'BE Civil',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/abhijeet.png',
            name: 'Abhijeet K',
            company: 'NeoSoft',
            image2: "assets/img/placed-candidate/placed-company-name/neosoft.png",
            quote: "It was very difficult for me to come into IT because, at that time  4 years career gap after graduation But after joined Codemind technology institute I learned technical concepts in an easy way, so those concepts are very helpful for me in interviews. Specially Thanks to Gajanan  Sir, Shilpa mam and Codemind family, Codemind friends for your support and guidance.",
            package: '2.4 LPA',
            designation: 'UI Developer',
            from:'BE (CSE)',
            To:'UI Developer'
        },
        {
            image: 'assets/img/placed-candidate/abdul.png',
            name: 'Abdul N',
            company: 'NeoSoft',
            image2: "assets/img/placed-candidate/placed-company-name/neosoft.png",
            quote: "Many times, I felt that I cannot do my career in IT industry because of rejections that received many times that's why I lots my hope, By god grace, I mate the true, caring institute Codemind that really took care of me like family and taught me each and everything step by step and a outcome got my dream job. thank you so much Codemind team🙏🙏 My best wishes will be always with you🙋‍♂",
            package: '4.8 LPA',
            designation: 'Software Test Engineer',
            from:"BE Mechanical",
            To:"Software test engineer"
        },
        {
            image: 'assets/img/placed-candidate/dada.png',
            name: 'Dada G',
            company: 'Cuelogic Technologies',
            image2: "assets/img/placed-candidate/placed-company-name/cuelogic.png",
            quote: " Even the darkest night will end and the sun will rise. Never lose hope, because a new day will bring endless possibilities and opportunities for success. A big thank you to Codemind Team for helping me to  see that day so early.",
            package: '2.60 LPA',
            designation: 'Angular Developer',
            from:'BCS',
            To:'Angular developer'
        },
        {
            image: 'assets/img/placed-candidate/sanket.png',
            name: 'Sanket M',
            company: 'Tech Mahindra LTD',
            image2: "assets/img/placed-candidate/placed-company-name/tech.png",
            quote: " I had an outstanding experience at CODEMIND Technology! The teaching staff is exceptional, with effective teaching techniques and proven results. The instructors are highly skilled and use practical applications to make learning enjoyable. The support and guidance are commendable. Highly recommended for anyone looking to expand their tech skills! Super thanks to All CODEMIND Team",
            package: '3.40 LPA',
            designation: 'Angular Developer',
            from:'BE (CSE)',
            To:'Angular Developer'

        },
        {
            image: 'assets/img/placed-candidate/pooja.png',
            name: 'Pooja J',
            image2: "assets/img/placed-candidate/placed-company-name/emerson.png",
            company: 'Emerson',
            quote: "I joined this institute to take the training for angular developers. The training was excellent & also provide recording facility for revising. This institute helps to build confidence, valuable experience and learning. I really like this institute's training environment. In this institute, all trainers have good experience and they start teaching from basic to advanced. ",
            package: '2.00 LPA',
            designation: 'Angular Developer',
            from:'BE (CSE)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/kartik.png',
            name: 'Kartik D',
            company: 'E-Bizindia PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/ebizindia.png",
            quote: "Codemind Technology is the one of best institute for fresher and experienced person .this is very supportive and friendly nature in this institute. Thank you to Codemind Team such as dhanaji sir , gajanan sir ,masal sir etc and also thank you for giving good friends through this institute. Thanks again",
            package: '2.4. LPA',
            designation: 'React Developer',
            from:'ENTC Engineer',
            To:'React Developer'
        },
        {
            image: 'assets/img/placed-candidate/vaibhav.png',
            name: 'Vaibhav G',
            company: 'E-Zest Software Solutions',
            image2: "assets/img/placed-candidate/placed-company-name/e-zest.png",
            quote: "The journey started from very basic from c sharp then I learnt advance concept but all this is completed in very smoothway and I enjoyed each and every session that so Sumit sir has conducted.Thank you so much team and friends. I got my dream job My best wishes wishes.",
            package: '2.80 LPA',
            designation: 'Dot Net Developer',
            from:'Msc(Computer Science)',
            To:'Dot Net Developer'
        },
        {
            image: 'assets/img/placed-candidate/dipali.png',
            name: 'Dipali K',
            company: 'Cyient LTD, Pune',
            image2: "assets/img/placed-candidate/placed-company-name/cyient.png",
            quote: "My dream come true, can't believe. I got the job. I am on top of sky.. i have no words.. to express my words. All this happened it's because of you Tulsi and Chandan Sir. Salute your hard works that you are putting each day.. I struggled alot but at the end i got my dream job it's because you Codemind Team..Thank you so much.❤",
            package: '3.20 LPA',
            designation: 'Software Test Engineer',
            from:'BCS',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/suhas.png',
            name: 'Suhas L',
            company: 'Mphasis Limited',
            image2: "assets/img/placed-candidate/placed-company-name/mphasis.png",
            quote: "This is the proudest moment of my life. I was an average student. I had no special skills to prove myself. But after being a part of CodeMind Team, I'm unable to believe what I achieved now. It's only possible because of CodeMind Team. The way they taught, I learned every concept with an interest. They always inspired me. Gajanan sir always said, Suhas, you can do, you have that potential. And a big Thanks to all the CodeMind Team.",
            package: '5.5 LPA',
            designation: 'Angular Developer',
            from:'MCA',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/megha.png',
            name: 'Megha K',
            company: 'Aloha Technology',
            image2: "assets/img/placed-candidate/placed-company-name/aloha.png",
            quote: "Learning to write programs stretches your mind, and help to think better,creates a way of thinking about things that I think is helpful in all domains and codemind is the place where you will learn how to write program and think about logic. thank you so much CodeMind Team.",
            package: '2.5 LPA',
            designation: 'Angular Developer',
            from:'BCA',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/ruturaj.png',
            name: 'Ruturaj K',
            company: 'Jade Global,Pune',
            image2: "assets/img/placed-candidate/placed-company-name/jade.png",
            quote: "With a non IT Background I thought that it was barely possible to enter in IT industry. But there was Codemind Technologies who helped to make me believe that it was possible, and I am happy to announce that I finally got a job in IT industry. It was a difficult journey for me. Even with the Non IT background I was able to learn and understand all the concepts. So I like to thank Codemind Technologies.",
            package: '2.5 LPA',
            designation: 'Software Test Engineer',
            from:'BE Mechnical',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/ganesh.png',
            name: 'Ganesh K',
            company: 'Excellarate Softech India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/Excellarate.png",
            quote: "माझ्या पहिल्या जॉब चे कॉन्ट्रॅक्ट संपल्याचा Email आल्यानंतर मी खूप विचारत होतो. त्यानंतर काही दिवसांनी मित्रांकडून क्लास संबंधी माहिती मिळाली व मी क्लास जॉईन केला. गजानन सर, धनाजी सर आणि शिल्पा मॅम यांनी आम्हाला जॉब मिळावा यासाठी १००% प्रयत्न केले. तसेच गावाकडच्या मुलांना आयटीमध्ये कशाप्रकारे आणता येईल त्या दृष्टीने खूप प्रयत्न आणि ओढ पाहायला मिळाली. मला आपले प्रेरणादायी मार्गदर्शन लाभल्याबद्दल मी आपल्या पूर्ण Codemind Team ऋणी आहे",
            package: '3.12 LPA',
            designation: 'React Developer',
            from:'MCA',
            To:'React Developer'
        },
        {
            image: 'assets/img/placed-candidate/rahul.png',
            name: 'Rahul I',
            company: 'Master Card',
            image2: "assets/img/placed-candidate/placed-company-name/Mastercard.png",
            quote: "Codemind Technology played a pivotal role in my journey, as the constant guidance I received and the encouragement that was showered on me helped me learn better. I was lacking in communication and confidence. but this training helped me to get the good technical knowledge and also gave me confidence. The mentorship arrangement makes it all a fantastic experience.Thank you so much Codemind Team.",
            package: '2.4 LPA',
            designation: 'Angular Developer',
            from:'Msc (Computer science)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/prashant.png',
            name: 'Prashant P',
            company: 'Excellarate Softech India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/Excellarate.png",
            quote: "I don't know about what is coding, what is angular but after 4 month i got the knowledge about front end technology and this happened because of the Codemind family, they teach us like a friend like a family, it was my turning point when i joined the Codemind and finally i have achieved what i want. Thanks to all Codemind family for your help. Thank you again.",
            package: '4.5 LPA',
            designation: 'Angular Developer',
            from:'BE Mechnical',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/pankaj.png',
            name: 'pankaj P',
            company: 'Capita India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/capita.png",
            quote: "My dream to join product based company that dream comes true at the starting of my journey because of #CodeMind team so thank you a lots team you gave shape to my life. Specially thanks to Gajanan sir for your teaching and moral support is beyond the world. Thank you CodeMind for such great journey which I never end",
            package: '3.4 LPA',
            designation: 'Angular Developer',
            from:'BE',
            To:'Angular Developer '
        },
        // {
        //     image: 'assets/img/placed-candidate/sonali_k.png',
        //     name: 'Sonali K',
        //     company: 'Capgemini',
        //     quote: "Any Institute Success is determined by the right connectivity between the faculties and students and CodeMind Technology is the best example of that.It is very true that codemind is my success partner. After having a long gap of 10 years i completely lost the hope of getting good job in IT. I would specially thank to Dhanaji sir for their kind and moral support. Last but not least I am thanking code mind for giving",
        //     package: '6.8 LPA',
        //     designation: 'Angular Developer',
        // },
        {
            image: 'assets/img/placed-candidate/ritesh.png',
            name: 'Ritesh Z',
            company: 'Suma Soft',
            image2: "assets/img/placed-candidate/placed-company-name/sumasoft.jpeg",
            quote: "Finally my struggle is over, since from last 2 years I was searching for jobs but each type I failed and failed again. was completely hopeless, wasn't having confidence that wther, I am calibre enough to do the job or not but this training changed everything in my life. thank you so much for my team.",
            package: '2.8 LPA',
            designation: 'UI Developer',
            from:'MBA',
            To:'UI Developer'
            
        },
        {
            image: 'assets/img/placed-candidate/harshvardhan.png',
            name: 'Harshvardhan J',
            company: 'Discus Business Solutions',
            image2: "assets/img/placed-candidate/placed-company-name/discus.png",
            quote: "No words to express my feeling. Graduated in 2017 after that i have search the lot of technical and non technical job but nothing will be happen only contract based job. then i decided need to stable in any one field and then i can go with the Codemind Family and see the result i have started my carrior more than I expected. Codemind is the another family who will be take care of child as a mother.",
            package: '4.6 LPA',
            designation: 'Software Developer',
            from:'MBA',
            To:'Software Developer'
        },
        {
            image: 'assets/img/placed-candidate/ajay.png',
            name: 'Ajay V',
            company: 'bynaric System',
            image2: "assets/img/placed-candidate/placed-company-name/bynaric.png",
            quote: "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains and CodeMind is the place where you will learn how to write program and think about logic.Thank you so much CodeMind Team.",
            package: '3.0 LPA',
            designation: 'Java Developer',
            from:'BE (CSE)',
            To:'Java Developer'
        },
        {
            image: 'assets/img/placed-candidate/snehal.png',
            name: 'Snehal B',
            company: 'QualEx Systems',
            image2: "assets/img/placed-candidate/placed-company-name/qualex.png",
            quote: "I never imagined that I would be able to start my career. Was competically demotivated and frustrated as well because I always used to see my friends there working on good positions and I was the only lacking behind. Thanks God I got the perfect guidance and mentorship along with notes. Due to which only I am able to start my career. Thank you so much Codemind team",
            package: '5.3 LPA',
            designation: 'Software Test Engineer',
            from:'Bsc',
            To:'Software Test Engineer'
        },
       
        {
            image: 'assets/img/placed-candidate/pradeep.png',
            name: 'Pradeep K',
            company: 'Knoxpo Software',
            image2: "assets/img/placed-candidate/placed-company-name/knoxpo.png",
            quote: "My journey started from scratch. Wasn't sure whether I am capable enough to get job or not. But step by step learning with real word scenarios helped me to get confidence. Yes, it matters alot when we have the trainers like Chandan sir and Tulsi sir, who is working on QA lead position and has in depth understanding. Thank you so much team My best wishes will be with you always team.",
            package: '5.5 LPA',
            designation: 'Software Test Engineer',
            from:'Bsc',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/sankalp.png',
            name: 'Sankalp P',
            company: 'Clover Infotech',
            image2: "assets/img/placed-candidate/placed-company-name/clover.jpeg",
            quote: "I was having gap more than 2 years, was new in programming world, initially wasn't sure whether I would be able to get the job or not but each time team codemind gave me the support and said don't worry chill out and just focus on the training day in day out activities and end of the training you will have the job. Very happy, It happened, Got the job + amazing Package. Thank you so much team!",
            package: '4.0 LPA',
            designation: 'Angular Developer',
            from:'BE Mechanical',
            To:'Angular Developer'
        },
      
        {
            image: 'assets/img/placed-candidate/vitthal.png',
            name: 'Vitthal K',
            company: 'Mphasis',
            image2: "assets/img/placed-candidate/placed-company-name/mphasis.png",
            quote: "One and only right decision ever in my life is I Joined CODEMIND Where I got Knowledge From Basic they transform my career from Civil Engineer to UI developer in Just 5 Months.I will be always Greatfull to all My leaders in CODEMIND Team. You are my next family.",
            package: '6.91 LPA',
            designation: 'Angular Developer',
            from:'BE Civil',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/ashutosh.png',
            name: 'Ashitosh M',
            company: 'Axis Securities PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/Axis-Securities.jpg",
            quote: "I have decided to get a job of more than 5LPA before passout. I get that job it's because of codemind and all its team and specially because of Umesh sir.every one said लिए कुछ खोना पड़ता है।' But I belive in' जॉब पाने के लिए codemind को ज्वाइन करना पड़ता है! “Thank you so much codemind and all its team to guide me and support me",
            package: '5.0 LPA',
            designation: 'Java Developer',
            from:'BE (CSE)',
            To:'Java Developer'
        },
        {
            image: 'assets/img/placed-candidate/anuradha.png',
            name: 'Anuradha A',
            company: '3i Infotech',
            image2: "assets/img/placed-candidate/placed-company-name/3i.png",
            quote: "I had a dream to work as a Software Engineer. but I didn't know programming. A dream remained a dream. But today that dream came true because of the Codemind.'Just trust CodeMind, Success is in your hand.'Codemind is the turning point of my life.One of the best decisions of my life to become a part of the Codemind family.Thank you so much Codemind team and my success credit goes to the Codemind family.",
            package: '5.6 LPA',
            designation: 'Angular Developer',
            from:'ME (ENTC)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/tanaji.png',
            name: 'Tanaji V',
            company: 'Bilvantis Technologies',
            image2: "assets/img/placed-candidate/placed-company-name/bilvantis.png",
            quote: "One of the best decision in my life is to become the part of codemind family. Here in last 3.5 months learned from basic to bit advance. Also I am very happy that I am able to grab the job in just second interview. It is amazing feeling I ever had. All this is possible because of you codemind team. Thank you so much My best wishes is always with you team.",
            package: '3.0 LPA',
            designation: 'React Developer',
            from:'BCS',
            To:'React Developer'
        },
        {
            image: 'assets/img/placed-candidate/akshay.png',
            name: 'Akshay C',
            company: 'Softenger India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/softenger.png",
            quote: "I used to dream to have the job in final year, I mean before final year exam and I am super happy, I did it All these credit goes to the Codemind, the way syllabus is desined and the way trainer delivered it to freshers. I learn from basic to Advance Java. Thank you so much Codemind. You are my success partner.First job is always special so as you team Codemind and Umesh sir.",
            package: '3.5 LPA',
            designation: 'Java Developer',
            from:'BE (CSE)',
            To:'Java Developer'
        },
        {
            image: 'assets/img/placed-candidate/shital.png',
            name: 'Shital P',
            company: ' Magic Software’s Enterprises India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/magic.png ",
            quote: "This is very proud movement in my life. It has happened only because of Codemind Team. And I feel very happy because I am a part of this family. Thanks to everyone they support me each stage. I remember that, In the first conversation with the Dhyanesh Sir I gave him a word that I will give you my first offer within a week and I did. Once again thank you",
            package: '6.14 LPA',
            designation: 'Software Engineer',
            from:'BE (CSE)',
            To:'Software Engineer'
        },
        {
            image: 'assets/img/placed-candidate/amar.png',
            name: 'Amar P',
            company: 'PSK Technologies PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/psk.png",
            quote: "finally i got job. All this is possible due to Codemind. switching my core civil engineering to IT it was risk, but when i got to know about Codemind everything is easier to me. once i entered with it and i never sew back. I worked on my drawbacks and filled it with better knowledge. I'm really happy that I could connect with Codemind only. You all are truly my success partners.",
            package: '3.36 LPA',
            designation: 'React Developer',
            from:'BE (Civil)',
            To:'React Developer'
        },
        {
            image: 'assets/img/placed-candidate/sunil.png',
            name: 'Sunil L',
            company: 'PiSyst India PVT LTD',
            image2: "assets/img/placed-candidate/placed-company-name/pisys.png",
            quote: "No words to explain my feelings, I can't believe it, I got a job as Software developer. I am MSc Microbiology graduates. Never wrote single line of code, was completely new, in fact was not knowing before what is programming? But hatts off to your team heartly. It's all happened because of your support and guidance codemind team. Thank you, thank you for helping me to chase my dream.",
            package: '3.2 LPA',
            designation: 'Angular Developer',
            from:'Mcs (Microbiology)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/kapil.png',
            name: 'Kapil J',
            company: 'Druva Software',
            image2: "assets/img/placed-candidate/placed-company-name/Druva.png",
            quote: "I started my career with teaching, but now successfully I have switched my career in the IT profession. It is possible due to CodeMind training and CodeMind family.A good teacher, like a good entertainer first must hold his audience's attention, then he can teach his lesson.",
            package: '6.5 LPA',
            designation: 'Angular Developer',
            from:'BE Mechanical',
            To:'Angular Developer'

        },
        {
            image: 'assets/img/placed-candidate/kalpana.png',
            name: 'Kalpana M',
            company: 'Neotics Lab, Pune',
            image2: "assets/img/placed-candidate/placed-company-name/neotic.jpeg",
            quote: "After having gap of years I decided percussive my IT career and give my 100% of effort and you give 200% of your knowledge, skills, motivation that is spark my dream job. Mock interviews built up my confidence. Thank you complete CODEMIND team for being my success partner.I had a great learning experience under your shelter where you taught with great passion and skill",
            package: '4.5 LPA',
            designation: 'Software Test Engineer',
            from:'MCA',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/udaysing.png',
            name: ' Udaysinh V',
            company: 'Aloha Technology',
            image2: "assets/img/placed-candidate/placed-company-name/aloha.png",
            quote: "Can an arts graduate become a software developer and work in the IT industry? Yes, anyone can become a software developer. All are excellent teachers. Thank you so much, CODEMIND, for giving me my plan B. One more thing: as far as I know, there is no other coaching institute in Pune or even in India that has placed a Bachelor of Arts student as a software developer. I love Codemind!",
            package: '5.0 LPA',
            designation: 'Angular Developer',
            from:'BA (YCMOU Distance)',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/maya.png',
            name: ' Maya S',
            company: 'Hexaware',
            image2: "assets/img/placed-candidate/placed-company-name/hexaware.jpg",
            quote: "It was very difficult for me to relearn when I had a life outside of education. But this is the result of hard work done by Codemind team. Thanks to Gajanan sir, Masal sir, Dhanaji sir, Shweta mam and last and special thanks to dnyanesh sir. Their encouragement and advice is special and thanks to all my CodeMind friends for supporting me.",
            package: '6.0 LPA',
            designation: 'Angular Developer',
            from:'BE Information Technology',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/sonali.png',
            name: 'Sonali D',
            company: 'Capgemini',
            image2: "assets/img/placed-candidate/placed-company-name/capgemini.png",
            quote: "Don't give up. My transition from after 4 years gap to a Software Test Engineer, that too in affordable fee, Yes in last 4 months, I worked hard, very hard on skills and communication not only that my instructor commitment, passion for teaching and CODEMIND team help has shaped my professional career. Thank you team!",
            package: '7.5 LPA',
            designation: 'Software Test Engineer',
            from:'BE',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/amit.png',
            name: 'Amit K',
            company: 'Infosys',
            image2: "assets/img/placed-candidate/placed-company-name/infosys.jpg",
            quote: "That's true, If we put 120% dedication and hardwork just for 6 months we can change the life. But I am supper lucky in just 3 months my life changed. Got selected as a Test Engineer my batch yet to complete. All this is possible because of you Codemind the perfect mentor, complete curriculum and off course mock interviews. Thank you so much from bottom of my heart",
            package: '5 LPA',
            designation: 'Angular Developer',
            from:'BE Mechnical',
            To:'Angular Developer'

        },
        {
            image: 'assets/img/placed-candidate/santosh.png',
            name: 'Santosh D',
            company: 'Mobisoft Technology',
            image2: "assets/img/placed-candidate/placed-company-name/mobisoft.jpeg",
            quote: "That's true, If we put 120% dedication and hardwork just for 6 months we can change the life. But I am supper lucky in just 3 months my life changed. Got selected as a Test Engineer my batch yet to complete. All this is possible because of you Codemind the perfect mentor, complete curriculum and off course mock interviews. Thank you so much from bottom of my heart",
            package: '5 LPA',
            designation: 'Angular Developer',
            from:'Bsc',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/pratiksha.png',
            name: 'Pratiksha P',
            company: 'EnvisioDevs pvt.ltd',
            image2: "assets/img/placed-candidate/placed-company-name/envisioDevs.png",
            quote: "Many people gave me advice that it's really difficult to step in into IT industry, yes I totally agree, I struggled alot since last two years but I am very fortunate that I have selected the best institute which helped me in each step for softskill and in dept knowledge plus real time project scenarios in manual and automation testing. Thank you sir and team for all your support !!!",
            package: '2.4 LPA',
            designation: 'Software Test Engineer',
            from:'Bsc',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/pragati.png',
            name: 'Pragati J',
            company: 'Icertis',
            image2: "assets/img/placed-candidate/placed-company-name/icertis.jpeg",
            quote: "No words to explain my feelings Before joining the training, everyone said, I can't do job as a Software Developer but I am super super happy. I proved them wrong. Yes. I did it. Degree does not matter. What matter is consistency in hands on and training. It's all happened because of your support and guidance Codemind team. Thank you, Thank you for helping me to chase my dream.",
            package: '4.6 LPA',
            designation: 'Angular Developer',
            from:'BCA',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/akash_channe.png',
            name: 'Akash C',
            company: 'Prudle Labs',
            image2: "assets/img/placed-candidate/placed-company-name/prudle.png",
            quote: 'With having gap more than 7 years, It was really difficult to come back. Relatives was never easy to digest but Codemind trainer, team changed my attitude. They trained me from raw candidate to job ready not only that their soft skill sessions and emotional support helped me a lot. Every time Sir pushed me beyond my limit and gave the confidence that I can do it. Thank you so much !!!',
            package: '3.8 LPA',
            designation: 'Software Test Engineer',
            from:'BE',
            To:'Software Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/amruta.png',
            name: 'Amruta G',
            company: 'Capgemini',
            image2: "assets/img/placed-candidate/placed-company-name/capgemini.png",
            quote: "I was having gap more than 3 years, was new in programming world, initially wasn't sure whether I would be able to get the job or not but each time team codemind gave me the support and said don't worry chill out and just focus on the training day in day out activities and end of the training you will have the job. Very happy, It happened, Got the job + amazing Package. Thank you so much team!",
            package: '6 LPA',
            designation: 'Angular Developer',
            from:'MBA',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/ashok.png',
            name: 'Ashok G',
            company: 'Yardi Software',
            image2: "assets/img/placed-candidate/placed-company-name/yardi.png",
            quote: "Great challenge in programming is keep going on with everyday learning with practice and motivation, Agree it's bit difficult to back up after having gap of 3 yrars specially for non IT background. I am super lucky, I have received step by step guidence from basic to advance and mock interviews gaves me the confidence! Thanks Team",
            package: '7.4 LPA',
            designation: 'Java Developer',
            from:'BE Mechanical',
            To:'Java Developer'
        },
        {
            image: 'assets/img/placed-candidate/ashwini.png',
            name: 'Ashwini K',
            company: 'Altizon Systems',
            image2: "assets/img/placed-candidate/placed-company-name/altizon.jpeg",
            quote: 'Manjile uniko milate hai unake erade pakke hote hai. I am agree 100. But erade pakke na ho to.. Everydays guidence, Perfect trainer and emotional support helped me to get this job and also in good company.Khup khup dhyanyawad team.तुम्ही लोकांनी जगण्याला अर्थ दिलाय माझ्या.Thank you so much',
            package: '4.2 LPA',
            designation: 'Test Engineer',
            from:'BCA',
            To:'Test Engineer'
        },
        {
            image: 'assets/img/placed-candidate/dnyaneshwar.png',
            name: 'Dnyaneshwar L',
            company: 'Johnson Controls',
            image2: "assets/img/placed-candidate/placed-company-name/Johnson.jpg",
            quote: 'Being selected at great company like Johnson Control is one of the best thing that happened to me. In just 4 months of training. I learned how software industry works from simple to complex project development. From having pass out in 2014, BE graduates and with almost 7 years gap was struggling, frustrating but team CODEMIND helped me to chase my dream. Thank you so much! Keep going team.',
            package: '5.5 LPA',
            designation: 'Java Developer',
            from:'BE Civil',
            To:'Java Developer'
        },
        {
            image: 'assets/img/placed-candidate/hanmant.png',
            name: 'Hanmant S',
            company: 'Exotel',
            image2: "assets/img/placed-candidate/placed-company-name/exotel.png",
            quote: "After completing MCA that is 9 years before in 2013, was struggled a lot to get the job but my destiny was having other plans so last 9 years doing the non technical job which wasn't relevant and fascinating. I never believed that will be able to come back but Codemind Technology said देर आये दुरुस्त आये and literally it happened. Thank you sir and team My dream comes true",
            package: '5 LPA',
            designation: 'Software Test Engineer',
            from:'BBA',
            To:'Software Test Engineer'
        },
      

        {
            image: 'assets/img/placed-candidate/kiran.png',
            name: 'Kiran B',
            company: 'Nihilent Technology',
            image2: "assets/img/placed-candidate/placed-company-name/nihilent.png",
            quote: 'Despite of 5 years gap to a Software Tester has been a tremendous journey at CODEMIND Technology, After 4 months of rigorous training schedule, lots of practical session and go live project work helped me to get a dream job in MNC, Tons of Thanks team.',
            package: '5.8 LPA',
            designation: 'QA Engg.',
            from:'BE (CSE)',
            To:'QA Engg'
        },
        {
            image: 'assets/img/placed-candidate/mahesh.png',
            name: 'Mahesh G',
            company: 'Umbrella  Infocare',
            image2: "assets/img/placed-candidate/placed-company-name/umbrella.png",
            quote: "As someone said,'The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.'I decided to change from mechanical field to IT field. But it was not easy to come back with 5 years gap. I joined codemind. I did all the things that teachers told. With the help of their support and hardwork I can achieve this success.Thank you CODEMIND and to all my friends.",
            package: '5.5 LPA',
            designation: 'Angular Developer',
            from:'BE Mechanical',
            To:'Angular Developer'
        },
        {
            image: 'assets/img/placed-candidate/maijbin.png',
            name: 'Maijbin T',
            company: 'Techzilla India Infotech',
            image2: "assets/img/placed-candidate/placed-company-name/techzilla.jpeg",
            quote: "It's not easy, specially for girls to come back after 5 years of gap. I was totally out off flow from the technical skills, In the starting of the training struggled a lot, Many times felt, I should give up now. But sir and Codemind team gave me huge support in technical front and finally, I got my dream job. I am on top of sky. It's all because of you Codemind Team. Thank you so much",
            package: '4.5 LPA',
            designation: 'Software Test Engineer',
            from:'BE (CSE)',
            To:'Software Test Engineer'
        },

    ];
}
}
