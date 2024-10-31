
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ContentTabs, MenuTabs, TabNavigation } from '../../ui/components';
import { ListClass } from '../components/ListClass';
import ClassForm from '../components/ClassForm';

export const Classes = () => {
  return (
    <Container sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabNavigation labels={['List Classes', 'Create Class']}>
            <MenuTabs />
            <ContentTabs>
              <ListClass />
              <ClassForm />
            </ContentTabs>
          </TabNavigation>
        </Grid>
      </Grid>
    </Container>
  );
};
