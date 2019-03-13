import AABB from '../src/AABB';

describe('Axis Alined Bounding Box class', () => {
  test('Should not collide with other AABBs', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);

    const leftAabb = new AABB(2, 0, 0, 3, 1, 1);
    expect(aabb.Overlaps(leftAabb)).toBe(false);

    const rightAabb = new AABB(-2, 0, 0, -1, 1, 0);
    expect(aabb.Overlaps(rightAabb)).toBe(false);
  });

  test('Should collide with other AABBs', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);

    const leftAabb = new AABB(0.5, 0.5, 0.5, 1.5, 1.5, 1.5);
    expect(aabb.Overlaps(leftAabb)).toBe(true);
  });
});
