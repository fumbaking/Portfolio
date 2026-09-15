/**
 * @component  IconTile
 * @spec       design.md § C-21b (Icon Tile)
 * @tokens     T-01.ink-600/line/copper-400/a-copper-10/a-copper-20, T-04.r-md
 * @motion     scale on parent hover
 */

import { Icon } from "./Icon";
import type { IconName } from "@/types";

export function IconTile({ name }: { name: IconName }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-md border border-line bg-ink-600 text-copper-400 transition-all duration-fast ease-out-spec group-hover:scale-105 group-hover:border-a-copper-20 group-hover:bg-a-copper-10"
      aria-hidden="true"
    >
      <Icon name={name} size={18} />
    </span>
  );
}
