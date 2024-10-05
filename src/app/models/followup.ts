export interface FollowUpStudent {
    firstName: string;
    lastName: string;
    email:string;
    mobileNumber: string; 
    course: string;
    inquiryStatus?: string;  
    date?: Date;             
    batch?: string;          
    source?: string;         
    sourceComment?: string;  
    comments?: Comment[];    
}

export interface Comment {
  date: Date;
  comment: string;
}
  export interface FollowUpStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: FollowUpStudent[];
  }

  