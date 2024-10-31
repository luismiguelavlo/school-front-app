import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTeacher } from '../hooks/useCreateTeacher';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  surname: z.string().min(3, 'Surname is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export default function TeacherForm() {
  const { handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [alert, setAlert] = React.useState<{ severity: 'success' | 'error', message: string } | null>(null);
  const { createTeacher } = useCreateTeacher();

  const onSubmit = (data: FormData) => {
    createTeacher(data)
      .then(res => {
        console.log(res);
        setAlert({ severity: 'success', message: 'The teacher was successfully created.' });
        reset();
        setTimeout(() => setAlert(null), 3000);
      })
      .catch(err => {
        console.log(err);
        setAlert({ severity: 'error', message: 'There was an error creating the teacher.' });
        setTimeout(() => setAlert(null), 3000);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '100%' },
        maxWidth: 500,
        margin: '0 auto',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Registration Form
      </Typography>

      {alert && (
        <Alert 
          icon={alert.severity === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />} 
          severity={alert.severity} 
          sx={{ width: '100%', mb: 2 }}
        >
          {alert.message}
        </Alert>
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
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
        Submit
      </Button>
    </Box>
  );
}
