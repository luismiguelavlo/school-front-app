import { Student } from '../../core/entities/students.entity';
import { StudentsInClassReponses } from '../interfaces/studentsInClass.interfaces';



export class StudentInClassMapper {

  static fromStudentInClassResponseToEntity(studentResult: StudentsInClassReponses) {
    return new Student(
      studentResult.student.id,
      studentResult.student.name,
      studentResult.student.surname,
      studentResult.student.email,
    )
  }
}