/*export interface Payment {
  paidFees: number;           
  totalFees: number;          
  discountPercentage: number;  
  reference: number;          
  remainingFees: number;     
  paymentStatus: string;      
  paymentDate: Date;          
  paymentMethod?: string;     
}
export interface StudentInformation {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address?: string;        
  cityName?: string;       
  state?: string;            
  course: string;
  batch: string;
  graduation: string;
  passingYear: number;
  collegeName: string;
  attendance: string;
  parentEmail?: string;      
  parentMobileNumber?: string; 
  mock1Feedback?: string;    
  mock2Feedback?: string;    
  mock3Feedback?: string;    
  paymentStatus?: string;  
  placementStatus?: string;  
  payments?: Payment[];     
}

export interface StudentInformationResponse {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  data: StudentInformation[];
}*/


export interface Payment {
  username: string;
  paidFees: number;               
  totalFees: number; 
  totalPaidFees: number;          
  discountPercentage: number;     
  discountComment?: string;      
  reference: number;              
  referenceComment?: string;      
  remainingFees: number;          
  installment: string;                          
  paymentStatus: string;          
  paymentDate: Date;   
  transactionWay: string;
  transactionId: string;  
  bankName: string;
  cashReceiverName: string;             
  screenshot?: string | File;    
}
export interface StudentInformation {
  firstName: string;                
  lastName: string;                 
  email: string;                    
  mobileNumber: string;             
  address?: string;                
  cityName?: string;              
  state?: string;                  
  course: string;                   
  batch: string;                    
  graduation: string;               
  passingYear: number;              
  collegeName: string;
  birthdate:string; 
  gender:string;
  currentlyWorking: Date;     
  attendance: string;               
  parentEmail?: string;             
  parentMobileNumber?: string;      
  mock1Feedback?: string;           
  mock2Feedback?: string;           
  mock3Feedback?: string;           
  paymentStatus?: string;          
  placementStatus?: string;         
  payments?: Payment[];             
}
export interface StudentInformationResponse {
  totalRecords: number;             
  totalPages: number;              
  currentPage: number;              
  data: StudentInformation[];       
}

