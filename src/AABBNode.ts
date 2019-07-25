import IAABBShape from './IAABBShape';
import AABB from './AABB';

/**
 * Axis Aligned Bouding Box Node
 *
 * @remark
 * The bounding box on this nodes either fully contains the shape or the two child nodes.
 */
export default class AABBNode {
  public Aabb: AABB;
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
  constructor(Aabb: AABB, shape?: IAABBShape, parentNode?: AABBNode, leftNode?: AABBNode, rightNode?: AABBNode) {
    this.Aabb = Aabb;
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
