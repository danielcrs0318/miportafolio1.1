import type { PropsWithChildren } from 'react';

// The reference animates the application window; its contents stay stable.
export function Screen({ children, className }: PropsWithChildren<{ className: string }>) {
  return <section className={className}>{children}</section>;
}

export function ScreenBody({ children, className }: PropsWithChildren<{ className: string }>) {
  return <div className={className}>{children}</div>;
}
