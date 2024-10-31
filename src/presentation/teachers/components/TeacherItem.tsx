import { ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { Teacher } from '../../../core/entities/teacher.entity'
import { useNavigate } from 'react-router-dom';



interface Props {
  teacher: Teacher
}

export const TeacherItem = ({ teacher }: Props) => {

  const navigate = useNavigate();

  const goToTeacherDetail = () => {
    console.log({teacher})
    navigate(`/teachers/${teacher.id}`);
  };

  return (
    <ListItemButton onClick={goToTeacherDetail}>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src='https://i.pinimg.com/736x/06/5f/06/065f06bab28c6e1bd6e4ee4d0250c88c.jpg' />
      </ListItemAvatar>
      <ListItemText primary={teacher.name + ' ' + teacher.surname} secondary={teacher.email} />
    </ListItemButton>
  )
}