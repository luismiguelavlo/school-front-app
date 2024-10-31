import { HttpAdapter } from '../../../config/adapters/http/http.adapter';

interface DataStudentUpdate {
  name: string;
  surname: string;
  email: string;
}

export const updateStudentUseCase = async (fetcher: HttpAdapter, studentId: string, data: DataStudentUpdate): Promise<string> => {
  try {
    
    await fetcher.put(`/students/${studentId}`, data);

    return 'Student Updated';

  } catch (error) {
    throw new Error(`Error Updated Student: ${error}`);
  }
}