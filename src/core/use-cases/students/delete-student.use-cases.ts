import { HttpAdapter } from '../../../config/adapters/http/http.adapter';


export const deleteStudentUseCase = async (fetcher: HttpAdapter, studentId: string): Promise<string> => {
  try {

    await fetcher.delete(`/students/${studentId}`);

    return 'Student Deleted';

  } catch (error) {
    throw new Error(`Error Deleted Student: ${error}`);
  }
}