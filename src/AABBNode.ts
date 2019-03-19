import AABB from './AABB';
import IAABBShape from './Shapes/IAABBShape';

export default class AABBNode {
  public Aabb: AABB;
  public Shape?: IAABBShape;

  public ParentNode?: AABBNode;
  public LeftNode?: AABBNode;
  public RightNode?: AABBNode;

  constructor(aabb: AABB, shape?: IAABBShape, parentNode?: AABBNode, leftNode?: AABBNode, rightNode?: AABBNode) {
    this.Aabb = aabb;
    this.Shape = shape;

    this.ParentNode = parentNode;
    this.LeftNode = leftNode;
    this.RightNode = rightNode;
  }

  public get IsLeaf() {
    return this.LeftNode === undefined;
  }
}
