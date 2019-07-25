import Vector3 from './Vector3';
import Vector2 from 'src/Vector2';
import AABB from './AABB';

export default interface IAABBShape {
  GetAABB(): AABB;
  ContainsPoint(point: Vector3 | Vector2): boolean;
}
