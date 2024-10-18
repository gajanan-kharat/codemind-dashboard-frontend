export const TOP_ITEMS = [
    { course: 'Angular', icon: 'fa-brands fa-angular',color: '#f8e9e9' ,iconColor: '#c70000'},
    { course: 'React', icon: 'fa-brands fa-react' ,color: '#d2f2f5', iconColor: '#0ac1ef'},
    { course: 'Java', icon: 'fa-brands fa-java',color: '#d8d8ff', iconColor: '#0a0aff' },
    { course: 'Testing', icon: 'fa fa-cogs',color: '#fdfde3' ,iconColor: '#999900'},
    { course: '.NET', icon: 'fa-brands fa-microsoft',color: '#daeefc' , iconColor: '#007acc'},
  ];

  export const TOP_ROLES = [
    { role: 'Admin', icon: 'fas fa-user-shield' ,color: '#dafcde' ,iconColor: '#00cc14'},
    { role: 'Sub-Admin', icon: 'fas fa-users-cog' ,color: '#d2f2f5', iconColor: '#0ac1ef'},
    { role: 'Counselor', icon: 'fas fa-headset' ,color: '#d8d8ff', iconColor: '#0a0aff'}
  ];
  

  interface Comment {
    comment: string;
    commentDate: Date;
  }
  
  export const BATCHES = ['Batch-14','Batch-13','Batch-12','Batch-11','Batch-10','Batch-9','Batch-8','Batch-7','Batch-6','Batch-5','Batch-4', 'Batch-3', 'Batch-2', 'Batch-1'];
  
  export const DISPLAYED_COLUMNS = ['name', 'email', 'course', 'actions'];
  export const DISPLAYED_COLUMNSFOLLOW = ['name', 'email', 'course', 'inquiryStatus','date','actions'];
  export const DISPLAYED_COLUMNSBOOTCAMP= ['name', 'email', 'paymentStatus','actions'];
  export const DISPLAYED_COLUMNSUSERS = ['name', 'email', 'mobile_number', 'role','actions'];
  export const COURSES = ['Angular', 'React', 'Java', '.NET', 'Automation and Manual Testing'];

  export const INQUIRYSTATUSES = ['Interested', 'Next Batch', 'Not Interested', 'No Response'];
  export const PAYMENT_STATUS = ['Success','Fail']; 
  export const FEEDBACK_OPTIONS = ['All', 'Poor', 'Average', 'Good', 'Excellent'];
  export const PAYMENT_STATUSES = ['Not Paid', 'Partially Paid', 'Completed'];
  export const PLACEMENT_STATUSES = ['Placement Complete', 'Placement Pending'];
