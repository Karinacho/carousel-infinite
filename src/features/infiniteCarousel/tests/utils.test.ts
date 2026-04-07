import { buildItems } from "../libs/utils";

describe("buildItems", () => {
  it("returns requested number of items", () => {
    expect(buildItems(0)).toEqual([]);
    expect(buildItems(3)).toHaveLength(3);
  });

  it("builds stable key/src/alt format", () => {
    const items = buildItems(2);

    expect(items[0]).toMatchObject({
      key: "img-0",
      alt: "Photo 1",
    });
    expect(items[1]).toMatchObject({
      key: "img-1",
      alt: "Photo 2",
    });

    expect(items[0].src).toContain("https://picsum.photos/seed/car-0/");
    expect(items[1].src).toContain("https://picsum.photos/seed/car-1/");
  });

  it("produces unique keys", () => {
    const items = buildItems(20);
    const keys = items.map((i) => i.key);
    expect(new Set(keys).size).toBe(items.length);
  });
});
