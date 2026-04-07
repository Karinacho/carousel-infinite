import { useMemo } from "react";
import InfiniteCarousel from "../features/infiniteCarousel/pages/InfiniteCarousel";
import { buildItems } from "../features/infiniteCarousel/libs/utils";
/** Demo: 1200 virtual items; only a small window of DOM nodes is mounted. */
const DEMO_COUNT = 1200;

export default function App() {
  const items = useMemo(() => buildItems(DEMO_COUNT), []);

  return <InfiniteCarousel items={items} />;
}
