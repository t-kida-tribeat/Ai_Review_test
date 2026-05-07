import type { HTMLAttributes } from "react";

// ---------------------------------------------------------------------------
// Card (container)
// ---------------------------------------------------------------------------
type CardVariant = "default" | "info" | "success" | "warning" | "danger";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** シャドウの強さ */
  shadow?: "none" | "sm" | "md" | "lg";
  /** カラーバリアント */
  variant?: CardVariant;
};

const shadowStyles: Record<NonNullable<CardProps["shadow"]>, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const variantStyles: Record<CardVariant, string> = {
  default:
    "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
  info:
    "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40",
  success:
    "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
  warning:
    "border-amber-200 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40",
  danger:
    "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
};

export function Card({
  shadow = "md",
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border",
        variantStyles[variant],
        shadowStyles[shadow],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardHeader
// ---------------------------------------------------------------------------
type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({
  className = "",
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={[
        "flex flex-col gap-1 border-b border-zinc-200 px-6 py-4 dark:border-zinc-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardTitle
// ---------------------------------------------------------------------------
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({
  className = "",
  children,
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={[
        "text-lg font-semibold leading-none text-zinc-900 dark:text-zinc-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// CardDescription
// ---------------------------------------------------------------------------
type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className = "",
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={[
        "text-sm text-zinc-500 dark:text-zinc-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// CardBody
// ---------------------------------------------------------------------------
type CardBodyProps = HTMLAttributes<HTMLDivElement>;

export function CardBody({
  className = "",
  children,
  ...props
}: CardBodyProps) {
  return (
    <div
      className={["px-6 py-4", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardFooter
// ---------------------------------------------------------------------------
type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({
  className = "",
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={[
        "flex items-center border-t border-zinc-200 px-6 py-4 dark:border-zinc-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
