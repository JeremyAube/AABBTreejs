import { Vector3 } from './Shapes';

export default class AABB {
  public readonly MinX: number;
  public readonly MinY: number;
  public readonly MinZ: number;

  public readonly MaxX: number;
  public readonly MaxY: number;
  public readonly MaxZ: number;

  /**
   * @remarks
   * If the min is higher than the max, the bounding box calculations will break
   *
   * @param minX - the minimum value in the X axis
   * @param minY - the minimum value in the Y axis
   * @param minZ - the minimum value in the Z axis
   * @param maxX - the maximum value in the X axis
   * @param maxY - the maximum value in the Y axis
   * @param maxZ - the maximum value in the Z axis
   */
  constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number) {
    this.MinX = minX;
    this.MinY = minY;
    this.MinZ = minZ;

    this.MaxX = maxX;
    this.MaxY = maxY;
    this.MaxZ = maxZ;
  }

  /**
   * Merges the two bounding boxes to create a larger one containing the two
   *
   * @param other - The other bounding box to use for merging
   *
   * @returns The new bounding box containing both bounding boxes
   */
  public Merge(other: AABB): AABB {
    return new AABB(
      Math.min(this.MinX, other.MinX),
      Math.min(this.MinY, other.MinY),
      Math.min(this.MinZ, other.MinZ),
      Math.max(this.MaxX, other.MaxX),
      Math.max(this.MaxY, other.MaxY),
      Math.max(this.MaxZ, other.MaxZ)
    );
  }

  /**
   * Check if the other bounding box is overlapping with this one
   *
   * @param other - The bounding box to check overlap against
   *
   * @returns `true` if the other bounding box is colling, `false` otherwise
   *
   */
  public Overlaps(other: AABB): boolean {
    return (
      this.MaxX > other.MinX &&
      this.MinX < other.MaxX &&
      this.MaxY > other.MinY &&
      this.MinY < other.MaxY &&
      this.MaxZ > other.MinZ &&
      this.MinZ < other.MaxZ
    );
  }

  /**
   * Check if the point is contained within the bounding box
   *
   * @param point - The point to check
   *
   * @returns `true` if the point is inside the bounding box, `false` otherwise
   */
  public ContainsPoint(point: Vector3): boolean {
    return (
      this.MinX < point.X &&
      this.MaxX > point.X &&
      this.MinY < point.Y &&
      this.MaxY > point.Y &&
      this.MinZ < point.Z &&
      this.MaxZ > point.Z
    );
  }

  public get Width(): number {
    return this.MaxX - this.MinX;
  }
  public get Height(): number {
    return this.MaxY - this.MinY;
  }
  public get Depth(): number {
    return this.MaxZ - this.MinZ;
  }
  public get Volume(): number {
    return this.Width * this.Height * this.Depth;
  }
}
