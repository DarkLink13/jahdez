import type { CSSProperties } from "vue"
import type { NodeItemType } from "./type"

export interface INodeItem {
  id: string
  label?: INodeItemLabel
  sublabels?: INodeItemLabel[]
  exp?: number
  type: NodeItemType
  style?: CSSProperties
  details?: NodeItemDetails
  icon?: IIcon
  description?: string
  background?: IBackground
  colors?: INodeItemColor
  mode?: 'dark' | 'light'
  action?: (params: any) => void
}
