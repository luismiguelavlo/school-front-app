import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { TeacherResult } from '../../../infraestructure/interfaces/teachers.interface';

interface PropsUseCase {
  name: string;
  surname: string;
  email: string;
}

export const CreateTeacherUseCases = async (fetcher: HttpAdapter, data: PropsUseCase): Promise<String> => {
  try {
    
    await fetcher.post<TeacherResult>('/teachers', data);

    return 'Teacher created';

  } catch (error) {
    throw new Error(`Error creating teacher: ${error}`);
  }
}