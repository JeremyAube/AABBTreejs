import AABB from './AABB';
import AABBNode from './AABBNode';
import IAABBShape from './IAABBShape';

export default class AABBTree {
  private rootNode?: AABBNode; // The node at the top of the tree
  private shapeToNodeMap: Map<IAABBShape, AABBNode>; // The map of all the shapes with their associated node

  constructor() {
    this.shapeToNodeMap = new Map<IAABBShape, AABBNode>();
  }

  /**
   * Add a new shape to the tree
   */
  public AddShape(shape: IAABBShape): void {
    const shapeAABB = shape.GetAABB();

    // If there is no item in the tree we create the root node
    if (this.rootNode === undefined) {
      this.rootNode = new AABBNode(shapeAABB, shape, undefined, undefined, undefined);
      this.shapeToNodeMap.set(shape, this.rootNode);
      return;
    }

    let currentNode = this.rootNode;
    let newAabb = this.rootNode.Aabb;
    while (!currentNode.IsLeaf) {
      // We have to do this so that typescript doesn't yell at us
      const leftNode = currentNode.LeftNode as AABBNode;
      const rightNode = currentNode.RightNode as AABBNode;

      const newNodeAabb = currentNode.Aabb.Merge(shapeAABB);
      const shapeIsBiggerThanNode = newNodeAabb.Volume !== currentNode.Aabb.Volume;
      if (shapeIsBiggerThanNode) {
        break;
      }
      // Set the new AABB right away so we don't have to traverse the tree backwards after insert
      currentNode.Aabb = newNodeAabb;

      const newLeftAabb = leftNode.Aabb.Merge(shapeAABB);
      const newRightAabb = rightNode.Aabb.Merge(shapeAABB);
      const leftVolumeIncrease = newLeftAabb.Volume - leftNode.Aabb.Volume;
      const rightVolumeIncrease = newRightAabb.Volume - rightNode.Aabb.Volume;
      if (leftVolumeIncrease > rightVolumeIncrease) {
        currentNode = rightNode;
        newAabb = newRightAabb;
      } else {
        currentNode = leftNode;
        newAabb = newLeftAabb;
      }
    }

    const newChild = new AABBNode(currentNode.Aabb, currentNode.Shape, currentNode, undefined, undefined);
    if (currentNode.Shape !== undefined) {
      // Update the new shape to the new shape
      this.shapeToNodeMap.set(currentNode.Shape, newChild);
    }
    currentNode.LeftNode = newChild;
    currentNode.RightNode = new AABBNode(shapeAABB, shape, currentNode, undefined, undefined);
    // If rootNode is leaf we didn't pass through while loop so we didn't get a new AABB
    currentNode.Aabb = currentNode === this.rootNode ? this.rootNode.Aabb.Merge(shapeAABB) : newAabb;
    currentNode.Shape = undefined;

    this.shapeToNodeMap.set(shape, currentNode.RightNode);
    return;
  }

  /**
   * Remove the shape from the tree
   */
  public RemoveShape(shape: IAABBShape): void {
    if (!this.shapeToNodeMap.has(shape)) {
      return;
    }
    const node = this.shapeToNodeMap.get(shape) as AABBNode;

    this.removeNode(node);
    this.shapeToNodeMap.delete(shape);
  }

  /**
   * Update the AABB of the given shape. if the shape doesn't exit or it didn't move it won't do anything
   */
  public UpdateShape(shape: IAABBShape): void {
    const node = this.shapeToNodeMap.get(shape);

    if (node === undefined || node.Aabb.Contains(shape.GetAABB())) {
      return;
    }

    this.removeNode(node);
    this.AddShape(shape);
  }

  /**
   * Return all shapes with their AABB overlapping with this AABB
   */
  public GetOverlaps(aabb: AABB): void {
    throw new Error('AABBTree.GetOverlaps is not implemented');
  }

  public GetAllNodes(): AABBNode[] {
    let nodes: AABBNode[] = [];
    this.shapeToNodeMap.forEach((value, key) => {
      nodes.push(value);
    });

    return nodes;
  }

  /**
   * Remove the node from the tree
   */
  private removeNode(node: AABBNode) {
    if (node.ParentNode === undefined) {
      this.rootNode = undefined;
      return;
    }

    const parentNode = node.ParentNode;
    const sibling = (parentNode.LeftNode === node ? parentNode.RightNode : parentNode.LeftNode) as AABBNode;

    // Move the sibling up a level and clean references
    parentNode.Aabb = sibling.Aabb;
    parentNode.Shape = sibling.Shape;
    parentNode.LeftNode = undefined;
    parentNode.RightNode = undefined;
  }
}
