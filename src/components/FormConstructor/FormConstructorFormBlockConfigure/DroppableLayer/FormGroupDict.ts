import { FC } from 'react'
import { FormElementTypes, FormGroupsTypes } from '../../store/formElements/types'
import {
  BadgeFormElement,
  ButtonFormElement,
  CardFormElement,
  CheckboxFormElement,
  HeaderWithBreadcrumbs,
  HeaderWithStatus,
  InformerFormElement,
  ProjectGrid,
  TabsFormElement,
  TextFieldFormElement,
  PlaceholderFormElement,
  CardWithBarChart,
  HeaderCognitiveGeologist,
  Dashboard,
  CustomCards,
  LayoutFormElement,
} from '../Elements'
import { GridFormElement } from '../Elements/GridFormElement'

export const FormGroupsDict: Record<FormGroupsTypes | FormElementTypes, FC<any>> = {
  Layout: LayoutFormElement,
  Grid: GridFormElement,
  Button: ButtonFormElement,
  Badge: BadgeFormElement,
  Card: CardFormElement,
  Checkbox: CheckboxFormElement,
  HeaderWithBreadcrumbs: HeaderWithBreadcrumbs,
  HeaderWithStatus: HeaderWithStatus,
  HeaderCognitiveGeologist: HeaderCognitiveGeologist,
  Informer: InformerFormElement,
  Tabs: TabsFormElement,
  Text: TextFieldFormElement,
  TextField: TextFieldFormElement,
  Placeholder: PlaceholderFormElement,
  CardWithBarChart: CardWithBarChart,
  ProjectGrid: ProjectGrid,
  CustomCards: CustomCards,
  Dashboard: Dashboard,
}
