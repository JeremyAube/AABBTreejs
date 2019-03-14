import AABB from '../src/AABB';
import IAABBShape from '../src/IAABBShape';

export default class Shape implements IAABBShape {
  constructor(
    private minX: number,
    private minY: number,
    private minZ: number,
    private maxX: number,
    private maxY: number,
    private maxZ: number
  ) {}

  public GetAABB(): AABB {
    return new AABB(this.minX, this.minY, this.minZ, this.maxX, this.maxY, this.maxZ);
  }
}
