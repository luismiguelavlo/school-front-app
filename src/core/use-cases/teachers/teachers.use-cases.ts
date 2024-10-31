import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { TeacherResponses } from '../../../infraestructure/interfaces/teachers.interface';
import { TeacherMapper } from '../../../infraestructure/mappers/teacher.mapper';
import { TeacherPaginated } from '../../entities/teacher.entity';



interface Options {
  offset?: number;
  limit?: number;
}

export const TeachersUseCases = async (fetcher: HttpAdapter, options?: Options): Promise<TeacherPaginated> => {
  try {
    
    const response = await fetcher.get<TeacherResponses>('/teachers', {
      params: {
        offset: options?.offset ?? 0,
        limit: options?.limit ?? 20,
      }
    });

    const teachers = response.teachers?.map(TeacherMapper.fromTeacherResponseToEntity);

    return {
      total: response.total,
      teachers: teachers 
    }

  } catch (error) {
    throw new Error(`Error fetching teachers: ${error}`);
  }
}