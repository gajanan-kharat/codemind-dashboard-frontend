export interface BootcampStudent {
    firstName: string;
    lastName: string;
    email:string;
    mobileNumber: string; 
    paymentId: string;
    paymentStatus: string;
    course: string;
    batch: string;
    source: string;
    // inquiryStatus?: string;
    date?: Date;
  }
  export interface BootcampStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: BootcampStudent[];
  }


 