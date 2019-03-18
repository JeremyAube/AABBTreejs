import IAABBShape from './IAABBShape';
import Vector3 from './Vector3';
import AABB from 'src/AABB';

export default class Cylinder implements IAABBShape {
  constructor(private referencePoint: Vector3, private radius: number, private depth: number) {}

  public GetAABB(): AABB {
    let minX = this.referencePoint.X - this.radius;
    let maxX = this.referencePoint.X + this.radius;
    let minY = this.referencePoint.Y - this.radius;
    let maxY = this.referencePoint.Y + this.radius;
    let minZ = this.referencePoint.Z - this.depth;

    return new AABB(minX, minY, minZ, maxX, maxY, this.referencePoint.Z);
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
