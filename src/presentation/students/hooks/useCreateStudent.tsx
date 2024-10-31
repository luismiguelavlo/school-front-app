import { useState } from 'react'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter'
import * as UseCases from '../../../core/use-cases'

interface PropsHook {
  name: string
  surname: string
  email: string
}

export const useCreateStudent = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  const createStudent = async (data: PropsHook) => {
    setIsLoading(true)
    const result = await UseCases.CreateStudentUseCases(schoolApiFetcher, data)
    setIsLoading(false)
    return result
  }

  return {
    isLoading,

    // methods
    createStudent
  }
}