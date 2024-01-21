export const getColors = (node: INode) => ({
  parent: node.item?.colors?.secondary,
  ...(node.children
    ? Object.fromEntries(
        node.children.map((child: INode) => [
          child.position,
          child?.item.colors?.secondary,
        ]),
      )
    : {}),
});
