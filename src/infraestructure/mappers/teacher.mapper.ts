import { Teacher } from '../../core/entities/teacher.entity';
import { TeacherResult } from '../interfaces/teachers.interface';



export class TeacherMapper {

  public static fromTeacherResponseToEntity(response: TeacherResult): Teacher {
    return new Teacher(
      response.id,
      response.name,
      response.surname,
      response.email
    )
  }
}