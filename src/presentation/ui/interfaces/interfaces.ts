import { ReactElement } from 'react'

export interface TabContextProps {
  labels: string[],
  handleChange: (_: React.SyntheticEvent, newValue: string) => void
}

export interface ContentTabsProps {
  children?: ReactElement[]
}

export interface TabNavigationProps {
  labels: string[],
  children?: ReactElement[]
}