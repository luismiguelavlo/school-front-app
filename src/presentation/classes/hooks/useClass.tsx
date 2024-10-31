import { useEffect, useState } from 'react';
import { Classes } from '../../../core/entities/classes.entity';
import * as UseCases from './../../../core/use-cases'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';
import { Student } from '../../../core/entities/students.entity';

export const useClass = (classId: string) => {

  const [isLoading, setIsLoading] = useState(true);
  const [classDetails, setClassDetails] = useState<Classes>();
  const [studentsInClass, setStudentsInClass] = useState<Student[]>();

  useEffect(() => {
    loadClass();
  }, [classId])

  const loadClass = async () => {
    setIsLoading(true);

    const classDetailPromise = UseCases.getClassByIdUseCase(schoolApiFetcher, classId);
    const studentsInClassPromise = await UseCases.getStudentsInClassUseCase(schoolApiFetcher, classId);

    const [classDetail, studentsInClass] = await Promise.all([classDetailPromise, studentsInClassPromise]);

    setClassDetails(classDetail);
    setStudentsInClass(studentsInClass);
    setIsLoading(false);
  }

  return {
    isLoading,
    classDetails,
    studentsInClass,
  }

}