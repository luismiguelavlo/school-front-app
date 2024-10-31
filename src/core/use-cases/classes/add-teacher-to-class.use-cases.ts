import { HttpAdapter } from '../../../config/adapters/http/http.adapter';

interface DataToAdd {
  teacherId: number;
}

export const addTeacherToClassUseCase = async (fetcher: HttpAdapter, classId: string, data: DataToAdd): Promise<string> => {
  try {
    await fetcher.post(`/classes/${classId}/assing-teacher`, data);

    return 'Teacher added to class';

  } catch (error) {
    throw new Error(`Error adding teacher to class: ${error}`);
  }
}