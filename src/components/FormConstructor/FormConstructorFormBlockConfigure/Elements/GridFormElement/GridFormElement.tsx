import { FC, useLayoutEffect, useState } from 'react'
import {
  ElementTypes,
  FormGroupsTypes,
  IGridElement,
  IGridProp,
  useAppSelector,
} from '../../../store/formElements'
import { DroppableLayer } from '../../DroppableLayer'
import { SelectableLayer } from '../../SelectableLayer'
import { IGridFormElement } from './types'

export const GridFormElement: FC<IGridFormElement> = ({ element }) => {
  const [gridTemplateRows, setGridTemplateRows] = useState<string>('')
  const [gridTemplateColumns, setGridTemplateColumns] = useState<string>('')
  const [divsCnt, setDivsCnt] = useState<number>(0)

  const { isGridVisible } = useAppSelector(state => state.formConstructor)

  useLayoutEffect(() => {
    const gridProps: IGridProp = (element as IGridElement).props
    const rows = gridProps.rows.map(row => `${row.value}${row.measurement}`).join(' ')
    const columns = gridProps.columns.map(row => `${row.value}${row.measurement}`).join(' ')

    setDivsCnt(gridProps.rows.length + gridProps.columns.length)

    setGridTemplateRows(rows)
    setGridTemplateColumns(columns)
  }, [element])

  return (
    <div
      className={`${isGridVisible ? 'dottedCard' : ''}`}
      style={{
        display: 'grid',
        gridTemplateRows: gridTemplateRows,
        gridTemplateColumns: gridTemplateColumns,
      }}
    >
      {Array.from(Array(divsCnt).keys()).map(div => {
        return <div className={`${isGridVisible ? 'dottedCard' : ''}`}></div>
      })}
    </div>
  )
}
