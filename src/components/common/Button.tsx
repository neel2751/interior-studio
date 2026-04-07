import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'luxury' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  children: ReactNode;
  href?: string;
  showArrow?: boolean;
  isLoading?: boolean;
}

const Button = ({
  variant = 'default',
  size = 'default',
  children,
  href,
  showArrow,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden',
    'text-[11px] font-semibold tracking-[0.2em] uppercase',
    'rounded-none',
    'transition-all duration-500 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:pointer-events-none disabled:opacity-40 disabled:grayscale',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'cursor-pointer',
    'group'
  );

  const variantClasses = {
    default: cn(
      'bg-[#c9a96e] text-[#0a0a0a] border border-[#c9a96e]',
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_20px_rgba(201,169,110,0.35)]',
      'hover:bg-[#b8915a] hover:border-[#b8915a]',
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(201,169,110,0.5),0_0_0_1px_rgba(201,169,110,0.3)]',
      'hover:-translate-y-[2px]',
      'active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]',
      'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
      'hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out'
    ),

    secondary: cn(
      'bg-transparent text-[#c9a96e] border border-[#c9a96e]',
      'shadow-none',
      'hover:bg-[#c9a96e] hover:text-[#0a0a0a]',
      'hover:shadow-[0_8px_32px_rgba(201,169,110,0.4)]',
      'hover:-translate-y-[2px]',
      'active:translate-y-0',
      'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent',
      'hover:before:translate-x-full before:transition-transform before:duration-700'
    ),

    outline: cn(
      'bg-transparent text-[#c9a96e] border border-[#c9a96e]/60',
      'shadow-[inset_0_0_0_1px_rgba(201,169,110,0.15)]',
      'hover:border-[#c9a96e] hover:bg-[#c9a96e]/8',
      'hover:shadow-[inset_0_0_0_1px_rgba(201,169,110,0.4),0_4px_20px_rgba(201,169,110,0.2)]',
      'hover:-translate-y-[2px]',
      'active:translate-y-0'
    ),

    ghost: cn(
      'bg-transparent text-[#c9a96e] border border-transparent',
      'hover:border-[#c9a96e]/20 hover:bg-[#c9a96e]/5',
      'hover:shadow-[0_2px_12px_rgba(201,169,110,0.15)]',
      'hover:-translate-y-[1px]',
      'active:translate-y-0'
    ),

    link: cn(
      'bg-transparent text-[#c9a96e] border-none shadow-none p-0 h-auto',
      'underline-offset-[3px] decoration-[#c9a96e]/40',
      'hover:decoration-[#c9a96e] hover:underline',
      'tracking-[0.15em]'
    ),

    luxury: cn(
      'bg-[#0d0d0d] text-[#c9a96e]',
      'border border-transparent',
      'shadow-[0_0_0_1px_rgba(201,169,110,0.5),inset_0_1px_0_rgba(201,169,110,0.1)]',
      'hover:shadow-[0_0_0_1px_rgba(201,169,110,1),0_0_24px_rgba(201,169,110,0.3),inset_0_1px_0_rgba(201,169,110,0.2)]',
      'hover:bg-[#111] hover:-translate-y-[2px]',
      'active:translate-y-0',
      'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-[#c9a96e]/10 before:to-transparent',
      'hover:before:translate-x-full before:transition-transform before:duration-700'
    ),

    glass: cn(
      'bg-white/5 text-white border border-white/20',
      'backdrop-blur-sm',
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)]',
      'hover:bg-white/10 hover:border-white/40',
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.3)]',
      'hover:-translate-y-[2px]',
      'active:translate-y-0'
    ),

    destructive: cn(
      'bg-red-700 text-white border border-red-700',
      'shadow-[0_4px_16px_rgba(185,28,28,0.3)]',
      'hover:bg-red-800 hover:shadow-[0_8px_24px_rgba(185,28,28,0.45)]',
      'hover:-translate-y-[2px]',
      'active:translate-y-0'
    ),
  };

  const sizeClasses = {
    sm:      'h-8 px-5 py-2 text-[10px] tracking-[0.18em]',
    default: 'h-10 px-7 py-2.5',
    lg:      'h-12 px-10 py-3 text-[11px] tracking-[0.22em]',
    xl:      'h-14 px-14 py-4 text-[12px] tracking-[0.25em]',
    icon:    'h-10 w-10 p-2 tracking-normal',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {isLoading && <Loader2 className="animate-spin" />}
      <span className="relative z-10">{children}</span>
      {showArrow && !isLoading && (
        <ArrowRight className="relative z-10 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      suppressHydrationWarning
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;