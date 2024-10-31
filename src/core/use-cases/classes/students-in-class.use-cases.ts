import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { StudentsInClassReponses } from '../../../infraestructure/interfaces/studentsInClass.interfaces';
import { StudentInClassMapper } from '../../../infraestructure/mappers/studentInClass.mapper';
import { Student } from '../../entities/students.entity';


interface Options {
  offset?: number;
  limit?: number;
}

export const getStudentsInClassUseCase = async (fetcher: HttpAdapter, classId: string, _?: Options): Promise<Student[]> => {
  try {
    const response = await fetcher.get<StudentsInClassReponses[]>(`/classes/${classId}/students`);

    return response.map(StudentInClassMapper.fromStudentInClassResponseToEntity);
    
  } catch (error) {
    throw new Error(`Error fetching classes: ${error}`);
  }
}