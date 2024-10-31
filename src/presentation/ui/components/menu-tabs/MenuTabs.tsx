import { useContext } from 'react';
import { ContextTab } from '../tab-navigation/TabNavigation';
import { Box, Tab } from '@mui/material';
import { TabList } from '@mui/lab';



export const MenuTabs = () => {

  const { handleChange, labels } = useContext(ContextTab);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList aria-label='tabs example' onChange={handleChange}>
        {
          labels.map((label, index) => (
            <Tab key={index} label={label} value={`${index + 1}`} />
          ))
        }
      </TabList>
    </Box>
  )
}
