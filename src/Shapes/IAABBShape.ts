import { Vector3 } from '.';
import AABB from '../AABB';

export default interface IAABBShape {
  GetAABB(): AABB;
  ContainsPoint(point: Vector3): boolean;
}
