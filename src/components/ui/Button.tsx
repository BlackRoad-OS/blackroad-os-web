import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode
} from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  href?: string;
  className?: string;
};

type ButtonOnlyProps = BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorOnlyProps = BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonOnlyProps | AnchorOnlyProps;

type AnchorProps = BaseProps & {
  href: string;
};

function buildClassName(variant: ButtonVariant, fullWidth?: boolean, extra?: string) {
  return [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', extra]
    .filter(Boolean)
    .join(' ');
}

export function Button({ children, variant = 'primary', fullWidth, className, href, ...props }: ButtonProps) {
  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');

    if (isExternal) {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a href={href} className={buildClassName(variant, fullWidth, className)} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={buildClassName(variant, fullWidth, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buildClassName(variant, fullWidth, className)} {...props}>
      {children}
    </button>
  );
}

export function AnchorButton({
  children,
  variant = 'primary',
  fullWidth,
  className,
  href,
  ...props
}: AnchorProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={buildClassName(variant, fullWidth, className)} {...props}>
      {children}
    </a>
  );
}
