import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateStudent } from '../hooks/useCreateStudent';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export default function StudentForm() {
  const { handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const { createStudent } = useCreateStudent();

  const onSubmit = (data: FormData) => {
    createStudent(data)
      .then(res => {
        console.log(res);
        setShowSuccessAlert(true);
        reset();
        setTimeout(() => setShowSuccessAlert(false), 3000);
      })
      .catch(err => {
        console.log(err);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 3000);
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
        Formulario de Registro
      </Typography>

      <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={() => setShowSuccessAlert(false)}>
        <Alert onClose={() => setShowSuccessAlert(false)} severity="success" sx={{ width: '100%' }}>
          El estudiante fue creado exitosamente.
        </Alert>
      </Snackbar>

      <Snackbar open={showErrorAlert} autoHideDuration={3000} onClose={() => setShowErrorAlert(false)}>
        <Alert onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: '100%' }}>
          Hubo un error al crear el estudiante.
        </Alert>
      </Snackbar>

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
