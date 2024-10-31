import { useEffect, useState } from 'react';
import * as UseCases from '../../../core/use-cases';
import { Teacher } from '../../../core/entities/teacher.entity';
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

let teachersPageNumber = 0;


export const useTeachers = (limit = 20) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [totalTeachers, setTotalTeachers] = useState<number>(0);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setIsLoading(true);

    const teachersPaginated = await UseCases.TeachersUseCases(schoolApiFetcher, {
      offset: teachersPageNumber,
      limit: limit
    });

    setTeachers(teachersPaginated.teachers);
    setTotalTeachers(teachersPaginated.total);
    setIsLoading(false);
  }

  return {
    teachers, 
    isLoading,
    totalTeachers,
    //methods

    loadNextTeachers: async () => {
      teachersPageNumber += limit;
      const teachersPaginated = await UseCases.TeachersUseCases(schoolApiFetcher, {
        offset: teachersPageNumber,
        limit: limit
      });
      setTeachers(teachersPaginated.teachers);
      setTotalTeachers(teachersPaginated.total);
    },

    loadPreviousTeachers: async () => {
      teachersPageNumber -= limit;
      const teachersPaginated = await UseCases.TeachersUseCases(schoolApiFetcher, {
        offset: teachersPageNumber,
        limit: limit
      });
      setTeachers(teachersPaginated.teachers);
    },
  
}}