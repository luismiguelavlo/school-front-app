import { ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { Student } from '../../../core/entities/students.entity'
import { useNavigate } from 'react-router-dom'


interface Props {
  student: Student
}

export const StudentItem = ({ student }: Props) => {

  const navigate = useNavigate()

  const goTo = () => {
    navigate(`/students/${student.id}`)
  }

  return (
    <ListItemButton onClick={goTo}>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src='https://i.pinimg.com/736x/06/5f/06/065f06bab28c6e1bd6e4ee4d0250c88c.jpg' />
      </ListItemAvatar>
      <ListItemText primary={student.name + ' ' + student.surname} secondary={student.email} />
    </ListItemButton>
  )
}