import { useParams } from 'react-router-dom';
import { useClass } from '../hooks/useClass';
import { Box, Container, Grid, List, ListItem } from '@mui/material';
import { Loader } from '../../ui/components/loader/Loader';
import ClassInformation from '../components/ClassInformation';
import { StudentItem } from '../../students/components/StudentItem';
import { useStudent } from '../../students/hooks/useStudents';
import { Student } from '../../../core/entities/students.entity';
import { useEffect, useState } from 'react';
import { useTeachers } from '../../teachers/hooks/useTeachers';

const DetailClass = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, classDetails, studentsInClass } = useClass(id!);
  const { students, isLoading: isLoadingStudent } = useStudent(10000);
  const [ studentsWithOutClass, setStudentsWithOutClass ] = useState<Student[]>([]);
  const { teachers, isLoading: isLoadingTeachers } = useTeachers(10000);

  const findStudentsWhitOutClass = () => {
    const studentsWithOutClass = students.filter(student => !studentsInClass?.find(studentInClass => studentInClass.id === student.id));
    setStudentsWithOutClass(studentsWithOutClass);
  }

  useEffect(() => {
    findStudentsWhitOutClass();
  }, [studentsInClass, students])

  if (isLoading || isLoadingStudent || isLoadingTeachers) {
    return <Loader />;
  }


  return (
    <Container sx={{ paddingTop: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box pr={2}>
            <ClassInformation 
              classInfo={classDetails!} 
              studentsForAdd={studentsWithOutClass}
              teachersForAdd={teachers}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <List style={{ maxHeight: '70vh', overflow: 'auto' }}>
            {studentsInClass?.map((student) => (
              <ListItem key={student.id}>
                <StudentItem student={student} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailClass;
