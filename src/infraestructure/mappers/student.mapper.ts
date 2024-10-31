import { Student } from '../../core/entities/students.entity';
import { StudentResult } from '../interfaces/students.interfaces';


export class StudentMapper {

  static fromStudentResponseToEntity(student: StudentResult) {
    return new Student(
      student.id,
      student.name,
      student.surname,
      student.email,
    )
  }
}