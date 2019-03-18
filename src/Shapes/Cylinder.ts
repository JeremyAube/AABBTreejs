import AABB from '../AABB';
import IAABBShape from './IAABBShape';
import Vector3 from './Vector3';

export default class Cylinder implements IAABBShape {
  private radiusSquared: number;

  constructor(private referencePoint: Vector3, private radius: number, private depth: number) {
    this.radiusSquared = radius * radius;
  }

  public GetAABB(): AABB {
    const minX = this.referencePoint.X - this.radius;
    const maxX = this.referencePoint.X + this.radius;
    const minY = this.referencePoint.Y - this.radius;
    const maxY = this.referencePoint.Y + this.radius;
    const minZ = this.referencePoint.Z - this.depth;

    return new AABB(minX, minY, minZ, maxX, maxY, this.referencePoint.Z);
  }

  /**
   * Returns true if the point is contained within the cylinder
   */
  public ContainsPoint(point: Vector3) {
    if (point.Z > this.referencePoint.Z || point.Z < this.referencePoint.Z - this.depth) {
      return false;
    }

    const distSquared = Math.pow(point.X - this.referencePoint.X, 2) + Math.pow(point.Y - this.referencePoint.Y, 2);
    return distSquared < this.radiusSquared;
  }

  public get ReferencePoint(): Vector3 {
    return this.referencePoint;
  }
  public get Radius(): number {
    return this.radius;
  }
  public get Depth(): number {
    return this.depth;
  }
}
