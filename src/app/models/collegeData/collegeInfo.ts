export interface CollegeData {
    collegeName: string;
    universityName: string;
    address:string;
    city:string;
    state:string;
    district: string; 
    principalName?: string;  
    collegeContact: string;
    totalStudents: string;
    totalBranches: Number;
    visitedStatus: String;
    companiesVisited: [String];
    visitedPlanDate: Date;  
}

  export interface CollegeDataResponse {
    totalRecords: number
    totalPages: number;
    currentPage: number;
    data: CollegeData[];
  }


