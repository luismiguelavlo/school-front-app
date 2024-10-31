import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { ClassesReponses } from '../../../infraestructure/interfaces/classes.interfaces';
import { ClassesMapper } from '../../../infraestructure/mappers/classes.mapper';
import { PaginatedClasses } from '../../entities/classes.entity';


interface Options {
  offset?: number;
  limit?: number;
}

export const ClassesUseCases = async (fetcher: HttpAdapter, options?: Options): Promise<PaginatedClasses> => {
  try {

    const response = await fetcher.get<ClassesReponses>('/classes', {
      params: {
        offset: options?.offset ?? 0,
        limit: options?.limit ?? 20,
      }
    });

    const classes = response.classes?.map(ClassesMapper.fromClassesResponseToEntity);

    return {
      total: response.total,
      classes: classes 
    }
    
  } catch (error) {
    throw new Error(`Error fetching classes: ${error}`);
  }
}