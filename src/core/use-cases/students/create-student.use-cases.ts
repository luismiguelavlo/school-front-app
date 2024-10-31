import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { StudentResult } from '../../../infraestructure/interfaces/students.interfaces';

interface PropsUseCase {
  name: string;
  surname: string;
  email: string;
}

export const CreateStudentUseCases = async (fetcher: HttpAdapter, data: PropsUseCase): Promise<String> => {
  try {
    
    await fetcher.post<StudentResult>('/students', data);

    return 'Student created';

  } catch (error) {
    throw new Error(`Error create students: ${error}`);
  }
}