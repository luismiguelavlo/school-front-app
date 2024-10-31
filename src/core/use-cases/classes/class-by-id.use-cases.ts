import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { ClassResponse } from '../../../infraestructure/interfaces/class.interface';
import { ClassMapper } from '../../../infraestructure/mappers/class.mapper';
import { Classes } from '../../entities/classes.entity';



interface Options {
  offset?: number;
  limit?: number;
}

export const getClassByIdUseCase = async (fetcher: HttpAdapter, classId: string, _?: Options): Promise<Classes> => {
  try {
    const response = await fetcher.get<ClassResponse>(`/classes/${classId}`);

    return ClassMapper.fromClassResponseToEntity(response);
    
  } catch (error) {
    throw new Error(`Error fetching classes: ${error}`);
  }
}