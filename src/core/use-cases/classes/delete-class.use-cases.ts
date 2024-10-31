import { HttpAdapter } from '../../../config/adapters/http/http.adapter';


export const deleteClassUseCase = async (fetcher: HttpAdapter, classId: string): Promise<string> => {
  try {

    await fetcher.delete(`/classes/${classId}`);

    return 'Class Deleted';

  } catch (error) {
    throw new Error(`Error Deleted class: ${error}`);
  }
}