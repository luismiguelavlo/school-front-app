import { useEffect, useState } from 'react';
import { Student } from '../../../core/entities/students.entity';
import * as UseCases from './../../../core/use-cases'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

interface DataStudentUpdate {
  name: string;
  surname: string;
  email: string;
}

export const useStudentDetail = (studentId: string) => {

  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    setIsLoading(true);
    const student = await UseCases.getStudentByIdUseCase(schoolApiFetcher, studentId);
    setStudent(student);
    setIsLoading(false);
  }

  const deleteStudent = async () => {
    setIsLoading(true);
    const response = await UseCases.deleteStudentUseCase(schoolApiFetcher, studentId);

    setIsLoading(false);
    return response;
  }

  const updateStudent = async (data: DataStudentUpdate) => {
    setIsLoading(true);
    const response = await UseCases.updateStudentUseCase(schoolApiFetcher, studentId, data);

    setIsLoading(false);
    return response;
  }

  return {
    isLoading,
    student,

    //methods
    deleteStudent,
    updateStudent

  }
}