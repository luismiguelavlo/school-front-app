


import {  useState } from 'react';

import * as UseCases from './../../../core/use-cases'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter';

interface DataClassUpdate {
  name: string;
  description: string;
}

export const useEditClass = (classId: string) => {

  const [isLoading, setIsLoading] = useState(true);

  const updateClass = async (data: DataClassUpdate) => {
    setIsLoading(true);

    await UseCases.updateClassUseCase(schoolApiFetcher, classId, data);

    setIsLoading(false);
  }

  const deleteClass = async () => {
    setIsLoading(true);
    console.log('holaaaa');

    await UseCases.deleteClassUseCase(schoolApiFetcher, classId);

    setIsLoading(false);
  }
  
  return {
    isLoading,
    
    //methods
    updateClass,
    deleteClass
    
  }

}