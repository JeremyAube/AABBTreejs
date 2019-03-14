import AABB from '../src/AABB';

describe('Axis Alined Bounding Box class', () => {
  test('Should not collide with left AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);

    const leftAabb = new AABB(2, 0, 0, 3, 1, 1);
    expect(aabb.Overlaps(leftAabb)).toBe(false);
  });

  test('Should not collide with right AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);

    const rightAabb = new AABB(-2, 0, 0, -1, 1, 0);
    expect(aabb.Overlaps(rightAabb)).toBe(false);
  });

  test('Should not collide with top AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const topAabb = new AABB(0, -2, 0, 1, -1, 1);

    expect(aabb.Overlaps(topAabb)).toBe(false);
  });

  test('Should not collide with bottom AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const bottomAabb = new AABB(0, 2, 0, 1, 3, 1);

    expect(aabb.Overlaps(bottomAabb)).toBe(false);
  });

  test('Should not collide with far AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const farAabb = new AABB(0, 0, 2, 1, 1, 3);

    expect(aabb.Overlaps(farAabb)).toBe(false);
  });

  test('Should not collide with close AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const closeAabb = new AABB(0, 0, -1, 1, 1, -2);

    expect(aabb.Overlaps(closeAabb)).toBe(false);
  });

  test('Should collide with bottom-right AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);

    const leftAabb = new AABB(0.5, 0.5, 0.5, 1.5, 1.5, 1.5);
    expect(aabb.Overlaps(leftAabb)).toBe(true);
  });

  test('Should collide with top-left AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const rightAabb = new AABB(-0.5, -0.5, -0.5, 0.5, 0.5, 0.5);

    expect(aabb.Overlaps(rightAabb)).toBe(true);
  });

  test('Should collide with top-right AABB', () => {
    const aabb = new AABB(0, 0, 0, 1, 1, 1);
    const topAabb = new AABB(-0.5, -0.5, 0.5, 0.5, 0.5, 1.5);

    expect(aabb.Overlaps(topAabb)).toBe(true);
  });
});
