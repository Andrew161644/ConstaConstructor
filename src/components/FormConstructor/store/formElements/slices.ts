import { IFormConstructor, IFormElement, ILayoutElement } from './types'
import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { AddNewFormElementPayload } from './payload'

const initialState: IFormConstructor = {
  allElementsMap: new Map<string, (ILayoutElement | IFormElement)[]>(),
  selectedElementId: '',
}

const createFormConstructorSlice = <Reducers extends SliceCaseReducers<IFormConstructor>>({
  name = '',
  initialState,
  reducers,
}: {
  name: string
  initialState: IFormConstructor
  reducers: ValidateSliceCaseReducers<IFormConstructor, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: reducers,
  })
}

export const formConstructorSlice = createFormConstructorSlice({
  name: 'formConstructor',
  initialState,
  reducers: {
    addNewElement: (state, action: PayloadAction<AddNewFormElementPayload>) => {
      const map = state.allElementsMap
      map.set(action.payload.parent, [
        ...(state.allElementsMap.get(action.payload.parent) || []),
        action.payload.element,
      ])
      state.allElementsMap = new Map<string, (ILayoutElement | IFormElement)[]>(map)
    },
  },
})
