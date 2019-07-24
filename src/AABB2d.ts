import Vector2 from './Vector2';

export default class AABB2D {
  public readonly MinX: number;
  public readonly MinY: number;

  public readonly MaxX: number;
  public readonly MaxY: number;

  /**
   * If the min is higher than the max, the bounding box calculations will break
   *
   * @param X1 The X of the first AABB
   * @param Y1 The Y of the first AABB
   * @param X2 The X of the second AABB
   * @param Y2 The Y of the second AABB
   */
  constructor(X1: number, Y1: number, X2: number, Y2: number) {
    this.MinX = Math.min(X1, X2);
    this.MinY = Math.min(Y1, Y2);
    this.MaxX = Math.max(X1, X2);
    this.MaxY = Math.max(Y1, Y2);
  }

  /**
   * Merges the two bounding boxes to create a larger one containing the two
   *
   * @param other - The other bounding box to use for merging
   * @returns The new bounding box containing both bounding boxes
   */
  public Merge(other: AABB2D): AABB2D {
    return new AABB2D(
      Math.min(this.MinX, other.MinX),
      Math.min(this.MinY, other.MinY),
      Math.max(this.MaxX, other.MaxX),
      Math.max(this.MaxY, other.MaxY),
    );
  }

  /**
   * Check if the other bounding box is overlapping with this one
   *
   * @param other - The bounding box to check overlap against
   * @returns `true` if the other bounding box is colling, `false` otherwise
   *
   */
  public Overlaps(other: AABB2D): boolean {
    return (
      this.MaxX > other.MinX &&
      this.MinX < other.MaxX &&
      this.MaxY > other.MinY &&
      this.MinY < other.MaxY
    );
  }

  /**
   * Check if the point is contained within the bounding box
   *
   * @param point - The point to check
   * @returns `true` if the point is inside the bounding box, `false` otherwise
   */
  public ContainsPoint(point: Vector2): boolean {
    return (
      this.MinX < point.X &&
      this.MaxX > point.X &&
      this.MinY < point.Y &&
      this.MaxY > point.Y
    );
  }

  public get Width(): number {
    return this.MaxX - this.MinX;
  }
  public get Height(): number {
    return this.MaxY - this.MinY;
  }
  public get Space(): number {
    return this.Width * this.Height;
  }
}
