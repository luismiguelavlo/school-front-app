import { HttpAdapter } from '../../../config/adapters/http/http.adapter';


export const deleteTeacherUseCase = async (fetcher: HttpAdapter, teacherId: string): Promise<string> => {
  try {

    await fetcher.delete(`/teachers/${teacherId}`);

    return 'Teacher Deleted';

  } catch (error) {
    throw new Error(`Error Deleted Teacher: ${error}`);
  }
}