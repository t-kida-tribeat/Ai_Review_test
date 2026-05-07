import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

// ---------------------------------------------------------------------------
// MediaCard
// ---------------------------------------------------------------------------
type MediaCardProps = HTMLAttributes<HTMLDivElement> & {
  shadow?: "none" | "sm" | "md" | "lg";
};

const shadowStyles: Record<NonNullable<MediaCardProps["shadow"]>, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export function MediaCard({
  shadow = "md",
  className = "",
  children,
  ...props
}: MediaCardProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
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
// MediaCardImage
// ---------------------------------------------------------------------------
type MediaCardImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** 画像の高さクラス（例: "h-48"） */
  heightClassName?: string;
};

export function MediaCardImage({
  src,
  alt = "",
  heightClassName = "h-48",
  className = "",
  ...props
}: MediaCardImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={[
        "w-full object-cover",
        heightClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// MediaCardBadge — 画像上に重ねるバッジ
// ---------------------------------------------------------------------------
type MediaCardBadgeProps = HTMLAttributes<HTMLSpanElement>;

export function MediaCardBadge({
  className = "",
  children,
  ...props
}: MediaCardBadgeProps) {
  return (
    <span
      className={[
        "absolute top-3 left-3 rounded-full bg-zinc-900/70 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm dark:bg-white/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MediaCardMedia — 画像コンテナ（バッジ配置用に relative を持つ）
// ---------------------------------------------------------------------------
type MediaCardMediaProps = HTMLAttributes<HTMLDivElement>;

export function MediaCardMedia({
  className = "",
  children,
  ...props
}: MediaCardMediaProps) {
  return (
    <div className={["relative", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MediaCardBody
// ---------------------------------------------------------------------------
type MediaCardBodyProps = HTMLAttributes<HTMLDivElement>;

export function MediaCardBody({
  className = "",
  children,
  ...props
}: MediaCardBodyProps) {
  return (
    <div
      className={["px-5 py-4", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MediaCardTitle
// ---------------------------------------------------------------------------
type MediaCardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function MediaCardTitle({
  className = "",
  children,
  ...props
}: MediaCardTitleProps) {
  return (
    <h3
      className={[
        "text-base font-semibold text-zinc-900 dark:text-zinc-50",
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
// MediaCardFooter
// ---------------------------------------------------------------------------
type MediaCardFooterProps = HTMLAttributes<HTMLDivElement> & {
  /** フッター左側に表示するコンテンツ */
  leading?: ReactNode;
};

export function MediaCardFooter({
  leading,
  className = "",
  children,
  ...props
}: MediaCardFooterProps) {
  return (
    <div
      className={[
        "flex items-center justify-between border-t border-zinc-200 px-5 py-3 dark:border-zinc-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {leading && <div className="flex items-center gap-2">{leading}</div>}
      <div className="flex items-center gap-2 ml-auto">{children}</div>
    </div>
  );
}
