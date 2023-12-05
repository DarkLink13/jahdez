import type { CSSProperties } from "vue";

export interface INode {
  id?: string;
  item: INodeItem;
  position?: number;
  style?: CSSProperties;
  children?: (INode | undefined | String)[];
}
