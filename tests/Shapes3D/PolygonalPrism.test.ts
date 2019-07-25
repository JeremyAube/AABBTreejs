import PolygonalPrism from '../../src/3dShapes/PolygonalPrism';
import Vector3 from '../../src/Vector3';

describe('Polygonal Prism Shape', () => {
  const points = [
    new Vector3(0, 0, 0),
    new Vector3(1, 1, 0),
    new Vector3(2, 0, 0),
    new Vector3(2, 2, 0),
    new Vector3(1, 3, 0),
    new Vector3(0, 2, 0)
  ];
  const polygon = new PolygonalPrism(points, 1);

  it('should detect the point inside the shape v1', () => {
    const point = new Vector3(1.5, 1, -0.5);
    const isContained = polygon.ContainsPoint(point);
    expect(isContained).toBe(true);
  });

  it('should detect the point inside the shape v2', () => {
    const point = new Vector3(1, 2, -0.5);
    const isContained = polygon.ContainsPoint(point);
    expect(isContained).toBe(true);
  });

  it("should't detect the point inside the shape v1", () => {
    const point = new Vector3(-1, 2, -0.5);
    const isContaied = polygon.ContainsPoint(point);
    expect(isContaied).toBe(false);
  });

  it("should't detect the point inside the shape v2", () => {
    const point = new Vector3(1, 0.5, -0.5);
    const isContaied = polygon.ContainsPoint(point);
    expect(isContaied).toBe(false);
  });
});
