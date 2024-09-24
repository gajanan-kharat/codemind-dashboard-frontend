import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursebyId: any;
  allCourses=[
    {
      id:'1',
      url:'java',
      title: 'Full Stack Java Mastery',
      que:'What is Full Stack Java Mastery?',
      description:'Full Stack Java Mastery involves learning both front-end and back-end development using Java technologies. This includes mastering Java for server-side development with frameworks like Spring and Hibernate, and gaining skills in front-end technologies like HTML, CSS, and JavaScript. You will also work with databases, APIs, and deployment tools to build and manage complete web applications. Expertise in Full Stack Java equips you with the ability to create scalable, robust, and high-performance applications across the entire technology stack.',
      image:'/assets/img/courses/Java-img.jpg',
      delay: 500,
      heading:'Full Stack Developer (4 months)',
      eligibility:' BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
      prerequisites:'Basic knowledge of programming',
      curriculam:'',
      details: [
        { text: 'JAVA',points:'<ul><li>Core Java</li><li>Advanced Java</li><li>Frameworks</li><li>Tools & Testing</li></ul>',icon: 'fa-brands fa-java' },
        { text: 'GITHUB',points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>', icon: 'fa-brands fa-github' },
        { text: 'ADVANCE JAVA', points:'<ul><li> JDBC</li><li>servlets</li><li>JSP</li><li> JavaBeans</li></ul>',icon: 'fa-brands fa-java' },
        { text: 'SPRING',points:'<ul><li>Core Spring</li><li>Spring MVC</li><li>Spring Boot</li><li>Spring Data & Security</li></ul>', icon: 'fa-solid fa-power-off' },
        { text: 'AGILE JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
        { text: 'SPRING BOOT',points:'<ul><li>auto-configuration</li><li> Spring Boot starters</li><li>RESTful services</li><li>microservices</li></ul>', icon: 'fa-solid fa-power-off' },
        { text: 'ORM TOOLS',points:'<ul><li>Entity Mapping</li><li>Transactions & Caching</li><li>Querying</li><li>Inheritance & Polymorphism</li></ul>', icon: 'fa-solid fa-database' },
        { text: 'GOLIVE PROJECTS',points:'<ul><li>Project Planning & Setup</li><li>Development</li><li>Testing </li><li>Deployment</li></ul>', icon: 'fa-solid fa-desktop' },
      ],
      course: {
        desc: 'For a duration of 15 weeks, the course requires a commitment from 7AM - 8:30AM on weekdays, and 11AM-5PM on Saturday in an intensive and immersive curriculum.',
        duration: '15 Week (4 Months)',
        time: '7AM - 8:30AM week days<br> 11AM - 5PM Saturday',
        placement: '89.95% Pleacements',
        namehtml:{
            type:'CORE JAVA',
            subpoints:'<ol><li>java introduction</li><li>Basic program construction</li><li>Oops</li><li>Core Java project and keywords</li><li>String</li><li>Exeption Handling</li><li>Collection Framework</li><li>Multi threading</li></ol>'
            },
           namecss:{
             type:'ADVANCE JAVA',
             subpoints:'<ol><li>Advance java</li><li>sevlet JSP</li><li>Spring Intoduction</li></ol>'
            },
            namejavascript:{
                type:'SPRING BOOT',
                subpoints:'<ol><li>Spring Introduction</li><li>Spring core basic concepts</li><li>RESTFULL web services</li><li>Spring Boot</li><li>Spring data JPA</li><li>Spring Security and Swagger</li><li>Microsoft services</li><ol>'
            },
            nameangular:{
                type:'ORM TOOLS',
                subpoints:'<ol><li>Introduction</li><li>Architecture</li><li>Configuration and object mapping</li><li>Object States</li><li>To communication with DB</li><li>Mechanism and isolation levels</li><li>Cache Mechanism</li><li>Mapping relationship</li><li>Inheritancet</li></ol>'
            }
    },
     trainers:[
      {
        name: 'Mr.Gajanan',
        // expertisee: 'Java',
        current_position: 'Technical Lead',
        desc: 'Currently working in HCL Technologies as a Technical Lead.<br/> Overall 10 plus years of experience in Web and Product Development - Full stack Developer,<br/> Also has 3 years onsite working experience in UK and US.<br/> Prior to that had working experience with LNT Infotech, Geometric and Persistent System<br/> Skill Set : Angular, Java, Spring Boot, Microservices, CICD, Jenkin, Docker, SQL, Oracle, My SQL',
        image: 'assets/img/all-course-icon.png',
        instagram_link:
            'https://www.instagram.com/codemind_technology_official/',
        linkedIn_link:
            'https://in.linkedin.com/company/codemind-technology',
        facebook_icon:'bx bxl-facebook',
        insta_icon:'bx bxl-instagram',
        twitter_icon:'bx bxl-twitter',
        linkedin_icon:'bx bxl-linkedin',
      }
     ]
},
{
  id:'2',
  url:'dotnet',
  title: 'Full Stack .NET Excellence',
  que:'What is Full Stack .NET Excellence?',
  description:'Full Stack .NET Excellence involves mastering both front-end and back-end development using the .NET framework. Through hands-on projects, you will learn to build web applications, APIs, and enterprise solutions using C#, ASP.NET Core, and Entity Framework. Whether you are a beginner or experienced, becoming skilled in Full Stack .NET opens up numerous career opportunities in software development.',
  image:'/assets/img/courses/dotnet.jpg',
  delay: 600,
  eligibility:' BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites:'Basic knowledge of programming',
  curriculam:'',
  details: [
    { text: 'C# .NET',points:'<ul><li>Core C#</li><li>ASP.NET</li><li>Entity Framework</li><li>Tools & Testing</li></ul>', icon: 'fa-solid fa-code' },
    { text: 'GITHUB',points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>', icon: 'fa-brands fa-github' },
    { text: 'SOLID PRICIPLES',points:'<ul><li>SRP</li><li>OCP</li><li>LSP</li><li>ISP & DIP</li></ul>', icon: 'fa-solid fa-power-off' },
    { text: 'AGILE JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
    { text: 'SQL',points:'<ul><li>Basic SQL</li><li>Advanced Queries</li><li>Database Design</li><li>Optimization & Management</li></ul>', icon: 'fa-solid fa-database' },
    { text: '.NET CORE WEB API',points:'<ul><li>Basics of .NET Core</li><li>Web API Development</li><li>Data Access</li><li>Advanced Topics</li></ul>', icon: 'fa-solid fa-desktop' },
    { text: 'GOLIVE PROJECTS',points:'<ul><li>Project Planning & Setup</li><li>Development</li><li>Testing </li><li>Deployment</li></ul>', icon: 'fa-solid fa-desktop' },
  ],
  course: {
    namehtml:{
    type:'C# .NET',
        subpoints:'<ol><li>OOPs-Concept & MS.NET Framework Introductio 1 Weeks</li><li>C# syntax</li><li>Collections and Generics & Exception Handling</li><li>Exception Handling </li><li>IO Streams</li><li>Delegates & Events & Multithreading</li><li>Multithreading</li></ol>'
        },
       namecss:{
         type:'SQL',
         subpoints:'<ol><li>Basics</li><li>DML Statements</li><li>SQL Functions</li><li>Select Queries</li><li>SQL Joins</li><li>SQL Operators</li><li>Store Procedure</li><li>Functions</li></ol>'
        },
        namejavascript:{
            type:'ASP.NET',
            subpoints:'<ol><li>NET Core Overview</li><li>Install ASP.NET Core</li><li>Create ASP.NET Core Web Application</li><li>ASP.NET Core Projects Folder Structure</li><li>String</li><li>wwwroot Folder</li><li>Importance of Startup.cs File</li><li>Working with Command-line Interface</li><li>ASP.NET Core Environment Variables</li><li>Dependency Injections</li><li>Built-in IoC Container</li><li>Working with Middleware</li><li>Custom Middlewares</li><li>Serving Static Files in ASP.NET Core</li><li>Serving Static Files From Any Folder in ASP.NET Core</li><li>Exception Handling in ASP.NET Core</li><li></li>Logging in .NET Core</ol><<li>Logging in ASP.NET Core</li><li>.NET Core Application Types</li>'
        },
        nameangular:{
            type:'DATABASE',
            subpoints:'<ol><li>Introduction to Database</li><li>What is SQL & SQL Commands</li><li>Datatypes in SQL</li><li>How to Create table in Database</li><li>How to Insert record into Database</li><li>Introduction to Select, Update and Delete statement</li><li>Introduction to Primary Key, Foreign Key, Composite Key</li><li>Introduction to AND, OR and NOT Operater</li><li>Introduction to SQL Functions</li><li>Introduction to Joins in SQL & Types</li><li>Introduction to IN, NOT IN, LIKE Opeaters</li></ol>'
        }
},

},
{
  id:'3',
  url:'testing',
  title: 'Manual and Automation Testing',
  que:'What is Manual and Automation Testing?',
  description:'Manual and Automation Testing involves checking software functionality either manually or using automated tools like Selenium. Manual testing requires human intervention, while automation testing uses scripts for efficiency. Mastering both methods ensures better software quality and faster testing processes.',
  image:'/assets/img/courses/Testing-img.jpg',
  delay: 700,
  eligibility:' BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites:'Basic knowledge of programming',
  curriculam:'',
  details: [
    { text: 'MANUAL TESTING',points:'<ul><li>Testing Fundamentals</li><li>Test Design</li><li>Execution & Reporting</li><li>Advanced Topics</li></ul>', icon: 'fa-regular fa-circle-check' },
    { text: 'CORE JAVA',points:'<ul><li> OOP concepts</li><li>control structures</li><li>collections</li><li>multithreading</li></ul>', icon: 'fa-brands fa-java' },
    { text: 'SELENIUM AUTOMATION',points:'<ul><li>Introduction to Java</li><li>Object-Oriented Programming</li><li>Advanced Concepts</li><li>Java APIs and Libraries</li></ul>', icon: 'fas fa-cogs icon' },
    { text: 'MAVEN', points:'<ul><li>POM</li><li>Dependencies Management</li><li>Lifecycle and Plugins</li><li>Repository Management</li></ul>',icon: 'fas fa-tools icon' },
    { text: 'AGILE JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
    { text: 'DATABASE',points:'<ul><li>Database Design & Modeling</li><li>SQL & Querying</li><li>Transactions & Concurrency</li><li>RDBMS</li></ul>', icon: 'fa-solid fa-database' },
    { text: 'JENKINS',points:'<ul><li>(CI/CD)</li><li>Jenkins Pipelines</li><li>Plugins and Extensibility</li><li>Jenkins Architecture</li></ul>', icon: 'fab fa-jenkins' },
    { text: 'GITHUB',points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>', icon: 'fa-brands fa-github' }
  ],
  course: {
    desc: 'For a duration of 15 weeks, the course requires a commitment from 7AM - 8:30AM on weekdays, and 11AM-5PM on Saturday in an intensive and immersive curriculum.',
    duration: '15 Week (4 Months)',
    time: '7AM - 8:30AM week days<br> 11AM - 5PM Saturday',
    placement: '90.00% Pleacements',
    namehtml:{
    type:'MANUAL TESTING',
    subpoints:'<ol><li>Basics of testing</li><li>Software deployement life cycle</li><li>Software Testing Types </li><li>Test Management tools</li><li>Defect Tracking management Tools</li><li>Api Testing using postman tools</li><li>Database</li></ol>'
    },
   namecss:{
     type:'AUTOMATION TESTING',
     subpoints:'<ol><li>Selenium Framework Setup</li><li>What is Selenium </li><li>What is Automation testing ? Advantages of Automation testing</li><li>Selenium OS and Browsers supported by Selenium</li><li>Java-Selenium Architecture</li><li>Web Driver Architecture</li><li>Basic selenium Program</li><li>Web driver Abstract methods</li><li>Selenium Locaters</li><li>Handling various Form Elements</li><li>Reporting Tool - JUnit, TestNG</li></ol>'
    },
    namejavascript:{
        type:'CORE JAVA',
        subpoints:'<ol><li>java introduction</li><li>Basic program construction</li><li>Oops</li><li>Core Java project and keywords</li><li>String</li><li>Exeption Handling</li><li>Collection Framework</li><li>Multi threading</li></ol>'
    },
    nameangular:{
        type:'DATABASE',
        subpoints:'<ol><li>Introduction to Database</li><li>What is SQL & SQL Commands</li><li>Datatypes in SQL</li><li>How to Create table in Database</li><li>How to Insert record into Database</li><li>Introduction to Select, Update and Delete statement</li><li>Introduction to Primary Key, Foreign Key, Composite Key</li><li>Introduction to AND, OR and NOT Operater</li><li>Introduction to SQL Functions</li><li>Introduction to Joins in SQL & Types</li><li>Introduction to IN, NOT IN, LIKE Opeaters</li></ol>'
    }
},
},
{
  id: '4',
  url: 'angular',
  title: 'Angular MEAN Stack',
  que:'What is Angular MEAN Stack?',
  description:'Angular MEAN Stack refers to a full-stack development framework that uses MongoDB, Express.js, Angular, and Node.js. This stack allows you to build dynamic web applications where Angular handles the front-end, and Node.js with Express manages the back-end, while MongoDB serves as the database. Mastering the MEAN stack enables developers to create scalable, efficient, and modern web applications.',
  image:'/assets/img/courses/Angular-img.png',
  delay: 800,
  eligibility: 'BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites: 'Basic knowledge of programming',
  curriculum: '',
  details: [
    { text: 'HTML',points:'<ul><li>Introduction to HTML</li><li>HTML Elements</li><li>Forms and Tables</li><li>Media and Embedding</li></ul>', icon: 'fa-brands fa-html5' },
    { text: 'CSS', points:'<ul><li>Introduction to CSS</li><li>Box Model</li><li>Layout Techniques</li><li>Styling</li></ul>',icon: 'fa-brands fa-css3-alt' },
    { text: 'JAVASCRIPT', points:'<ul><li>Basics</li><li>Functions</li><li>DOM Manipulation</li><li>Advanced Topics</li></ul>', icon: 'fa-brands fa-js' },
    { text: 'ANGULAR', points:'<ul><li>Angular Basics</li><li>Data Binding</li><li>Routing</li><li>Advanced Topics</li></ul>', icon: 'fa-brands fa-angular' },
    { text: 'GITHUB', points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>',icon: 'fa-brands fa-github' },
    { text: 'BOOTSTRAP',points:'<ul><li>Introduction</li><li>Grid System</li><li>Components</li><li>Utilities</li></ul>', icon: 'fa-brands fa-bootstrap' },
    { text: 'JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
    {text: 'Typescript', points:'<ul><li>Introduction to TypeScript</li><li>Functions</li><li>Advanced Types</li><li>TypeScript with Angular</li></ul>',icon:'fa-solid fa-code'}
  ],
  course: {
    namehtml:{
    type:'HTML',
    subpoints:'<ol><li> Syllbus walk through</li><li>Installation and Basics</li><li>Basic Tags and DOM Intro</li><li>List and Table</li><li>Fontawesome and Links</li><li>HTML Form</li><li>Inline and block elements</li><li>Media tags</li><li>iFrame </li><li>Website Developement</li></ol>'
    },
   namecss:{
     type:'CSS',
     subpoints:'<ol><li>CSS Basics and Properties</li><li>Selectors</li><li>Margin and Padding</li><li>Google font family</li><li>CSS Box Model and Box sizing</li><li>CSS Units</li><li>Display and positioning</li><li>Overflow</li><li>Flexbox</li></ol>'
    },
    namejavascript:{
        type:'JAVASCRIPT',
        subpoints:'<ol><li>Basics, Variable & Data types</li><li>Function</li><li>String</li><li>Operators</li><li>Control Flow,All 7 loops</li><li>Varibale Scopes</li><li>Array, Set and Map</li><li>Object, class</li><li>Function Constructor</li><li>Prototype,Memory Management</li><li>Shallow Clone and Deep Clone</li><li>Hoisting ,JSON</li><li>Closure and Callbacks</li><li>Webstorage</li><li>ES6 Features</li><li>Advance Functions</li><li>Async and await</li><li>DOM</li>'
    },
    nameangular:{
        type:'ANGULAR',
        subpoints:'<ol><li>"Angular Creating and Communicating Between Components</li><li>"Angular</li><li>Angula Directives</li><li>Angular Collecting Data with Forms and Validation </li><li>Angular Service and Dependency Injection </li><li>Angular Pipes</li><li>Angular Interceptor</li><li>Angular RXJS</li><ol>'
    }
},
},
{
  id: '5',
  url: 'react',
  title: 'React MERN Stack',
  que:'What is React MERN Stack?',
  description:'React MERN Stack is a full-stack JavaScript framework that includes MongoDB, Express.js, React, and Node.js. It allows developers to build dynamic, responsive web applications using React for the front-end, Node.js and Express for the back-end, and MongoDB for the database. Mastering the MERN stack helps you create robust, scalable applications with a unified JavaScript environment for both client and server-side development.',
  image:'/assets/img/courses/React-img.png',
  delay: 900,
  eligibility: 'BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites: 'Basic knowledge of programming',
  curriculum: '',
  details: [
    { text: 'HTML',points:'<ul><li>Introduction to HTML</li><li>HTML Elements</li><li>Forms and Tables</li><li>Media and Embedding</li></ul>', icon: 'fa-brands fa-html5' },
    { text: 'CSS', points:'<ul><li>Introduction to CSS</li><li>Box Model</li><li>Layout Techniques</li><li>Styling</li></ul>',icon: 'fa-brands fa-css3-alt' },
    { text: 'JAVASCRIPT', points:'<ul><li>Basics</li><li>Functions</li><li>DOM Manipulation</li><li>Advanced Topics</li></ul>', icon: 'fa-brands fa-js' },
    { text: 'REACT',  points:'<ul><li>Components</li><li>State Management</li><li>Props</li><li>Lifecycle Methods</li></ul>', icon: 'fa-brands fa-react' },
    { text: 'GITHUB', points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>',icon: 'fa-brands fa-github' },
    { text: 'BOOTSTRAP',points:'<ul><li>Introduction</li><li>Grid System</li><li>Components</li><li>Utilities</li></ul>', icon: 'fa-brands fa-bootstrap' },
    { text: 'JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
    {text: 'Typescript', points:'<ul><li>Introduction to TypeScript</li><li>Functions</li><li>Advanced Types</li><li>TypeScript with React</li></ul>',icon:'fa-solid fa-code'}
  ],
  course: {
    namehtml:{
        type:'HTML',
        subpoints:'<ol><li> Syllbus walk through</li><li>Installation and Basics</li><li>Basic Tags and DOM Intro</li><li>List and Table</li><li>Fontawesome and Links</li><li>HTML Form</li><li>Inline and block elements</li><li>Media tags</li><li>iFrame </li><li>Website Developement</li></ol>'

        },
       namecss:{
         type:'CSS',
         subpoints:'<ol><li>CSS Basics and Properties</li><li>Selectors</li><li>Margin and Padding</li><li>Google font family</li><li>CSS Box Model and Box sizing</li><li>CSS Units</li><li>Display and positioning</li><li>Overflow</li><li>Flexbox</li></ol>'
        },
        namejavascript:{
            type:'JAVASCRIPT',
            subpoints:'<ol><li>Basics, Variable & Data types</li><li>Function</li><li>String</li><li>Operators</li><li>Control Flow,All 7 loops</li><li>Varibale Scopes</li><li>Array, Set and Map</li><li>Object, class</li><li>Function Constructor</li><li>Prototype,Memory Management</li><li>Shallow Clone and Deep Clone</li><li>Hoisting ,JSON</li><li>Closure and Callbacks</li><li>Webstorage</li><li>ES6 Features</li><hr><li>Advance Functions</li><li>Async and await</li><li>DOM</li>'
        },
        nameangular:{
            type:'REACT',
            subpoints:'<ol><li>Prerequisite to learn React</li><li>Introduction to React</li><li>Installation and Project Structure</li><li>Understand folder structure and UI Composition</li><li>React component in detail</li><li>JSX and props</li><li>Routing using react router dom</li><li>Component communication</li><li>State in React</li><li>Conditional rendering and styling react comp</li><li>Component life cycle</li><li>Api integration</li><li>useEffect hook</li><li>Pure comp and Child to Parent data communication</li><li>Form handling in react</li><li>Advance form handling in react</li><li>Ref and useRef in react, Prop drilling</li><li>useContext hook</li><li>memo and useMemo</li><li>useReducer and useCallback hook</li><li>Controlled comp and Uncontrolled comp, Apex  chart</li><li>State management</li><li>CRUD operation using context api</li><ol>'
        }
},
},
{
  id: '6',
  url: 'devops',
  title: 'Devops And Cloud Integration',
  que:'What is DevOps and Cloud Integration?',
  description:'DevOps and Cloud Integration is the practice of combining development (Dev) and operations (Ops) to streamline software delivery and management through cloud platforms. It focuses on automating workflows, continuous integration, and deployment (CI/CD) using tools like Docker, Kubernetes, and cloud services such as AWS or Azure. Mastering DevOps and Cloud Integration enables faster, more efficient software development and deployment, making applications scalable and reliable.',
  image:'/assets/img/courses/devops.jpg',
  delay: 1000,
  eligibility: 'BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites: 'Basic knowledge of programming',
  curriculum: '',
  details: [
    { text: 'INTRODUCTION OF DEVOPS',points:'<ul><li>CI/CD</li><li>Infrastructure as Code</li><li>Monitoring and Logging</li><li>Collaboration</li></ul>', icon: 'fas fa-cloud' },
    { text: 'LINUX & VIRTUAL BOX',points:'<ul><li>Linux Basics</li><li>Shell Scripting</li><li>System Administration</li><li>VirtualBox</li></ul>', icon: 'fa-brands fa-ubuntu' },
    { text: 'BASH SCRIPTING',points:'<ul><li>Basics and Syntax</li><li>File Handling</li><li>Process Management</li><li>Scripting Best Practices</li></ul>', icon: 'fas fa-terminal icon' },
    { text: 'DOCKER',points:'<ul><li>Containers</li><li>Images</li><li>Dockerfile</li><li>Docker Compose</li></ul>', icon: 'fa-brands fa-docker' },
    { text: 'KUBERNET',points:'<ul><li>Architecture</li><li>Deployment</li><li>Service Discovery & Load Balancing</li><li>Configuration & Storage</li></ul>', icon: 'fa-solid fa-circle-nodes' },
    { text: 'AWS',points:'<ul><li>Cloud Computing Basics</li><li>Compute Services</li><li>Storage and Databases</li><li>Networking and Security</li></ul>', icon: 'fa-brands fa-aws' },
    { text: 'JIRA',points:'<ul><li>Introduction to Jira</li><li>Workflow Management</li><li>Agile Methodologies</li><li>Reporting and Analytics</li></ul>', icon: 'fa-brands fa-jira' },
    { text: 'GITHUB', points:'<ul><li>Introduction</li><li>Version Control</li><li>Repository Management</li><li>Collaboration</li></ul>',icon: 'fa-brands fa-github' },
  ],
 
},
{
  id: '7',
  url: 'paython',
  title: 'Paython And Data Science',
  que:'What is Python and Data Science?',
  description:'Python and Data Science involve using the Python programming language to analyze, visualize, and gain insights from data. Pythons simplicity, along with libraries like Pandas, NumPy, and Scikit-learn, makes it a powerful tool for data manipulation, machine learning, and statistical analysis. Mastering Python for Data Science equips you with the skills to work on data-driven projects across various industries.',
  image:'/assets/img/courses/paython.jpeg',
  delay: 1100,
  eligibility: 'BE | BTech | MCA | MCS | MCM | MSc | BCA | BCS | BSc etc',
  prerequisites: 'Basic knowledge of programming',
  curriculum: '',
  details: [
    { text: 'PYTHON BASICS', points: '<ul><li>Introduction to Python</li><li>Data Types</li><li>Control Structures</li><li>Functions and Modules</li></ul>', icon: 'fa-brands fa-python' },
    { text: 'DATA MANIPULATION', points: '<ul><li>Pandas Basics</li><li>Data Frames</li><li>Data Cleaning</li><li>Data Transformation</li></ul>', icon: 'fa-solid fa-database' },
    { text: 'NUMPY', points: '<ul><li>Introduction to NumPy</li><li>Arrays and Matrices</li><li>Mathematical Operations</li><li>Linear Algebra</li></ul>', icon: 'fa-solid fa-square-root-alt' },
    { text: 'DATA VISUALIZATION', points: '<ul><li>Matplotlib Basics</li><li>Plotting Graphs</li><li>Seaborn Library</li><li>Interactive Plots</li></ul>', icon: 'fa-solid fa-chart-line' },
    { text: 'MACHINE LEARNING', points: '<ul><li>Introduction to Machine Learning</li><li>Supervised Learning</li><li>Unsupervised Learning</li><li>Model Evaluation</li></ul>', icon: 'fa-solid fa-brain' },
    { text: 'STATISTICAL ANALYSIS', points: '<ul><li>Descriptive Statistics</li><li>Probability Distributions</li><li>Hypothesis Testing</li><li>Statistical Models</li></ul>', icon: 'fa-solid fa-calculator' },
    { text: 'PROJECTS', points: '<ul><li>Real-World Data Projects</li><li>Data Analysis Projects</li><li>Machine Learning Projects</li><li>Data Visualization Projects</li></ul>', icon: 'fa-solid fa-project-diagram' }
  ]
  
},
  ]
  constructor() { }
  getCourseDetails(courseUrl: string) {
    return this.allCourses.find(course => course.url === courseUrl);
  }
  getCourses() {
    return this.allCourses;
  }
}
