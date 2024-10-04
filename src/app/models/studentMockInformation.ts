export interface Mock {
    mockNumber: number;
    mockDate: Date;
    mockTime: string;
    mockStatus: string;
    feedback: string;
  }
  
  export interface StudentMockInfo {
    name: string;
    email: string;
    contactNo: string;
    course: string;
    batch: string;
    graduation: string;
    passingYear: number;
    mocks: Mock[];
  }
  

export interface StudentMockResponse {
  totalRecords: number
  totalPages: number;
  currentPage: number;
  data: StudentMockInfo[];
}
