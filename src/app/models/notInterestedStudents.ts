export interface NotInterestedStudent {
    firstName: string;
    lastName: string;
    email:string;
    mobileNumber: string; 
    course: string;
    inquiryStatus?: string;               
    source?: string;         
    sourceComment?: string;  
}
export interface  NotInterestedStudentResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data:  NotInterestedStudent[];
}

