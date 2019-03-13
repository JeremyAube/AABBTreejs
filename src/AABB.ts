export default class AABB {
  public readonly MinX: number;
  public readonly MinY: number;
  public readonly MinZ: number;

  public readonly MaxX: number;
  public readonly MaxY: number;
  public readonly MaxZ: number;

  constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number) {
    this.MinX = minX;
    this.MinY = minY;
    this.MinZ = minZ;

    this.MaxX = maxX;
    this.MaxY = maxY;
    this.MaxZ = maxZ;
  }

  /**
   * Merges two AABBs to make a bigger one containing both
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
   * Check if another AABB is contained within this one
   */
  public Contains(other: AABB): boolean {
    return (
      this.MinX <= other.MinX &&
      this.MaxX >= other.MaxX &&
      this.MinY <= other.MinY &&
      this.MaxY >= other.MaxY &&
      this.MinZ <= other.MinZ &&
      this.MaxZ >= other.MaxZ
    );
  }

  /**
   * Check if another AABB is overlapping
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

  public get Width(): number {
    return this.MaxX - this.MinX;
  }
  public get Height(): number {
    return this.MaxY - this.MinY;
  }
  public get Depth(): number {
    return this.MaxZ - this.MinZ;
  }
}
