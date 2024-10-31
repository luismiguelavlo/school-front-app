import { Navigate, Route, Routes } from 'react-router-dom'
import { Classes } from '../classes/pages/Classes'
import { Students } from '../students/pages/Students'
import { Teachers } from '../teachers/pages/Teachers'
import { Navbar } from '../ui'
import DetailClass from '../classes/pages/DetailClass'
import { Student } from '../students/pages/Student'
import { Teacher } from '../teachers/pages/Teacher'





export const AppRouter = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="classes" element={<Classes/>} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes/:id" element={<DetailClass/>} />
        <Route path="students/:id" element={<Student />} />
        <Route path="teachers/:id" element={<Teacher />} />

        <Route path="/" element={<Navigate to="classes" />} />
      </Routes>
    </>
  )
}