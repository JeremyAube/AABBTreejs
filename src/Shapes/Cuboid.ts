import AABB from '../AABB';
import IAABBShape from './IAABBShape';
import Vector3 from './Vector3';

export default class Cuboid implements IAABBShape {
  constructor(private referencePoint: Vector3, private dimensions: Vector3) {}

  public GetAABB() {
    return new AABB(this.MinX, this.MinY, this.MinZ, this.X, this.Y, this.Z);
  }

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

  public get ReferencePoint(): Vector3 {
    return this.referencePoint;
  }
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
