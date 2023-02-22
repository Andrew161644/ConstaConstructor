export interface ITreeItem {
  key: string
  title: string
  children: ITreeItem[]
  disableCheckbox: boolean
}
