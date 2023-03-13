import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import {
  useAppSelector,
  formConstructorSlice,
  FormElementTypes,
  FormGroupsTypes,
  ILayoutElement,
  IFormElement,
  IGroupElement,
} from '../../store/formElements'
import { IDroppableLayer } from './types'
import styles from './styles.module.css'
import { getNewGroupParentLevel } from '../../utils'
import { BadgeFormElement } from '../Elements/Badge'
import { CheckboxFormElement } from '../Elements/CheckboxFormElement'
import {
  baseComponentsSlice,
  useBaseComponentsDispatch,
  useBaseComponentsSelector,
} from '../../store/baseComponentsItems'
import { SwitchComponent } from '../SwitchComponent'

/// DroppableLayer - компонент в кторый можно что то перенести
export const DroppableLayer: FC<IDroppableLayer> = ({ parentElementId }) => {
  /// Id уровня (для самой формы id любой, для каждого layout элемента - id layout элемента)
  const { allElementsTree, allElementsMap, draggableElement } = useAppSelector(
    state => state.formConstructor,
  )
  const { draggableBaseComponent } = useBaseComponentsSelector(state => state.baseComponents)

  const [elementsOnLayer, setElementsOnLayer] = useState<(IGroupElement | IFormElement)[]>([])
  const dispatch = useDispatch()
  const dispathBaseComponents = useBaseComponentsDispatch()

  useEffect(() => {
    /// Подгружаем все эелементы на текущем уровне
    const layerIds = allElementsTree.get(parentElementId) || []
    const elementsOnLayer: (IGroupElement | IFormElement)[] = []
    layerIds.forEach(ids => {
      const elem = allElementsMap.get(ids)
      elem && elementsOnLayer.push(elem)
    })
    setElementsOnLayer([...elementsOnLayer])
  }, [allElementsTree, parentElementId, allElementsMap])

  const handleOnDropBaseComponent = () => {
    if (draggableBaseComponent) {
      const childParentMap = new Map<string, string>(draggableBaseComponent.childParentMap)
      const elementsToAdd = draggableBaseComponent.childrenElementList

      // Ниже создаем новые id, но необходимо сохранить старые взаимосвязи элемент-родитель
      const mappedIds = new Map<string, string>([])

      elementsToAdd.forEach(elem => {
        const prevId = elem.id
        const prevParentId = childParentMap.get(prevId)
        if (!prevParentId) {
          let newId = mappedIds.get(prevId)
          if (!newId) {
            newId = uuid()
            mappedIds.set(prevId, newId)
          }
          elem = { ...elem, id: newId }
          addElement(elem, parentElementId)
        } else {
          let newId = mappedIds.get(prevId)
          if (!newId) {
            newId = uuid()
            mappedIds.set(prevId, newId)
          }
          elem = { ...elem, id: newId }
          let newParentId = mappedIds.get(prevParentId)
          if (!newParentId) {
            newParentId = uuid()
            mappedIds.set(prevParentId, newParentId)
          }
          if ('parentId' in elem) {
            elem.parentId = newParentId
          }
          console.log(elem, newParentId)
          addElement(elem, newParentId)
        }
      })

      // После перетаскивания, очищаем соответсвующее поле в сторе
      dispathBaseComponents(
        baseComponentsSlice.actions.setDraggableBaseComponent({ baseComponent: null }),
      )
    }
  }

  const handleOnDrop = (event: React.DragEvent) => {
    event.stopPropagation()
    event.preventDefault()

    // const formElemType = event.dataTransfer.getData('FormElementType') as FormElementTypes
    // const groupElementType = event.dataTransfer.getData('FormGroupsType') as FormGroupsTypes
    const isBaseComponent = event.dataTransfer.getData('BaseComponent')
    if (isBaseComponent === 'true') {
      handleOnDropBaseComponent()
      return
    }

    if (draggableElement) {
      if (draggableElement.type === FormGroupsTypes.LayoutOuter) {
        addLayoutOuter(draggableElement as ILayoutElement)
      } else {
        addElement(draggableElement, parentElementId)
      }
    }

    dispatch(formConstructorSlice.actions.setDraggableElement({ element: null }))

    // if (groupElementType) {
    //   switch (groupElementType) {
    //     case FormGroupsTypes.LayoutInner:
    //       const layoutElement: ILayoutElement = {
    //         id: uuid(),
    //         parentId: parentElementId,
    //         type: groupElementType,
    //         props: {
    //           constaProps: {
    //             flex: 1,
    //             direction: 'row',
    //           },
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addLayoutInner(layoutElement)
    //       break
    //     case FormGroupsTypes.LayoutOuter: {
    //       const layoutElement: ILayoutElement = {
    //         id: uuid(),
    //         parentId: parentElementId,
    //         type: groupElementType,
    //         props: {
    //           constaProps: {
    //             flex: 1,
    //             direction: 'row',
    //           },
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addLayoutOuter(layoutElement)
    //       break
    //     }
    //     case FormGroupsTypes.Card:
    //       const newCard: ICardElement = {
    //         id: uuid(),
    //         parentId: parentElementId,
    //         type: groupElementType,
    //         props: {
    //           constaProps: {
    //             verticalSpace: 'm',
    //             horizontalSpace: 'm',
    //             status: undefined,
    //             form: 'square',
    //           },
    //           baseProps: {},
    //           className: '',
    //           styles: {
    //             width: '376px',
    //             height: '227px',
    //           },
    //         },
    //       }
    //       addElement(newCard, parentElementId)
    //       break
    //   }
    //   return
    // }

    // if (formElemType) {
    //   switch (formElemType) {
    //     case FormElementTypes.Button:
    //       const newButton: IFormElementButton = {
    //         id: uuid(),
    //         type: FormElementTypes.Button,
    //         props: {
    //           disabled: true,
    //           label: 'Кнопка',
    //           view: 'primary',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newButton, parentElementId)
    //       break

    //     case FormElementTypes.Badge:
    //       const newBadge: IFormElementBadge = {
    //         id: uuid(),
    //         type: FormElementTypes.Badge,
    //         props: {
    //           label: 'Badge',
    //           form: 'default',
    //           size: 's',
    //           status: 'success',
    //           view: 'filled',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newBadge, parentElementId)
    //       break

    //     case FormElementTypes.Tabs:
    //       const items = [
    //         { id: 0, label: 'tab1' },
    //         { id: 1, label: 'tab2' },
    //       ]
    //       const newTabs: IFormElementTabs = {
    //         id: uuid(),
    //         type: FormElementTypes.Tabs,
    //         props: {
    //           view: 'clear',
    //           className: '',
    //           baseProps: {},
    //           value: items[0],
    //           items: items,
    //           onChange: () => {},
    //           linePosition: 'top',
    //           fitMode: 'dropdown',
    //           size: 'm',
    //         },
    //       }
    //       addElement(newTabs, parentElementId)
    //       break

    //     case FormElementTypes.Text:
    //       const newText: IFormElementText = {
    //         id: uuid(),
    //         type: FormElementTypes.Text,
    //         props: {
    //           content: 'Text',
    //           size: 's',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newText, parentElementId)
    //       break
    //     case FormElementTypes.Informer:
    //       const newInformer: IFormElementInformer = {
    //         id: uuid(),
    //         type: FormElementTypes.Informer,
    //         props: {
    //           label: 'Informer',
    //           title: 'Title',
    //           size: 's',
    //           status: 'success',
    //           view: 'filled',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newInformer, parentElementId)
    //       break

    //     case FormElementTypes.Checkbox:
    //       const newCheckbox: IFormElementCheckbox = {
    //         id: uuid(),
    //         type: FormElementTypes.Checkbox,
    //         props: {
    //           checked: undefined,
    //           size: 's',
    //           view: 'primary',
    //           align: 'center',
    //           disabled: false,
    //           label: 'Checkbox',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newCheckbox, parentElementId)
    //       break

    //     case FormElementTypes.TextField:
    //       const newTextField: IFormElementTextField = {
    //         id: uuid(),
    //         type: FormElementTypes.TextField,
    //         props: {
    //           type: 'text',
    //           width: 'default',
    //           form: 'default',
    //           size: 'm',
    //           view: 'default',
    //           caption: 'Подпись',
    //           label: 'Заголовок',
    //           labelPosition: 'top',
    //           maxLength: 200,
    //           placeholder: 'Подсказка в поле',
    //           step: '1',
    //           min: '0',
    //           max: '200',
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newTextField, parentElementId)
    //       break
    //     case FormElementTypes.HeaderWithBreadcrumbs:
    //       const newHeader: IFormElementHeaderWithBreadcrumbs = {
    //         id: uuid(),
    //         type: FormElementTypes.HeaderWithBreadcrumbs,
    //         props: {
    //           className: '',
    //           baseProps: {},
    //         },
    //       }
    //       addElement(newHeader, parentElementId)
    //       break
    //   }
    // }
  }

  const addLayoutOuter = (layoutElement: ILayoutElement) => {
    const newParentElementId = getNewGroupParentLevel(parentElementId, allElementsMap)

    if (newParentElementId) {
      addElement(layoutElement, newParentElementId)
    }
  }

  const addElement = (element: IFormElement | IGroupElement, parentElementId: string) => {
    dispatch(
      formConstructorSlice.actions.addNewElement({
        parent: parentElementId,
        element: element,
      }),
    )
  }

  return (
    <div
      className={styles.droppableContainer}
      onDrop={handleOnDrop}
      onDragOver={event => event.preventDefault()}
    >
      {elementsOnLayer.map(el => {
        return (
          <SwitchComponent key={`${el.id}_switch`} testValue={el.type}>
            <CheckboxFormElement
              key={el.id}
              value={FormElementTypes.Checkbox}
              formElement={el as IFormElement}
            />
            <BadgeFormElement
              key={el.id}
              value={FormElementTypes.Badge}
              formElement={el as IFormElement}
            />
          </SwitchComponent>
        )
      })}
      {/* {elementsOnLayer.map(el => {
        if (el.type === FormGroupsTypes.LayoutInner || el.type === FormGroupsTypes.LayoutOuter) {
          return <LayoutFromElement key={el.id} layoutElement={el as ILayoutElement} />
        } else if (el.type === FormElementTypes.Button) {
          return <ButtonFormElement key={el.id} formElement={el} />
        } else if (el.type === FormGroupsTypes.Card) {
          return <CardFormElement key={el.id} cardElement={el as ICardElement} />
        } else if (el.type === FormElementTypes.Badge) {
          return <BadgeFormElement key={el.id} formElement={el} />
        } else if (el.type === FormElementTypes.Tabs) {
          return <TabsFormElement key={el.id} formElement={el as IFormElementTabs} />
        } else if (el.type === FormElementTypes.Text) {
          return <TextFormElement key={el.id} formElement={el} />
        } else if (el.type === FormElementTypes.Informer) {
          return <InformerFormElement key={el.id} formElement={el} />
        } else if (el.type === FormElementTypes.Checkbox) {
          return <CheckboxFormElement key={el.id} formElement={el} />
        } else if (el.type === FormElementTypes.TextField) {
          return <TextFieldFormElement key={el.id} formElement={el} />
        } else if (el.type === FormElementTypes.HeaderWithBreadcrumbs) {
          return <HeaderWithBreadcrumbs key={el.id} formElement={el} />
        }
        return <></>
      })} */}
    </div>
  )
}
