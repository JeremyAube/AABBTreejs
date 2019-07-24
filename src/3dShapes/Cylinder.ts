import AABB3D from '../AABB3d';
import IAABBShape from '../IAABBShape';
import Vector3 from '../Vector3';

export default class Cylinder implements IAABBShape {
  private radiusSquared: number;

  /**
   * @param referencePoint - The center point of face of the cylinder
   * @param radius - the radius of the face of the cylinder
   * @param depth - the depth of the cylinder
   */
  constructor(private referencePoint: Vector3, private radius: number, private depth: number) {
    this.radiusSquared = radius * radius;
  }

  /**
   * @returns The bounding box fully containing the cylinder
   */
  public GetAABB(): AABB3D {
    const minX = this.referencePoint.X - this.radius;
    const maxX = this.referencePoint.X + this.radius;
    const minY = this.referencePoint.Y - this.radius;
    const maxY = this.referencePoint.Y + this.radius;
    const minZ = this.referencePoint.Z - this.depth;

    return new AABB3D(minX, minY, minZ, maxX, maxY, this.referencePoint.Z);
  }

  /**
   * Check if a point is contained within the cylinder
   *
   * @param point - the point to check collisions with
   *
   * @returns `true` if the point is contained, `false` otherwise
   */
  public ContainsPoint(point: Vector3): boolean {
    if (point.Z > this.referencePoint.Z || point.Z < this.referencePoint.Z - this.depth) {
      return false;
    }

    const distSquared = Math.pow(point.X - this.referencePoint.X, 2) + Math.pow(point.Y - this.referencePoint.Y, 2);
    return distSquared < this.radiusSquared;
  }

  /**
   * @returns the center of the face of the cylinder
   */
  public get ReferencePoint(): Vector3 {
    return this.referencePoint;
  }
  /**
   * @returns the radius of the face of the cylinder
   */
  public get Radius(): number {
    return this.radius;
  }
  public get Depth(): number {
    return this.depth;
  }
}
