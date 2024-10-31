import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { TeacherResult } from '../../../infraestructure/interfaces/teachers.interface';
import { TeacherMapper } from '../../../infraestructure/mappers/teacher.mapper';
import { Teacher } from '../../entities/teacher.entity';




interface Options {
  offset?: number;
  limit?: number;
}

export const getTeacherByIdUseCase = async (fetcher: HttpAdapter, teacherId: string, _?: Options): Promise<Teacher> => {
  try {
    const response = await fetcher.get<TeacherResult>(`/teachers/${teacherId}`);

    return TeacherMapper.fromTeacherResponseToEntity(response);
    
  } catch (error) {
    throw new Error(`Error fetching classes: ${error}`);
  }
}