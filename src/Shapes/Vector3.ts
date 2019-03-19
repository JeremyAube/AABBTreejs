/**
 * A reprensentation of a point in 3D space. *Z* and *X* represent the 2D position and *Y* represent the elevation
 */
export default class Vector3 {
  /**
   * @param x - X position
   * @param y - Elevation
   * @param z - Z position
   */
  constructor(private x: number, private y: number, private z: number) {}

  /**
   * X Position
   */
  public get X(): number {
    return this.x;
  }
  /**
   * Elevation
   */
  public get Y(): number {
    return this.y;
  }
  /**
   * Z Position
   */
  public get Z(): number {
    return this.z;
  }
}
