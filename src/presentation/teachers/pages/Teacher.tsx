import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeacher } from '../hooks/useTeacher';
import { Loader } from '../../ui/components/loader/Loader';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';


const teacherSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  surname: z.string().min(1, { message: 'Surname is required' }),
  email: z.string().email({ message: 'Invalid email address' })
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export const Teacher = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, teacher, deleteTeacher, updateTeacher } = useTeacher(id!);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (teacher) {
      setValue('name', teacher.name);
      setValue('surname', teacher.surname);
      setValue('email', teacher.email);
    }
  }, [teacher, setValue]);

  const onSubmit = (data: TeacherFormValues) => {
    updateTeacher(data)
      .then(() => {
        setSnackbarMessage('Teacher updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Error updating teacher!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDelete = () => {
    deleteTeacher()
      .then(() => {
        setSnackbarMessage('Teacher deleted successfully!');
        setSnackbarSeverity('success');
        setTimeout(() => {
          navigate('/teachers');
        }, 1000);
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Error deleting teacher!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Teacher Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Surname"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.surname}
              helperText={errors.surname ? errors.surname.message : ''}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
