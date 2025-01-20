export interface ScholarshipData {
    name:string;
    collegeName: string;
    mobileName: string;
    email:string;
    graduationMarks:number;
    hscMarks:number;
    sscMarks: number; 
    address: string;  
    course: string;
    batch:  string;
    scholarshipStatus: string;
    scholarshipScore: number;
    interviewFeedback: string;
    date: Date;
    source: String;
    sourcecomment: String;  
}

  export interface ScholarshipDataResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: ScholarshipData[];
  }