"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning";
type Size = "sm" | "md" | "lg";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** アイコン要素 */
  icon: ReactNode;
  /** スクリーンリーダー向けラベル（必須） */
  label: string;
  variant?: Variant;
  size?: Size;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600",
  outline:
    "border border-zinc-900 text-zinc-900 hover:bg-zinc-100 dark:border-white dark:text-white dark:hover:bg-zinc-800",
  ghost:
    "text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
  warning:
    "bg-amber-400 text-amber-950 hover:bg-amber-500 dark:bg-amber-400 dark:hover:bg-amber-500",
};

const sizeStyles: Record<Size, string> = {
  sm: "size-8 text-sm",
  md: "size-10 text-base",
  lg: "size-12 text-lg",
};

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  type = "button",
  className = "",
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}
