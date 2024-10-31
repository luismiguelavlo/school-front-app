import { HttpAdapter } from '../../../config/adapters/http/http.adapter';


export const addStudentsToClassUseCase = async (fetcher: HttpAdapter, classId: string, students: Record<string, number[]>): Promise<string> => {
  try {
    
    const resp = await fetcher.post(`/classes/${classId}/assing-students`, students);

    console.log(resp);

    return 'Students added to class';

  } catch (error) {
    throw new Error(`Error adding students to class: ${error}`);
  }
}