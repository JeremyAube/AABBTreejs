import Vector3 from './Vector3';
import Vector2 from './Vector2';

export default class AABB {
  public readonly lowPoint: Vector3 | Vector2;
  public readonly highPoint: Vector3 | Vector2;

  /**
   * @remarks
   * If the min is higher than the max, the bounding box calculations will break
   *
   * @param minX the minimum value in the X axis
   * @param minY the minimum value in the Y axis
   * @param minZ the minimum value in the Z axis
   * @param maxX the maximum value in the X axis
   * @param maxY the maximum value in the Y axis
   * @param maxZ the maximum value in the Z axis
   */
  constructor(minX: number, minY: number, minZ: number | null, maxX: number, maxY: number, maxZ: number | null) {
    const MinX = Math.min(minX, maxX);
    const MaxX = Math.max(minX, maxX);

    const MinY = Math.min(minY, maxY);
    const MaxY = Math.max(minY, maxY);

    if (minZ !== null && maxZ !== null) {
      const MinZ = Math.min(minZ, maxZ);
      const MaxZ = Math.max(minZ, maxZ);

      this.lowPoint = new Vector3(MinX, MinY, MinZ);
      this.highPoint = new Vector3(MaxX, MaxY, MaxZ);
    } else {
      this.lowPoint = new Vector2(MinX, MinY);
      this.highPoint = new Vector2(MaxX, MaxY);
    }
  }

  /**
   * Merges the two bounding boxes to create a larger one containing the two
   *
   * @param other - The other bounding box to use for merging
   * @returns The new bounding box containing both bounding boxes
   */
  public Merge(other: AABB): AABB {
    return new AABB(
      Math.min(this.lowPoint.X, other.lowPoint.X),
      Math.min(this.lowPoint.Y, other.lowPoint.Y),
      this.is3D ? Math.min((<Vector3>this.lowPoint).Z, (<Vector3>other.lowPoint).Z) : null,
      Math.max(this.highPoint.X, other.highPoint.X),
      Math.max(this.highPoint.Y, other.highPoint.Y),
      this.is3D ? Math.min((<Vector3>this.highPoint).Z, (<Vector3>other.highPoint).Z) : null
    );
  }

  /**
   * Check if the other bounding box is overlapping with this one
   *
   * @param other - The bounding box to check overlap against
   * @returns `true` if the other bounding box is colling, `false` otherwise
   */
  public Overlaps(other: AABB): boolean {
    if (this.is3D) {
      return (
        this.highPoint.X > other.lowPoint.X &&
        this.lowPoint.X < other.highPoint.X &&
        this.highPoint.Y > other.lowPoint.Y &&
        this.lowPoint.Y < other.highPoint.Y &&
        (<Vector3>this.highPoint).Z > (<Vector3>other.lowPoint).Z &&
        (<Vector3>this.lowPoint).Z < (<Vector3>other.highPoint).Z
      );
    } else {
      return (
        this.highPoint.X > other.lowPoint.X &&
        this.lowPoint.X < other.highPoint.X &&
        this.highPoint.Y > other.lowPoint.Y &&
        this.lowPoint.Y < other.highPoint.Y
      );
    }
  }

  /**
   * Check if the point is contained within the bounding box
   *
   * @param point - The point to check
   * @returns `true` if the point is inside the bounding box, `false` otherwise
   */
  public ContainsPoint(point: Vector3 | Vector2): boolean {
    if (this.is3D) {
      return this.lowPoint.X < point.X &&
        this.highPoint.X > point.X &&
        this.lowPoint.Y < point.Y &&
        this.highPoint.Y > point.Y &&
        point instanceof Vector3
        ? (<Vector3>this.lowPoint).Z < point.Z
        : true && point instanceof Vector3
        ? (<Vector3>this.highPoint).Z > point.Z
        : true;
    } else {
      return (
        this.lowPoint.X < point.X &&
        this.highPoint.X > point.X &&
        this.lowPoint.Y < point.Y &&
        this.highPoint.Y > point.Y
      );
    }
  }

  public get is3D(): boolean {
    return this.lowPoint instanceof Vector3;
  }
  public get Width(): number {
    return this.highPoint.X - this.lowPoint.X;
  }
  public get Height(): number {
    return this.highPoint.Y - this.lowPoint.Y;
  }
  public get Depth(): number {
    if (!this.is3D) {
      return 0;
    }
    return (<Vector3>this.highPoint).Z - (<Vector3>this.lowPoint).Z;
  }

  public get Space(): number {
    const area = this.Width * this.Height;
    return this.is3D ? area * this.Depth : area;
  }
}
