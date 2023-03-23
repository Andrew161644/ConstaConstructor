import { Values } from '../../utils'
import { IFormElement, IGroupElement } from './types'

const GridMeasurement = {
  Percent: '%',
  Pixels: 'px',
  Fraction: 'fr',
} as const

export type ElementGridMeasurementTypes = Values<typeof GridMeasurement>

export interface IGridPropParam {
  value: string
  measurement: ElementGridMeasurementTypes
}

export interface IGridProp {
  rows: IGridPropParam[]
  columns: IGridPropParam[]
}

export const DefaultGridProp: IGridProp = {
  rows: [
    { measurement: '%', value: '33.3' },
    { measurement: '%', value: '33.3' },
    { measurement: '%', value: '33.3' },
  ],
  columns: [
    { measurement: '%', value: '33.3' },
    { measurement: '%', value: '33.3' },
    { measurement: '%', value: '33.3' },
  ],
}

export interface IGridElement extends IGroupElement {
  props: IGridProp
}
