import { Role } from './role';
import { Course } from './course';

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile_number: string;
  password: string;
  role: Role;
  course: Course
} 