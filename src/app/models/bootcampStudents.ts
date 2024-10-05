export interface BootcampStudent {
    firstName: string;
    lastName: string;
    email:string;
    Mobile_number: string; 
    paymentId?: string;
    paymentStatus: string;
    courses?: string;
    // inquiryStatus?: string;
    date?: Date;
  }
  export interface BootcampStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: BootcampStudent[];
  }


 