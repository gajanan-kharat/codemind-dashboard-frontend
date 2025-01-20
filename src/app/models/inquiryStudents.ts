export interface InquiryStudent {
    firstName: string;
    lastName: string;
    email:string;
    mobileNumber: string; 
    course: string;
  }
  export interface InquiryStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: InquiryStudent[];
  }

