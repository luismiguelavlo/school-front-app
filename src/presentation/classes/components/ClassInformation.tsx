import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, Button, Typography, Box, TextareaAutosize, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Snackbar, Alert } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Student } from '../../../core/entities/students.entity';
import { Teacher } from '../../../core/entities/teacher.entity';
import { useCreateClass } from '../hooks/useCreateClass';
import { useNavigate } from 'react-router-dom';
import { useEditClass } from '../hooks/useEditClass';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  students: z.array(z.string()).optional(),
  teacher: z.string().optional(),
});

type ClassInfo = {
  id: number;
  name: string;
  description: string;
  teacher?: string | null;
  students?: string[];
};

interface Props {
  classInfo: ClassInfo;
  studentsForAdd?: Student[];
  teachersForAdd?: Teacher[];
}

const ClassInformation = ({ classInfo, studentsForAdd = [], teachersForAdd = [] }: Props) => {
  const { name: initialName, description: initialDescription, teacher, students } = classInfo;

  const { addStudentsToClass, addTeacherToClass } = useCreateClass();
  const { updateClass, deleteClass } = useEditClass(`${classInfo.id}`);
  const navigate = useNavigate();

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<ClassInfo>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialName,
      description: initialDescription,
      students: students || [],
      teacher: teacher || '',
    }
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: ClassInfo) => {
    updateClass({
      name: data.name,
      description: data.description
    }).then((resp) => {
      console.log(resp);
      setOpenSnackbar(true);
    })
    .catch((err) => {
      console.log(err)
    });
  };

  const handleAddStudents = () => {
    const selectedStudents = getValues('students');

    if (selectedStudents && selectedStudents.length === 0) return;

    const selectedStudentsAsNumbers = selectedStudents?.map(studentId => +studentId);

    addStudentsToClass(`${classInfo.id}`, {
      studentsId: selectedStudentsAsNumbers!
    })
      .then((resp) => {
        console.log(resp);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/classes');
        },1000);
      })
      .catch((err) => {
        console.log(err)
      });
    
  };

  const handleAddTeacher = () => {
    const selectedTeacher = getValues('teacher');
    
    if (selectedTeacher && selectedTeacher.includes('undefined')) return;

    addTeacherToClass(`${classInfo.id}`, {
      teacherId: +selectedTeacher!
    })
      .then((resp) => {
        console.log(resp);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/classes');
        },1000);
      })
      .catch((err) => {
        console.log(err)
      });
    

  };

  const handleDeleteClass = () => {
    console.log('first')
    deleteClass()
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/classes');
        },1000);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" component="h2">
              Profesor: {teacher?.includes('undefined') ? 'Without teacher assigned' : teacher}
            </Typography>
            <Box mt={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors?.name?.message : ''}
                  />
                )}
              />
            </Box>
            <Box mt={2}>
              <Box width="100%" style={{ overflow: 'hidden' }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      aria-label="Description"
                      minRows={3}
                      placeholder="Description"
                      style={{ width: '95%', minHeight: 70, resize: 'none', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                UPDATE
              </Button>
              &nbsp;
              <Button type="submit" variant="contained" color="error" onClick={handleDeleteClass}>
                DELETE
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Box mt={1}>
            <Typography variant="h5" component="h3">
              Add Students <small>(select multiple)</small>
            </Typography>
            <Box mt={2}>
              <Controller
                name="students"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" error={!!errors.students}>
                    <InputLabel id="students-label">Students</InputLabel>
                    <Select
                      {...field}
                      labelId="students-label"
                      multiple
                      input={<OutlinedInput label="Students" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => {
                            const student = studentsForAdd.find(student => student.id.toString() === value);
                            return (
                              <Chip key={value} label={student ? `${student.name} ${student.surname}` : value} />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {studentsForAdd.map((student) => (
                        <MenuItem key={student.id} value={student.id.toString()}>
                          {student.name} {student.surname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleAddStudents}>
                  Add Students
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mt={5}>
            <Typography variant="h5" component="h3">
              Add Teacher <small>{!teacher?.includes('undefined') && '(the class has a teacher)'}</small>
            </Typography>
            <Box mt={2}>
              <Controller
                name="teacher"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" error={!!errors.teacher}>
                    <InputLabel id="teacher-label">Teacher</InputLabel>
                    <Select
                      {...field}
                      labelId="teacher-label"
                      input={<OutlinedInput label="Teacher" />}
                    >
                      {teachersForAdd.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name} {teacher.surname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleAddTeacher} disabled={teacher?.includes('undefined') ? false : true}>
                  Add Teacher
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Record added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClassInformation;
