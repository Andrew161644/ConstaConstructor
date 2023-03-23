import { Values } from '../../utils'

export const GridMeasurement = {
  Percent: 'Percent',
  Pixels: 'Pixels',
  Fraction: 'Fraction',
} as const

export type ElementGridMeasurementTypes = Values<typeof GridMeasurement>

export interface IGridParam {
  value: string
  measurement: ElementGridMeasurementTypes
}

export interface IGrid {
  rows: IGridParam[]
  columns: IGridParam[]
}
