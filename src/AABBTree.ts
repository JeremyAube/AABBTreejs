import AABBNode from './AABBNode';
import Vector3 from './Vector3';
import IAABBShape from './IAABBShape';
import { Vector2 } from 'src';

/**
 * Axis Aligned Bounding Box Tree
 */
export default class AABBTree {
  private rootNode?: AABBNode;
  private shapeToNodeMap: Map<IAABBShape, AABBNode>;

  constructor() {
    this.shapeToNodeMap = new Map<IAABBShape, AABBNode>();
  }

  /**
   * Adds a new shape to the tree.
   * @param shape The shape to add to the tree (Must be an implementation of IAABBShape interface)
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

      const volumeDifference = newNodeAabb.Space - currentNode.Aabb.Space;
      if (volumeDifference > 0) {
        let leftCost;
        let rightCost;

        if (leftNode.IsLeaf) {
          leftCost = newLeftAabb.Space + volumeDifference;
        } else {
          leftCost = newLeftAabb.Space - leftNode.Aabb.Space + volumeDifference;
        }

        if (rightNode.IsLeaf) {
          rightCost = newRightAabb.Space + volumeDifference;
        } else {
          rightCost = newRightAabb.Space - rightNode.Aabb.Space + volumeDifference;
        }

        // For some reason 1.3 is a good bias to introduce. Might need to understand that some day...
        if (newNodeAabb.Space < leftCost * 1.3 && newNodeAabb.Space < rightCost * 1.3) {
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

      const leftVolumeIncrease = newLeftAabb.Space - leftNode.Aabb.Space;
      const rightVolumeIncrease = newRightAabb.Space - rightNode.Aabb.Space;
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
   * Removes the shape and balances the tree
   * @remarks The method will gracefully exit if the shape doesn't exist in the tree
   * @param shape - The shape to remove from the tree
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
   * Finds all the shape overlapping with the point
   * @remarks if the tree is empty this function will always return an empty array
   * @param shape - The shape to check overlaps against
   * @returns An array containing all the shape overlapping with the point
   */
  public GetShapesOverlappingWith(point: Vector3 | Vector2): IAABBShape[] {
    if (this.rootNode === undefined) {
      return [];
    }

    const collidingNodes: IAABBShape[] = [];
    const nodesToCheck: AABBNode[] = [this.rootNode as AABBNode];
    let index = 0;
    while (nodesToCheck.length > index) {
      const leftNode = (nodesToCheck[index] as AABBNode).LeftNode as AABBNode;
      const rightNode = (nodesToCheck[index] as AABBNode).RightNode as AABBNode;

      if (leftNode) {
        if (leftNode.Aabb.ContainsPoint(point)) {
          if (!leftNode.IsLeaf) {
            nodesToCheck.push(leftNode);
          } else if ((<IAABBShape>leftNode.Shape).ContainsPoint(point)) {
            collidingNodes.push(<IAABBShape>leftNode.Shape);
          }
        }
      }
      if (rightNode) {
        if (rightNode.Aabb.ContainsPoint(point)) {
          if (!rightNode.IsLeaf) {
            nodesToCheck.push(rightNode);
          } else if ((<IAABBShape>rightNode.Shape).ContainsPoint(point)) {
            collidingNodes.push(<IAABBShape>rightNode.Shape);
          }
        }
      }

      index++;
    }

    return collidingNodes;
  }

  /**
   * Returns all the node in the tree
   *
   * @remarks
   * The nodes that serves as parent containers are also returned. Do not expect every node to contain a shape
   *
   * @returns An array containing all the nodes the tree contains
   */
  public GetAllNodes(): AABBNode[] {
    const nodes: AABBNode[] = [];

    if (this.rootNode !== undefined) {
      this.nodeIterator(this.rootNode, nodes);
    }

    return nodes;
  }

  /**
   * Iterates recursivly over the entire three and all the node to the array
   *
   * @param node - The node to iterate over
   * @param array - Reference to the array that will contain all the nodes in the tree
   */
  private nodeIterator(node: AABBNode, array: AABBNode[]) {
    array.push(node);
    if (!node.IsLeaf) {
      this.nodeIterator(node.RightNode as AABBNode, array);
      this.nodeIterator(node.LeftNode as AABBNode, array);
    }
  }

  /**
   * Remove a node from the tree and balances the tree if needed
   *
   * @param node - The node to remove from the tree
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
