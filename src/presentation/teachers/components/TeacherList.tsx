import { ChangeEvent, useState } from 'react'
import { Loader } from '../../ui/components/loader/Loader'

import { Box, Pagination } from '@mui/material'
import { useTeachers } from '../hooks/useTeachers'
import { TeacherItem } from './TeacherItem'


export const TeacherList = () => {

  const { teachers, isLoading, totalTeachers, loadNextTeachers, loadPreviousTeachers } = useTeachers()
  const [page, setPage] = useState(1);


  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalTeachers / itemsPerPage);

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    if (value > page) {
      loadNextTeachers();
    } else if (value < page) {
      loadPreviousTeachers();
    }
    setPage(value);
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height="70vh" width={"100%"}>
      <Box width={"100%"}>
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Box>
      <Pagination count={totalPages} page={page} color="secondary" onChange={handlePageChange} />
    </Box>
  )
}