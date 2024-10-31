import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TabNavigation, MenuTabs, ContentTabs } from '../../ui/components';
import StudentForm from '../components/StudentForm';
import { StundentList } from '../components/StundentList';

export const Students = () => {
  return (
    <Container sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabNavigation labels={['List Students', 'Create Student']}>
            <MenuTabs />
            <ContentTabs>
              <StundentList />
              <StudentForm />
            </ContentTabs>
          </TabNavigation>
        </Grid>
      </Grid>
    </Container>
  );
};
