import AABB from '../AABB';
import IAABBShape from './IAABBShape';
import Vector3 from './Vector3';

export default class PolygonalPrism implements IAABBShape {
  constructor(private shape: Vector3[], private depth: number) {
    if (shape.length < 2) {
      throw new Error("The polygon can't be a line or a point");
    }
  }

  public GetAABB(): AABB {
    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;

    this.shape.forEach(point => {
      if (point.X > maxX) {
        maxX = point.X;
      }
      if (point.X < minX) {
        minX = point.X;
      }

      if (point.Y > maxY) {
        maxY = point.Y;
      }
      if (point.Y < minY) {
        minY = point.Y;
      }
    });

    return new AABB(minX, minY, this.shape[0].Z, maxX, maxY, this.shape[0].Z + this.depth);
  }

  /**
   * Check if the point is inside the polygon
   *
   * **Warning**: If the point is *precisly* on a bound it might yeild **unaccurate result**
   */
  public ContainsPoint(rayStart: Vector3): boolean {
    // This code is a refactor from
    // https://rosettacode.org/wiki/Ray-casting_algorithm#JavaScript
    if (rayStart.Z > this.shape[0].Z || rayStart.Z < this.shape[0].Z - this.depth) {
      return false;
    }

    let hitCount = 0;
    for (let i = 0; i < this.shape.length; i++) {
      const point1 = this.shape[i];
      const point2 = this.shape[(i + 1) % this.shape.length];
      if (this.checkForHit(point1, point2, rayStart)) {
        hitCount++;
      }
    }
    return hitCount > 0 && hitCount % 2 === 1;
  }

  /**
   * Check if the ray hits the bound
   */
  private checkForHit(point1: Vector3, point2: Vector3, rayStart: Vector3): boolean {
    if (point1.Y <= point2.Y) {
      if (rayStart.Y <= point1.Y || rayStart.Y > point2.Y || (rayStart.X >= point1.X && rayStart.X >= point2.X)) {
        return false;
      } else if (rayStart.X < point1.X && rayStart.X < point2.X) {
        return true;
      } else {
        return (rayStart.Y - point1.Y) / (rayStart.X - point1.X) > (point2.Y - point1.Y) / (point2.X - point1.X);
      }
    } else {
      return this.checkForHit(point2, point1, rayStart);
    }
  }

  public get Shape(): Vector3[] {
    return this.shape;
  }
  public get Depth(): number {
    return this.depth;
  }
}
