export default class Vector3 {
  constructor(private x: number, private y: number, private z: number) {}

  public get X(): number {
    return this.x;
  }
  public get Y(): number {
    return this.y;
  }
  public get Z(): number {
    return this.z;
  }
}
