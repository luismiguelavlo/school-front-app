import { HttpAdapter } from '../../../config/adapters/http/http.adapter';

interface DataClassUpdate {
  name: string;
  description: string;
}

export const updateClassUseCase = async (fetcher: HttpAdapter, classId: string, data: DataClassUpdate): Promise<string> => {
  try {
    
    await fetcher.put(`/classes/${classId}`, data);

    return 'Class Updated';

  } catch (error) {
    throw new Error(`Error Updated class: ${error}`);
  }
}