import * as React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  className = "",
  children,
  required,
  ...props
}: LabelProps) {
  return (
    <label
      className={`text-xs font-semibold text-foreground flex items-center gap-1 ${className}`}
      {...props}
    >
      <span>{children}</span>
      {required && <span className="text-destructive">*</span>}
    </label>
  );
}
