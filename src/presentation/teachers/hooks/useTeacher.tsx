import { useEffect, useState } from 'react';
import { Teacher } from '../../../core/entities/teacher.entity';
import * as UseCases from './../../../core/use-cases'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

interface DataTeacherUpdate {
  name: string;
  surname: string;
  email: string;
}


export const useTeacher = (teacherId: string) => {

  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher>();

  useEffect(() => {
    loadTeacher();
  }, [teacherId])
  
  const loadTeacher = async () => {
    setIsLoading(true);
    const response = await UseCases.getTeacherByIdUseCase(schoolApiFetcher, teacherId);
    setTeacher(response);
    setIsLoading(false);
  }

  const deleteTeacher = async () => {
    setIsLoading(true);
    const response = await UseCases.deleteTeacherUseCase(schoolApiFetcher, teacherId);

    setIsLoading(false);
    return response;
    
  }

  const updateTeacher = async (data: DataTeacherUpdate) => {
    setIsLoading(true);
    const response = await UseCases.updateTeacherUseCase(schoolApiFetcher, teacherId ,data);
    
    setIsLoading(false);
    return response;
  }

  return {
    isLoading,
    teacher,

    //methods
    deleteTeacher,
    updateTeacher
  }
  
}