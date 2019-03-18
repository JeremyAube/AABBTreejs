import Cylinder from '../../src/Shapes/Cylinder';
import Vector3 from '../../src/Shapes/Vector3';

describe('Cynlinder Shape', () => {
  const cylinder = new Cylinder(new Vector3(1, 1, 0), 1, 1);

  it('should detect the point inside the cylinder v1', () => {
    const point = new Vector3(1, 1, -0.5);
    const inside = cylinder.ContainsPoint(point);
    expect(inside).toBe(true);
  });

  it('should detect the point inside the cylinder v2', () => {
    const point = new Vector3(1, 1.5, -0.75);
    const inside = cylinder.ContainsPoint(point);
    expect(inside).toBe(true);
  });

  it('should detect the point ouside the cylinder v1', () => {
    const point = new Vector3(0, 0, -0.5);
    const inside = cylinder.ContainsPoint(point);
    expect(inside).toBe(false);
  });

  it('should detect the point outside the cylinder v2', () => {
    const point = new Vector3(-1, 1, -0.25);
    const inside = cylinder.ContainsPoint(point);
    expect(inside).toBe(false);
  });

  it('should detect the point outside the cylinder v3', () => {
    const point = new Vector3(1, 1, -2);
    const inside = cylinder.ContainsPoint(point);
    expect(inside).toBe(false);
  });
});
