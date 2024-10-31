import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { Loader } from '../../ui/components/loader/Loader';
import { useStudentDetail } from '../hooks/useStudent';

const studentSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  surname: z.string().min(3, 'Surname is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export const Student = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, student, deleteStudent, updateStudent } = useStudentDetail(id!);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
  });

  const [alert, setAlert] = useState<{ severity: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (student) {
      setValue('name', student.name);
      setValue('surname', student.surname);
      setValue('email', student.email);
    }
  }, [student, setValue]);

  const onSubmit = (data: StudentFormValues) => {
    updateStudent(data)
      .then(() => {
        setAlert({ severity: 'success', message: 'The student was successfully updated.' });
        setTimeout(() => setAlert(null), 3000);
      })
      .catch((err: any) => {
        console.log(err);
        setAlert({ severity: 'error', message: 'There was an error updating the student.' });
        setTimeout(() => setAlert(null), 3000);
      });
  };

  const handleDelete = () => {
    deleteStudent()
      .then(() => {
        setAlert({ severity: 'success', message: 'The student was successfully deleted.' });
        setTimeout(() => {
          setAlert(null)
          navigate('/students');
        }, 1000);
      })
      .catch((err:any) => {
        console.log(err);
        setAlert({ severity: 'error', message: 'There was an error deleting the student.' });
        setTimeout(() => setAlert(null), 3000);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Student Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {alert && (
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={() => setAlert(null)}
          >
            <Alert onClose={() => setAlert(null)} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Surname"
              variant="outlined"
              error={!!errors.surname}
              helperText={errors.surname ? errors.surname.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 2 }}>
          Delete
        </Button>
      </form>
    </Container>
  );
};
