  export interface Batch {
    batch: string;
    totalFees: number;
    totalPaidFees: number;
    totalRemainingFees: number;
    totalStudents: number;
  }
  export interface totalFees {
    course: string;
    batches: Batch[];
  }