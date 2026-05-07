import type { HTMLAttributes, ReactNode } from "react";

type Trend = "up" | "down" | "neutral";

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  /** メトリクスのラベル */
  label: string;
  /** メインの数値や文字列 */
  value: string;
  /** 補足テキスト（例: "先月比 +12%"） */
  description?: string;
  /** トレンド方向 */
  trend?: Trend;
  /** ラベル左のアイコン */
  icon?: ReactNode;
  shadow?: "none" | "sm" | "md" | "lg";
};

const shadowStyles: Record<NonNullable<StatCardProps["shadow"]>, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const trendStyles: Record<Trend, { text: string; arrow: string }> = {
  up: { text: "text-emerald-600 dark:text-emerald-400", arrow: "↑" },
  down: { text: "text-red-500 dark:text-red-400", arrow: "↓" },
  neutral: { text: "text-zinc-500 dark:text-zinc-400", arrow: "→" },
};

export function StatCard({
  label,
  value,
  description,
  trend = "neutral",
  icon,
  shadow = "sm",
  className = "",
  ...props
}: StatCardProps) {
  const { text, arrow } = trendStyles[trend];

  return (
    <div
      className={[
        "flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900",
        shadowStyles[shadow],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {/* ラベル行 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        {icon && (
          <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
        )}
      </div>

      {/* 数値 */}
      <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {value}
      </p>

      {/* 補足 */}
      {description && (
        <p className={["text-sm font-medium", text].join(" ")}>
          <span className="mr-1">{arrow}</span>
          {description}
        </p>
      )}
    </div>
  );
}
