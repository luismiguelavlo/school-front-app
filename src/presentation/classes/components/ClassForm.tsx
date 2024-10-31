import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClass } from '../hooks/useCreateClass';
import { useTeachers } from '../../teachers/hooks/useTeachers';
import { Loader } from '../../ui/components/loader/Loader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  teacherId: z.number().nullable(), // Change to nullable for optional field
});

type FormData = z.infer<typeof schema>;

export default function ClassForm () {
  const { handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const { createClass } = useCreateClass();
  const { teachers, isLoading } = useTeachers(100);

  const onSubmit = (data: FormData) => {
    createClass(data)
      .then(res => {
        console.log(res);
        setShowAlert(true);
        reset();
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch(err => console.log(err));
  };

  if (isLoading) {
    return <Loader />;
  }

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

      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          The class was successfully created.
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
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />

      <Controller
        name="teacherId"
        control={control}
        defaultValue={0} // Cambiado de null a una cadena vacía
        render={({ field }) => (
          <Select
            {...field}
            label="Teacher"
            variant="outlined"
            error={!!errors.teacherId}
            displayEmpty
            sx={{ width: '100%' }} // Set width to 100%
          >
            <MenuItem value="" disabled>
              Select a teacher
            </MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />


      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
