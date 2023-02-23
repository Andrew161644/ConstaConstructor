import { ElementTypes, FormElementTypes, IFormElement, ILayoutElement } from './types'

export interface AddNewElementPayload {
  element: IFormElement | ILayoutElement
  parent: string
}

export interface SetNewSelectedElement {
  elementId: string
  elemntType: ElementTypes
  formElementType?: FormElementTypes
}
