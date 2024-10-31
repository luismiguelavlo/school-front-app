import { useEffect, useState } from 'react';
import { Student } from '../../../core/entities/students.entity';
import * as UseCases from '../../../core/use-cases';
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

let studentsPageNumber = 0;

export const useStudent = (limit = 20) => {

  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setIsLoading(true);

    const studentsPaginated = await UseCases.StudentsUseCases(schoolApiFetcher, {
      offset: studentsPageNumber,
      limit: limit
    });

    setStudents(studentsPaginated.students);
    setTotalStudents(studentsPaginated.total);
    setIsLoading(false);
  }

  return {
    students,
    isLoading,
    totalStudents,
    //methods

    loadNextStudents: async () => {
      studentsPageNumber += limit;
      const studentsPaginated = await UseCases.StudentsUseCases(schoolApiFetcher, {
        offset: studentsPageNumber,
        limit: limit
      });
      setStudents(studentsPaginated.students);
      setTotalStudents(studentsPaginated.total);
    },

    loadPreviousStudents: async () => {
      studentsPageNumber -= limit;
      const studentsPaginated = await UseCases.StudentsUseCases(schoolApiFetcher, {
        offset: studentsPageNumber,
        limit: limit
      });
      setStudents(studentsPaginated.students);
    },
  }

}