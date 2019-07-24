import Vector2 from 'src/Vector2';
import AABB2D from 'src/AABB2d';
import IAABBShape from 'src/IAABBShape';

export default class Polygon implements IAABBShape {
  private AABB: AABB2D;

  constructor(private shape: Vector2[]) {
    if (shape.length < 2) {
      throw new Error('A polygon needs to have more than 2 sides');
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    shape.forEach(point => {
      if (point.X < minX) {
        minX = point.X;
      }
      if (point.X > maxX) {
        maxX = point.X;
      }
      if (point.Y < minY) {
        minY = point.Y;
      }
      if (point.Y > maxY) {
        maxY = point.Y;
      }
    });

    this.AABB = new AABB2D(minX, minY, maxX, maxY);
  }

  public GetAABB(): AABB2D {
    return this.AABB;
  }

  public ContainsPoint(point: Vector2): boolean {
    let hitCount = 0;
    for (let i = 0; i < this.shape.length; i++) {
      const point1 = this.shape[i];
      const point2 = this.shape[(i + 1) % this.shape.length];
      if (this.checkForHit(point1, point2, point)) {
        hitCount++;
      }
    }
    return hitCount > 0 && hitCount % 2 === 1;
  }

  /**
   * Check if the ray hits the bound
   *
   * @param point1 - The begining of the bound
   * @param point2 - The end of the bound
   * @param rayStart - The point to check collisions with
   */
  private checkForHit(point1: Vector2, point2: Vector2, rayStart: Vector2): boolean {
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
}
