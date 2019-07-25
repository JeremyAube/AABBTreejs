import Vector2 from '../Vector2';
import AABB from '../AABB';
import IAABBShape from '../IAABBShape';

export default class Circle implements IAABBShape {
    private AABB: AABB;
    
    constructor(
        private center: Vector2,
        private radius: number
    ) {
        const minX = this.center.X - this.radius;
        const minY = this.center.Y - this.radius;
        const maxX = this.center.X + this.radius;
        const maxY = this.center.Y + this.radius;
        
        this.AABB = new AABB(minX, minY, null, maxX, maxY, null);
    }
    
    public GetAABB(): AABB {
        return this.AABB;
    }

    public ContainsPoint(point: Vector2): boolean {
        const distSquared = Math.pow(point.X - this.center.X, 2) + Math.pow(point.Y - this.center.Y, 2);
        return distSquared < Math.pow(this.radius, 2);
    }
}