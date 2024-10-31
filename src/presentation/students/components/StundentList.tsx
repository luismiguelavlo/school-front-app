import { ChangeEvent, useState } from 'react'
import { Loader } from '../../ui/components/loader/Loader'
import { useStudent } from '../hooks/useStudents'
import { StudentItem } from './StudentItem'
import { Pagination } from '@mui/material'


export const StundentList = () => {

  const { students, isLoading, totalStudents, loadNextStudents, loadPreviousStudents } = useStudent()
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalStudents / itemsPerPage);

  console.log(totalStudents, itemsPerPage)

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    if (value > page) {
      loadNextStudents();
    } else if (value < page) {
      loadPreviousStudents();
    }
    setPage(value);
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="center" style={{ height: '70vh', justifyContent: 'space-between' }}>
      <div className='list-student'>
      {students.map((student) => (
        <div key={student.id} >
          <StudentItem student={student} />
        </div>
      ))}
      </div>
      <Pagination count={totalPages} page={page} color="secondary" onChange={handlePageChange} />
    </div>
  )
}