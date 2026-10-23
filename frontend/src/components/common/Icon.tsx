import type { CSSProperties } from "react";
type IconName =
  | "arrow"
  | "pin"
  | "table"
  | "calendar"
  | "users"
  | "clock"
  | "search"
  | "chevron"
  | "check"
  | "mail";
const paths: Record<IconName, string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  pin: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  table: "M3 5h18v12H3ZM12 5v12M3 11h18M5 17v4M19 17v4",
  calendar: "M4 5h16v16H4ZM8 3v4M16 3v4M4 10h16M8 14h2M14 14h2",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M15 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M5 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
  clock: "M12 8v5l3 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0",
  search: "M21 21l-5-5M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0",
  chevron: "M8 5l7 7-7 7",
  check: "M5 12l4 4L19 6",
  mail: "M3 5h18v14H3ZM3 6l9 7 9-7",
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function PaddleMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="m15 26-8 10"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse
        cx="21"
        cy="16"
        rx="11"
        ry="15"
        transform="rotate(38 21 16)"
        fill="currentColor"
      />
      <circle cx="35" cy="5" r="4" fill="white" />
    </svg>
  );
}
