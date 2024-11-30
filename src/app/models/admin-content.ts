export const TOP_ITEMS = [
    { course: 'Angular MEAN Stack', icon: 'fa-brands fa-angular', color: '#f8e9e9', iconColor: '#c70000' },
    { course: 'React MEAN Stack', icon: 'fa-brands fa-react' ,color: '#d2f2f5', iconColor: '#0ac1ef'},
    { course: 'Java Full Stack', icon: 'fa-brands fa-java',color: '#d8d8ff', iconColor: '#0a0aff' },
    { course: 'Manual and Automation Testing', icon: 'fa fa-cogs',color: '#fdfde3' ,iconColor: '#999900'},
    { course: '.Net Full Stack', icon: 'fa-brands fa-microsoft',color: '#daeefc' , iconColor: '#007acc'},
    // { course: 'Python with Data Science', icon: 'fa-brands fa-microsoft',color: '#daeefc' , iconColor: '#007acc'},
  ];

export const COLLEGE_ITEMS = [
    { name: 'In Progress', icon: 'fa-solid fa-spinner', color: '#414110', iconColor: '#FFFFFF' },
    { name: 'In Plan', icon: 'fa-solid fa-calendar-alt', color: '#044758', iconColor: '#FFFFFF' },
    { name: 'TODO', icon: 'fa-solid fa-tasks', color: '#303091', iconColor: '#FFFFFF' },
    { name: 'Visited', icon: 'fa-solid fa-check-circle', color: '#782121', iconColor: '#FFFFFF' },
  ];

export const SCHOLARSHIP_ITEMS = [
    { name: 'Scholarship', icon: 'fas fa-hand-holding-usd', color: '#414110', iconColor: '#FFFFFF' },
    { name: 'In Progress', icon: 'fa-solid fa-spinner', color: '#044758', iconColor: '#FFFFFF' },
    { name: 'Selected', icon: 'fa-solid fa-check-circle', color: '#303091', iconColor: '#FFFFFF' },
    { name: 'Rejested', icon: 'fas fa-times-circle', color: '#782121', iconColor: '#FFFFFF' },
];

export const ISSUESTATUS = [
  { name: 'New Issue', icon: 'fas fa-exclamation-circle', color: '#414110', iconColor: '#FFFFFF' },
  { name: 'In Progress', icon: 'fa-solid fa-spinner', color: '#044758', iconColor: '#FFFFFF' },
  { name: 'Resolve', icon: 'fa-solid fa-check-circle', color: '#303091', iconColor: '#FFFFFF' },
  { name: 'Block', icon: 'fas fa-times-circle', color: '#782121', iconColor: '#FFFFFF' },
];

export const INVENTORYISSUES = [
  { name: 'Working', icon: 'fas fa-cogs', color: '#414110', iconColor: '#FFFFFF', count: 0},
  { name: 'Facing Issue', icon: 'fas fa-times-circle', color: '#782121', iconColor: '#FFFFFF', count: 0 },
  { name: 'In Progress', icon: 'fa-solid fa-spinner', color: '#044758', iconColor: '#FFFFFF', count: 0 },
  { name: 'Solved', icon: 'fa-solid fa-check-circle', color: '#303091', iconColor: '#FFFFFF', count: 0 }, 
];
    
export const TOP_ROLES = [
    { role: 'Admin', icon: 'fas fa-user-shield' ,color: '#dafcde' ,iconColor: '#00cc14'},
    { role: 'Sub-Admin', icon: 'fas fa-users-cog' ,color: '#d2f2f5', iconColor: '#0ac1ef'},
    { role: 'Counselor', icon: 'fas fa-headset' ,color: '#d8d8ff', iconColor: '#0a0aff'},
    { role: 'Technical-Expert', icon: 'fas fa-user-tie' ,color: '#f2d3fd', iconColor: '#9107c3'},  
  ];
    
export const BATCHES = ['Batch-14','Batch-13','Batch-12','Batch-11','Batch-10','Batch-9','Batch-8','Batch-7','Batch-6','Batch-5','Batch-4', 'Batch-3', 'Batch-2', 'Batch-1'];
  
export const DISPLAYED_COLUMNS = ['name', 'email', 'course', 'actions'];
export const DISPLAYED_COLUMNSFOLLOW = ['name', 'email', 'course', 'inquiryStatus','date','actions'];
export const DISPLAYED_COLUMNSBOOTCAMP= ['name', 'email', 'paymentStatus','actions'];
export const DISPLAYED_COLUMNS_CODEMINDBOOTCAMP= ['name', 'email', 'selectedBootcamp','actions'];
export const DISPLAYED_COLUMNSUSERS = ['name', 'email', 'mobile_number', 'role','actions'];
export const DISPLAYED_COLUMNS_COMPANY_FOLLOW = ["name","email","inquiryStatus","date","actions"];
export const DISPLAYED_COLUMNS_COLLEGE=['collegeName', 'dist', 'university', 'status', 'Actions'];
export const DISPLAYED_COLUMNS_INVENTORY = ['name','email','mobileNumber','status','Actions'];
export const DISPLAYED_FEES_COLUMNS  = ['course', 'batch', 'totalFees', 'totalPaidFees', 'totalRemainingFees','totalDiscounts', 'totalReferenceDiscountFees','totalStudents'];

export const COURSES = ['Angular MEAN Stack', 'React MEAN Stack', 'Java Full Stack', '.Net Full Stack', 'Manual and Automation Testing', 'Python with Data Science'];
export const INQUIRYSTATUSES = ['Interested', 'Need FollowUp', 'Not Interested', 'No Response'];
export const PAYMENT_STATUS = ['success','fail']; 
export const FEEDBACK_OPTIONS = ['All', 'Poor', 'Average', 'Good', 'Excellent'];
export const PAYMENT_STATUSES = ['Not Paid', 'Partially Paid', 'Completed'];
export const SOURCE_STATUS = ['3-Day HTML CSS Bootcamp', '1-Day HTML CSS Bootcamp', '2-Day HTML CSS Bootcamp'];
export const PLACEMENT_STATUSES = ['Placement Complete', 'Placement Pending'];
export const VISITED_SHOLARSHIP_OPTIONS = ['Scholarship', 'In Progress', 'Selected', 'Rejected'];
export const SHOLARSHIP_FEEDBACK_OPTIONS = ['Excellent', 'Good', 'Average', 'Poor'];
  // export const ISSUESTATUS = ['In Progress', 'Block', 'Complete', 'Resolve'];
export const  VISITEDSTATUSOPTIONS = ['In Progress','In Plan','TODO','Visited'];
export const SOURCEOPTIONS = [ 'Codemind Website','Instagram','Facebook','LinkedIn','Reference','Offline Office'];

export const UNIVERSITY = ['All','Bharati Vidyapeeth, Pune','Central Institute of Fisheries Education, Mumbai','D. Y. Patil Education Society, Kolhapur',
    'Dnyaneshwar Vidyapeeth Educational trust, Pune','Datta Meghe Institute of Medical Sciences, Wardha',
    'Deccan College Post-Graduate and Research Institute, Pune','Defence Institute of Advanced Technology, Pune',
    'Dr. Babasaheb Ambedkar Marathwada University, Aurangabad','Dr. Babasaheb Ambedkar Technological University, Lonere',
    'Dr. Balasaheb Sawant Konkan Krishi Vidyapeeth, Dapoli', 'Dr. D. Y. Patil Vidyapeeth, Pune',
    'Dr. Panjabrao Deshmukh Krishi Vidyapeeth, Akola','Gokhale Institute of Politics and Economics, Pune',
    'Homi Bhabha National Institute, Mumbai', 'Indira Gandhi Institute of Development Research, Mumbai',
    'Institute of Chemical Technology, Mumbai', 'International Institute for Population Sciences, Mumbai',
    'Kavi Kulguru Kalidas Sanskrit Vishwavidyalaya, Nagpur','Krishna Institute of Medical Sciences, Satara',
    'Maharashtra Animal and Fishery Sciences University, Nagpur','Maharashtra University of Health Sciences, Nashik',
    'Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya, Wardha', 'Mahatma Phule Krishi Vidyapeeth, Rahuri',
    'Marathwada Agricultural University, Parbhani','MGM Institute of Health Sciences, Navi Mumbai',
    'Narsee Monjee Institute of Management Studies, Mumbai','	North Maharashtra University, Jalgaon',
    'Padmashree Dr. D. Y. Patil Vidyapeeth, Navi Mumbai', 'Pravara Institute of Medical Sciences, Ahmednagar',
    'Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur', 'Sant Gadge Baba Amravati University, Amravati',
    'Shivaji University, Kolhapur', 'Shreemati Nathibai Damodar Thackersey Womens University, Mumbai',
    'Solapur University, Solapur','Swami Ramanand Teerth Marathwada University, Nanded', 'Symbiosis International University, Pune',
    'Tata Institute of Fundamental Research, Mumbai', 'Tata Institute of Social Sciences, Mumbai',
    'Tilak Maharashtra University, Pune', 'University of Mumbai, Mumbai', 'Savitribai Phule Pune University, Pune',
    'Yashwantrao Chavan Maharashtra Open University, Nashik'
  ]

export const DISTRICT=["All","Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"] 