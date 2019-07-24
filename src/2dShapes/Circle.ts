import Vector2 from 'src/Vector2';
import AABB2D from 'src/AABB2d';
import IAABBShape from 'src/IAABBShape';

export default class Circle implements IAABBShape {
    private AABB: AABB2D;
    
    constructor(
        private center: Vector2,
        private radius: number
    ) {
        const minX = this.center.X - this.radius;
        const minY = this.center.Y - this.radius;
        const maxX = this.center.X + this.radius;
        const maxY = this.center.Y + this.radius;
        
        this.AABB = new AABB2D(minX, minY, maxX, maxY);
    }
    
    public GetAABB(): AABB2D {
        return this.AABB;
    }

    public ContainsPoint(point: Vector2): boolean {
        const distSquared = Math.pow(point.X - this.center.X, 2) + Math.pow(point.Y - this.center.Y, 2);
        return distSquared < Math.pow(this.radius, 2);
    }
}