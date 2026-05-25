import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type BaseProps = {
  variant?: "primary" | "outlined";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never; external?: never };

type ButtonAsLink = BaseProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href"
  >;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3811F]/60 hover:-translate-y-px";

const variants = {
  primary: "bg-[#F3811F] text-white hover:bg-[#d96f16]",
  outlined: "bg-white/15 text-white border border-white/25 hover:bg-white/25",
};

const sizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-2.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as ComponentPropsWithoutRef<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
