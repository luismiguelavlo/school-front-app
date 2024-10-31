


import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { ClassResult } from '../../../infraestructure/interfaces/classes.interfaces';


interface PropsUseCase {
  name: string;
  description: string;
  teacherId?: number | null;
}

export const CreateClassUseCases = async (fetcher: HttpAdapter, data: PropsUseCase): Promise<String> => {
  try {
    
    await fetcher.post<ClassResult>('/classes', data);

    return 'Class Created';

  } catch (error) {
    throw new Error(`Error creating class: ${error}`);
  }
}