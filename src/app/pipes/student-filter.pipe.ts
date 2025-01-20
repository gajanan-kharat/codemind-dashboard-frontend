import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {
  transform(students: any[], selectedBatch: string, selectedCourse: string, searchTerm: string): any[] {
    if (!students) return [];

    // Filter by batch
    let filteredStudents = students.filter(student => 
      student.batch === selectedBatch || !selectedBatch
    );

    // Filter by course if selected
    // if (selectedCourse) {
    //   filteredStudents = filteredStudents.filter(student => 
    //     student.course.toLowerCase() === selectedCourse.toLowerCase()
    //   );
    // }

    // Apply search term if provided
    if (searchTerm) {
      filteredStudents = filteredStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredStudents;
  }

}
