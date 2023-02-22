import { IFormElement, ILayoutElement } from '../store/formElements/types'

export const buildTreeItems = (
  formElementsMap: Map<string, (ILayoutElement | IFormElement)[]>,
  rootName: string,
) => {
  const root = formElementsMap.get('root')
}
