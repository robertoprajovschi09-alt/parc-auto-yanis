import type { ReactNode } from "react";

/*
 * Shared section header: yellow tick + red eyebrow, extrabold title,
 * quiet subtitle. `dark` flips text colors for ink sections.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 ${center ? "justify-center text-center" : ""}`}
    >
      <div className={center ? "mx-auto" : ""}>
        {eyebrow && (
          <p
            className={`flex items-center gap-2 text-[13px] font-extrabold tracking-[0.1em] uppercase ${
              center ? "justify-center" : ""
            } ${dark ? "text-sun" : "text-brand"}`}
          >
            <span className="h-[3px] w-6 rounded-full bg-sun" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={`mt-2.5 text-3xl font-extrabold tracking-tight md:text-4xl ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {sub && (
          <p
            className={`mt-3 max-w-2xl text-base md:text-lg ${dark ? "text-white/70" : "text-graphite"}`}
          >
            {sub}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
