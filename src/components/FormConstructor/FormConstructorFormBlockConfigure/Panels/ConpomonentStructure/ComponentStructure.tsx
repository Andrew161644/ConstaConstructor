import React, { FC } from 'react'
import { ComponentItems } from './ComponentItems'
import { ComponentTree } from './ComponentTree'
import styles from './styles.module.css'

export const ConpomonentStructure: FC = () => {
  return (
    <div className={`${styles.componentStructure} borderCard`}>
      <ComponentItems />
      <ComponentTree />
    </div>
  )
}
