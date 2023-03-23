import { Text } from '@consta/uikit/Text'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import {
  DefaultGridProp,
  formConstructorSlice,
  FormGroupsTypes,
  IGridElement,
} from '../../../../../../store/formElements'
import { IComponetCardElement } from '../types'

export const ComponentCardGrid: FC<IComponetCardElement> = ({ name }) => {
  const dispatch = useDispatch()

  const onStartDragComponentCard = (event: React.DragEvent) => {
    const newGrid: IGridElement = {
      id: uuid(),
      type: FormGroupsTypes.Grid,
      isOuter: false,
      props: DefaultGridProp,
    }
    dispatch(formConstructorSlice.actions.setDraggableElement({ element: newGrid }))
    event.stopPropagation()
  }

  return (
    <div>
      <Text draggable={true} onDragStart={onStartDragComponentCard}>
        {name}
      </Text>
    </div>
  )
}
