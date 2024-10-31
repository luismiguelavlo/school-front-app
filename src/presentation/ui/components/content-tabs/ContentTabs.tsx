import { TabPanel } from '@mui/lab';
import { ContentTabsProps } from '../../interfaces/interfaces';
import { useContext } from 'react';
import { ContextTab } from '../tab-navigation/TabNavigation';



export const ContentTabs = ({ children }: ContentTabsProps) => {

  const { labels } = useContext(ContextTab);

  return (
    <>
      {
        labels.map((_, index) => (
          <TabPanel key={index} value={`${index + 1}`}>
            {children![index]}
          </TabPanel>
        ))
      }
    </>
  )
}