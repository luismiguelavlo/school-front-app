import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TabNavigation, MenuTabs, ContentTabs } from '../../ui/components';
import TeacherForm from '../components/TeacherForm';
import { TeacherList } from '../components/TeacherList';

export const Teachers = () => {
  return (
    <Container sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabNavigation labels={['List Teachers', 'Create Teacher']}>
            <MenuTabs />
            <ContentTabs>
              <TeacherList />
              <TeacherForm />
            </ContentTabs>
          </TabNavigation>
        </Grid>
      </Grid>
    </Container>
  );
};
