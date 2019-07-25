import Polygon from '../../src/2dShapes/Polygon';
import Vector2 from '../../src/Vector2';

describe('Polygon Shape (2d)', () => {
    const simplePolygon = new Polygon([
        new Vector2(0, 0),
        new Vector2(2, 0),
        new Vector2(2, 2),
        new Vector2(0, 2)
    ]);

    const complexPolygon = new Polygon([
        new Vector2(0, 0),
        new Vector2(1, 1),
        new Vector2(4.3, 1),
        new Vector2(7, 3),
        new Vector2(8, 0),
        new Vector2(3, 0.5)
    ])

    it('Should detect the point inside of the simple polygon v1', () => {
        const point = new Vector2(0.1, 0.1);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point inside of the simple polygon v2', () => {
        const point = new Vector2(1, 1);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point inside of the simple polygon v3', () => {
        const point = new Vector2(1.9, 1.9);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point inside of the simple polygon v4', () => {
        const point = new Vector2(0.1, 1.9);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })

    it('Should detect the point outside of the simple polygon v1', () => {
        const point = new Vector2(2.1, 2);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the simple polygon v2', () => {
        const point = new Vector2(2.1, 1.9);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the simple polygon v3', () => {
        const point = new Vector2(-1, 1.5);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the simple polygon v4', () => {
        const point = new Vector2(1, -1);
        const contained = simplePolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })

    it('Should detect the point inside of the complex polygon v1', () => {
        const point = new Vector2(2, 0.75);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point inside of the complex polygon v2', () => {
        const point = new Vector2(6, 1);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point inside of the complex polygon v3', () => {
        const point = new Vector2(6.5, 2.25);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(true);
    })
    it('Should detect the point outside of the complex polygon v1', () => {
        const point = new Vector2(0,1);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the complex polygon v2', () => {
        const point = new Vector2(3.5, 1.75);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the complex polygon v3', () => {
        const point = new Vector2(4, 0);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
    it('Should detect the point outside of the complex polygon v4', () => {
        const point = new Vector2(9, 1.5);
        const contained = complexPolygon.ContainsPoint(point);
        expect(contained).toBe(false);
    })
})