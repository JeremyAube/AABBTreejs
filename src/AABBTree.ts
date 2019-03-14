import AABB from './AABB';
import AABBNode from './AABBNode';
import IAABBShape from './IAABBShape';

export default class AABBTree {
  public rootNode?: AABBNode; // The node at the top of the tree
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
      const newLeftAabb = leftNode.Aabb.Merge(shapeAABB);
      const newRightAabb = rightNode.Aabb.Merge(shapeAABB);

      const volumeDifference = newNodeAabb.Volume - currentNode.Aabb.Volume;
      if (volumeDifference > 0) {
        let leftCost;
        let rightCost;

        if (leftNode.IsLeaf) {
          leftCost = newLeftAabb.Volume + volumeDifference;
        } else {
          leftCost = newLeftAabb.Volume - leftNode.Aabb.Volume + volumeDifference;
        }

        if (rightNode.IsLeaf) {
          rightCost = newRightAabb.Volume + volumeDifference;
        } else {
          rightCost = newRightAabb.Volume - rightNode.Aabb.Volume + volumeDifference;
        }

        // For some reason 1.3 is a good bias to introduce. Might need to understand that some day...
        if (newNodeAabb.Volume < leftCost * 1.3 && newNodeAabb.Volume < rightCost * 1.3) {
          break;
        }

        currentNode.Aabb = newNodeAabb;
        if (leftCost > rightCost) {
          currentNode = rightNode;
          newAabb = newRightAabb;
        } else {
          currentNode = leftNode;
          newAabb = newLeftAabb;
        }
        continue;
      }
      // Set the new AABB right away so we don't have to traverse the tree backwards after insert
      currentNode.Aabb = newNodeAabb;

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

    const newChild = new AABBNode(
      currentNode.Aabb,
      currentNode.Shape,
      currentNode,
      currentNode.RightNode,
      currentNode.LeftNode
    );
    if (newChild.Shape !== undefined) {
      // Update the new shape to the new shape
      this.shapeToNodeMap.set(newChild.Shape, newChild);
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
   * Return all shapes with their AABB overlapping with this AABB
   */
  public GetOverlaps(aabb: AABB): void {
    throw new Error('AABBTree.GetOverlaps is not implemented');
  }

  public GetAllNodes(): AABBNode[] {
    const nodes: AABBNode[] = [];

    if (this.rootNode !== undefined) {
      this.nodeIterator(this.rootNode, nodes);
    }

    return nodes;
  }

  private nodeIterator(node: AABBNode, array: AABBNode[]) {
    array.push(node);
    if (!node.IsLeaf) {
      this.nodeIterator(node.RightNode as AABBNode, array);
      this.nodeIterator(node.LeftNode as AABBNode, array);
    }
  }

  /**
   * Remove the node from the tree
   */
  private removeNode(node: AABBNode) {
    // if this is the root node we delete everything
    if (node.ParentNode === undefined) {
      this.rootNode = undefined;
      return;
    }

    const parentNode = node.ParentNode;
    const sibling = (parentNode.LeftNode === node ? parentNode.RightNode : parentNode.LeftNode) as AABBNode;

    // Move the sibling up a level and clean references
    parentNode.Aabb = sibling.Aabb;
    parentNode.Shape = sibling.Shape;
    parentNode.LeftNode = sibling.LeftNode;
    parentNode.RightNode = sibling.RightNode;

    // change the reference to the children to point the their new parent
    if (!sibling.IsLeaf) {
      const left = sibling.LeftNode as AABBNode;
      const right = sibling.RightNode as AABBNode;
      left.ParentNode = parentNode;
      right.ParentNode = parentNode;
    }

    if (this.shapeToNodeMap.has(parentNode.Shape as IAABBShape)) {
      this.shapeToNodeMap.set(parentNode.Shape as IAABBShape, parentNode);
    }

    // Fix tree upwards
    let currentNode = parentNode.ParentNode;
    while (currentNode !== undefined) {
      currentNode.Aabb = (currentNode.LeftNode as AABBNode).Aabb.Merge((currentNode.RightNode as AABBNode).Aabb);
      currentNode = currentNode.ParentNode;
    }
  }
}
