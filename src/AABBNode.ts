import AABB3D from './AABB3d';
import IAABBShape from './IAABBShape';

/**
 * Axis Aligned Bouding Box Node
 *
 * @remark
 * The bounding box on this nodes either fully contains the shape or the two child nodes.
 */
export default class AABBNode {
  public Aabb: AABB3D;
  public Shape?: IAABBShape;

  public ParentNode?: AABBNode;
  public LeftNode?: AABBNode;
  public RightNode?: AABBNode;

  /**
   * @param aabb - A bounding box containing the shape or the two child nodes
   * @param shape - A reference to a shape implementation of IAABBShape
   * @param parentNode - The node parenting this node
   * @param leftNode - The first child node
   * @param rightNode - The second child node
   */
  constructor(aabb: AABB3D, shape?: IAABBShape, parentNode?: AABBNode, leftNode?: AABBNode, rightNode?: AABBNode) {
    this.Aabb = aabb;
    this.Shape = shape;

    this.ParentNode = parentNode;
    this.LeftNode = leftNode;
    this.RightNode = rightNode;
  }

  /**
   * @remark
   * The node is considered a leaf when is has no reference to any child nodes.
   * Only leaf nodes should contain shapes
   */
  public get IsLeaf() {
    return this.LeftNode === undefined;
  }
}
