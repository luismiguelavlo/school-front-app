import { TabContext } from '@mui/lab'
import { Box } from '@mui/material'
import { createContext, useState } from 'react'
import { TabContextProps, TabNavigationProps } from '../../interfaces/interfaces';

export const ContextTab = createContext({} as TabContextProps);

const { Provider } = ContextTab;


export const TabNavigation = ({ children ,labels }: TabNavigationProps) => {
  const [value, setValue] = useState('1')

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  return (
    <Provider
      value={{
        labels,
        handleChange,
      }}
    >
      <Box>
        <TabContext value={value}>
         { children }
        </TabContext>
      </Box>
    </Provider>
  )
}