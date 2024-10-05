export interface InterestedStudent {
    firstName: string;
    lastName: string;
    email:string;
    mobileNumber: string; 
    course: string;
    inquiryStatus?: string;  
    date?: Date;             
    batch?: string; 
    reference?: String;         
    source?: string;         
    sourceComment?: string;  
    comments?: Comment[];    
}

export interface Comment {
  date: Date;
  comment: string;
}
  export interface InterestedStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: InterestedStudent[];
  }
