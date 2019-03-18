import Cuboid from '../../src/Shapes/Cuboid';
import Vector3 from '../../src/Shapes/Vector3';

describe('Cuboid Shape', () => {
  const cuboid = new Cuboid(new Vector3(0, 0, 0), new Vector3(1, 1, 1));

  it('should detect point inside v1', () => {
    const point = new Vector3(0.5, 0.5, -0.5);
    const inside = cuboid.ContainsPoint(point);
    expect(inside).toBe(true);
  });

  it('should detect point inside v2', () => {
    const point = new Vector3(1, 1, -1);
    const inside = cuboid.ContainsPoint(point);
    expect(inside).toBe(true);
  });

  it('should detect point outside v1', () => {
    const point = new Vector3(-1, 1, 0.5);
    const inside = cuboid.ContainsPoint(point);
    expect(inside).toBe(false);
  });

  it('should detect point outside v2', () => {
    const point = new Vector3(1, -1, 0.5);
    const inside = cuboid.ContainsPoint(point);
    expect(inside).toBe(false);
  });

  it('should detect point ouside v3', () => {
    const point = new Vector3(0.5, 0.5, -2);
    const inside = cuboid.ContainsPoint(point);
    expect(inside).toBe(false);
  });
});
