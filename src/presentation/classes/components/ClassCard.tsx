import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardActions } from '@mui/material';
import { Classes } from '../../../core/entities/classes.entity';
import { useNavigate } from 'react-router-dom';

interface Props {
  classDetail: Classes;
}

const MAX_DESCRIPTION_LENGTH = 164;

export default function ClassCard({ classDetail }: Props) {

  const navigate = useNavigate();

  const goToClassDetail = () => {
    navigate(`/classes/${classDetail.id}`);
  };

  const truncatedDescription = classDetail.description.length > MAX_DESCRIPTION_LENGTH ?
  `${classDetail.description.slice(0, MAX_DESCRIPTION_LENGTH)}...` :
  classDetail.description;

  return (
    <Card sx={{ width: '100%', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://img.freepik.com/vector-gratis/interior-aula-escuela-universidad-concepto-educativo-pizarra-tabla_1441-1694.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1716854400&semt=sph"
        title="class"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {classDetail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncatedDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToClassDetail}>Come In</Button>
      </CardActions>
    </Card>
  );
}
