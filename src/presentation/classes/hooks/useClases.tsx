import { useEffect, useState } from 'react';
import { Classes } from '../../../core/entities/classes.entity';
import * as UseCases from '../../../core/use-cases';
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

let classesPageNumber = 0;
const limit = 20;

export const useClases = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<Classes[]>([]);
  const [totalClasses, setTotalClasses] = useState<number>(0);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setIsLoading(true);

    const classesPaginated = await UseCases.ClassesUseCases(schoolApiFetcher);

    setClasses(classesPaginated.classes);
    setTotalClasses(classesPaginated.total);
    setIsLoading(false);
  }


  return {
    classes,
    isLoading,
    totalClasses,
    //methods

    loadNextClasses: async () => {
      classesPageNumber += limit;
      const classesPaginated = await UseCases.ClassesUseCases(schoolApiFetcher, {
        offset: classesPageNumber,
        limit: limit
      });
      setClasses(classesPaginated.classes);
      setTotalClasses(classesPaginated.total);
    },

    loadPreviousClasses: async () => {
      classesPageNumber -= limit;
      const classesPaginated = await UseCases.ClassesUseCases(schoolApiFetcher, {
        offset: classesPageNumber,
        limit: limit
      });
      setClasses(classesPaginated.classes);
    },
  }

}