export const TOP_ITEMS = [
    { course: 'Angular', batch: 'Batch-12', icon: 'fa-brands fa-angular' },
    { course: 'React', batch: 'Batch-12', icon: 'fa-brands fa-react' },
    { course: 'Java', batch: 'Batch-12', icon: 'fa-brands fa-java' },
    { course: 'Testing', batch: 'Batch-12', icon: 'fa-solid fa-vial' },
  ];
  interface Comment {
    comment: string;
    commentDate: Date;
  }
  
  export const BATCHES = ['All','Batch-7','Batch-8','Batch-9','Batch-10','Batch-11', 'Batch-12', 'Batch-13', 'Batch-14'];
  
  export const DISPLAYED_COLUMNS = ['name', 'email', 'course', 'actions'];
  export const DISPLAYED_COLUMNSFOLLOW = ['name', 'email', 'course', 'inquiryStatus','date','actions'];
  export const DISPLAYED_COLUMNSBOOTCAMP= ['name', 'email', 'paymentStatus','actions'];
  export const COURSES = ['Angular', 'React', 'Java', '.NET', 'Automation and Munual Testing'];

  export const INQUIRYSTATUSES = ['Interested', 'Next Batch', 'Not Interested', 'No Response'];
  export const PAYMENT_STATUS = ['Success','Fail']; 