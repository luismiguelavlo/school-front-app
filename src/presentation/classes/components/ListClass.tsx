import { Pagination } from '@mui/material';
import { Loader } from '../../ui/components/loader/Loader';
import { useClases } from '../hooks/useClases';
import ClassCard from './ClassCard'
import { ChangeEvent, useState } from 'react';



export const ListClass = () => {

  const { classes, isLoading, loadNextClasses, loadPreviousClasses, totalClasses } = useClases();
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalClasses / itemsPerPage);

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    if (value > page) {
      loadNextClasses();
    } else if (value < page) {
      loadPreviousClasses();
    }
    setPage(value);
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='center' >
      <div className="list-container">
        {classes.map((detailClass) => (
          <div key={detailClass.id} className="content">
            <ClassCard classDetail={detailClass} />
          </div>
        ))}
      </div>
      <Pagination count={totalPages} page={page} color="secondary" onChange={handlePageChange} />
    </div>
  )
}

