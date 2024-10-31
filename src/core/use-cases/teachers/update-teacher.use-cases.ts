import { HttpAdapter } from '../../../config/adapters/http/http.adapter';

interface DataTeacherUpdate {
  name: string;
  surname: string;
  email: string;
}

export const updateTeacherUseCase = async (fetcher: HttpAdapter, teacherId: string, data: DataTeacherUpdate): Promise<string> => {
  try {
    
    await fetcher.put(`/teachers/${teacherId}`, data);

    return 'Teacher Updated';

  } catch (error) {
    throw new Error(`Error Updated Teacher: ${error}`);
  }
}