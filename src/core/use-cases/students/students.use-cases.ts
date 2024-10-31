import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { StudentsResponses } from '../../../infraestructure/interfaces/students.interfaces';
import { StudentMapper } from '../../../infraestructure/mappers/student.mapper';
import { StudentsPaginated } from '../../entities/students.entity';



interface Options {
  offset?: number;
  limit?: number;
}

export const StudentsUseCases = async (fetcher: HttpAdapter, options?: Options): Promise<StudentsPaginated> => {
  try {
    
    const response = await fetcher.get<StudentsResponses>('/students', {
      params: {
        offset: options?.offset ?? 0,
        limit: options?.limit ?? 20,
      }
    });

    const students = response.students?.map(StudentMapper.fromStudentResponseToEntity);

    return {
      total: response.total,
      students: students 
    }

  } catch (error) {
    throw new Error(`Error fetching students: ${error}`);
  }
}