import type { CSSProperties } from "vue";
import type { NodeItemType } from "./type";

export interface INodeItem {
  label?: INodeItemLabel;
  sublabels?: INodeItemLabel[];
  exp?: number;
  type: NodeItemType;
  style?: CSSProperties | string;
  details?: NodeItemDetails;
  icon?: IIcon;
  description?: INodeItemDescription;
  background?: IBackground;
  colors?: INodeItemColor;
  mode?: "dark" | "light" | "es" | "en";
  action?: boolean;
}
