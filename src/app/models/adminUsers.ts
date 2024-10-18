export interface Users {
    firstname: string;
    lastname: string;
    email:string;
    mobile_number: string; 
    role:string;
  }
  export interface UsersResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: Users[];
  }