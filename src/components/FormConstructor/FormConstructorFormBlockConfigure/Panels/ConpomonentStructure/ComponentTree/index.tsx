import styles from './styles.module.css'
import { cnRcTree, rcTreeAdapter } from '@consta/rc-tree-adapter'
import { default as RCTree } from 'rc-tree'
import { useLayoutEffect, useState } from 'react'
import { ITreeItem } from './types'
import { useAppSelector } from '../../../../store/formElements'

export const ComponentTree = () => {
  const [treeItems] = useState<ITreeItem[]>([])
  const { allElementsMap } = useAppSelector(state => state.formConstructor)

  const treeProps = rcTreeAdapter()
  const prefix = cnRcTree(
    {
      size: 'm',
    },
    ['CustomTree'],
  )

  useLayoutEffect(() => {}, [allElementsMap])

  return (
    <div className={`${styles.commentTree} borderCard`}>
      <RCTree {...treeProps} treeData={treeItems} prefixCls={prefix} defaultExpandAll={true} />
    </div>
  )
}
