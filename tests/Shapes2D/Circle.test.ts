import Circle from '../../src/2dShapes/Circle';
import Vector2 from '../../src/Vector2';

describe('Circle Shape', () => {
    const circle = new Circle(new Vector2(1, 1), 2);
    
    it('Should detect the point inside of the circle v1', () => {
        const point = new Vector2(2, 1);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(true);
    })

    it('Should detect the point inside of the circle v2', () => {
        const point = new Vector2(1, 1);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(true);
    })

    it('Should detect the point inside of the circle v3', () => {
        const point = new Vector2(0.5, 0);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(true);
    })

    it('Should detect the point inside of the circle v4', () => {
        const point = new Vector2(-0.5, -0.2);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(true);
    })

    it('Should detect the point outside of the circle v1', () => {
        const point = new Vector2( -2, 1);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(false);
    })

    it('Should detect the point outside of the circle v2', () => {
        const point = new Vector2(3, 1.99);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(false);
    })

    it (' Should detect the point outside of the circle v3', () => {
        const point = new Vector2(-3, -3);
        const contained = circle.ContainsPoint(point);
        expect(contained).toBe(false);
    })
})