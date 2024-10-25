export interface HireUs {
    name: string;
    company: string;
    email:string;
    mobileNumber: string; 
  }
  export interface HireUsResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: HireUs[];
  }