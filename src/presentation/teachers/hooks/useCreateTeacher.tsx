import { useState } from 'react'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter'
import * as UseCases from '../../../core/use-cases'

interface PropsHook {
  name: string
  surname: string
  email: string
}

export const useCreateTeacher = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  const createTeacher = async (data: PropsHook) => {
    setIsLoading(true)
    const result = await UseCases.CreateTeacherUseCases(schoolApiFetcher, data)
    setIsLoading(false)
    return result
  }

  return {
    isLoading,

    // methods
    createTeacher
  }
}