import React from "react";

export function headingPrimary({ children, className, handler }) {
  return (
    <h1
      onClick={handler}
      className={`text-6xl md:text-7xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8 ${className}`}
    >
      {children}
    </h1>
  );
}

export function headingSecondary({ children, className, handler }) {
  return (
    <h2
      onClick={handler}
      className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:pr-8 ${className}`}
    >
      {children}
    </h2>
  );
}

export function headingTertiary({ children, className, handler }) {
  return (
    <h3
      onClick={handler}
      className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:pr-8 ${className}`}
    >
      {children}
    </h3>
  );
}

export function headingQuaternary({ children, className, handler }) {
  return (
    <h4
      onClick={handler}
      className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:pr-8 ${className}`}
    >
      {children}
    </h4>
  );
}

export function headingQuinary({ children, className, handler }) {
  return (
    <h5
      onClick={handler}
      className={`text-lg md:text-xl lg:text-2xl font-bold tracking-tighter leading-tight md:pr-8 ${className}`}
    >
      {children}
    </h5>
  );
}

export function paragraph({ children, className, handler }) {
  return (
    <p
      onClick={handler}
      className={`text-md sm:text-lg leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export function mediumParagraph({ children, className, handler }) {
  return (
    <p
      onClick={handler}
      className={`text-sm sm:text-md leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export const anchor = React.forwardRef(
  ({ onClick, href, children, className, outerLink, blue }, ref) => {
    return (
      <a
        target={outerLink ? "_blank" : null}
        rel={outerLink ? "noopener noreferrer" : null}
        href={href}
        onClick={onClick}
        ref={ref}
        className={`${
          blue
            ? "text-blue-500 hover:text-blue-600 underline cursor-pointer"
            : ""
        } ${className}`}
      >
        {children}
      </a>
    );
  }
);
