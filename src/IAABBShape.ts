import Vector3 from './Vector3';
import AABB3D from './AABB3d';
import Vector2 from 'src/Vector2';
import AABB2D from './AABB2d';

export default interface IAABBShape {
  GetAABB(): AABB3D | AABB2D;
  ContainsPoint(point: Vector3 | Vector2): boolean;
}
