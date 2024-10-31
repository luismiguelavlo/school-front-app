import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { StudentResult } from '../../../infraestructure/interfaces/students.interfaces';
import { StudentMapper } from '../../../infraestructure/mappers/student.mapper';
import { Student } from '../../entities/students.entity';



interface Options {
  offset?: number;
  limit?: number;
}

export const getStudentByIdUseCase = async (fetcher: HttpAdapter, studentId: string, _?: Options): Promise<Student> => {
  try {
    const response = await fetcher.get<StudentResult>(`/students/${studentId}`);

    return StudentMapper.fromStudentResponseToEntity(response);
    
  } catch (error) {
    throw new Error(`Error fetching classes: ${error}`);
  }
}