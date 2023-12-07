import type { CSSProperties } from "vue";

export interface INode {
  parent: INode[];
  id: string;
  item: INodeItem;
  position: number;
  style?: CSSProperties;
  children?: INode[];
}
