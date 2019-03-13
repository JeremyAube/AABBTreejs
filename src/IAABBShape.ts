import AABB from './AABB';

export default interface IAABBShape {
  UUID: string;
  GetAABB(): AABB;
}
