import type { CSSProperties } from "vue";

export interface INode {
  item: INodeItem;
  style?: CSSProperties;
  children?: (INode | undefined)[];
}
