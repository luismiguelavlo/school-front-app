import { useState } from 'react'
import { schoolApiFetcher } from '../../../config/adapters/school-api.adapter'
import * as UseCases from '../../../core/use-cases'

interface PropsHook {
  name: string
  description: string
  teacherId?: number | null
}

interface DataToAdd {
  teacherId: number;
}

export const useCreateClass = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  const createClass = async (data: PropsHook) => {
    setIsLoading(true)
    const result = await UseCases.CreateClassUseCases(schoolApiFetcher, data)
    setIsLoading(false)
    return result
  }

  const addStudentsToClass = async (classId: string, students: Record<string, number[]>) => {
    setIsLoading(true)
    const result = await UseCases.addStudentsToClassUseCase(schoolApiFetcher, classId, students)
    setIsLoading(false)
    return result
  }

  const addTeacherToClass = async (classId: string, data: DataToAdd) => {
    setIsLoading(true)
    const result = await UseCases.addTeacherToClassUseCase(schoolApiFetcher, classId, data)
    setIsLoading(false)
    return result
  }

  return {
    isLoading,

    // methods
    createClass,
    addStudentsToClass,
    addTeacherToClass
  }
}