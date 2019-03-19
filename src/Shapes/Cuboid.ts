import AABB from '../AABB';
import IAABBShape from './IAABBShape';
import Vector3 from './Vector3';

export default class Cuboid implements IAABBShape {
  /**
   * @param referencePoint - The corner reference of the cuboid (top-right-front)
   * @param dimensions - the dimenstions of the cuboid
   */
  constructor(private referencePoint: Vector3, private dimensions: Vector3) {}

  /**
   * @returns a bounding box fully containing the cuboid
   */
  public GetAABB() {
    return new AABB(this.MinX, this.MinY, this.MinZ, this.X, this.Y, this.Z);
  }

  /**
   * Check if a point is contained within the cuboid
   *
   * @param point - The point to check
   *
   * @returns `true` if the point is contained, `false` otherwise
   */
  public ContainsPoint(point: Vector3): boolean {
    if (point.Z > this.referencePoint.Z || point.Z < this.referencePoint.Z - this.dimensions.Z) {
      return false;
    }

    if (
      point.X >= this.referencePoint.X &&
      point.X <= this.referencePoint.X + this.dimensions.X &&
      point.Y >= this.referencePoint.Y &&
      point.Y <= this.referencePoint.Y + this.dimensions.Y
    ) {
      return true;
    }

    return false;
  }

  /**
   * The reference corner of the cuboid
   */
  public get ReferencePoint(): Vector3 {
    return this.referencePoint;
  }
  /**
   * The dimensions of the cuboid
   */
  public get Dimensions(): Vector3 {
    return this.dimensions;
  }
  public get X(): number {
    return this.referencePoint.X;
  }
  public get Y(): number {
    return this.referencePoint.Y;
  }
  public get Z(): number {
    return this.referencePoint.Z;
  }
  public get MinX(): number {
    return this.referencePoint.X - this.dimensions.X;
  }
  public get MinY(): number {
    return this.referencePoint.Y - this.dimensions.Y;
  }
  public get MinZ(): number {
    return this.referencePoint.Z - this.dimensions.Z;
  }
}
