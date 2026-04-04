import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
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
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
  );
  
  const variantClasses = {
    default: cn(
      'bg-[#c9a96e] text-black hover:bg-[#b8995e]',
      'shadow-lg shadow-[#c9a96e]/20 hover:shadow-xl hover:shadow-[#c9a96e]/30',
      'focus-visible:ring-[#c9a96e]'
    ),
    secondary: cn(
      'bg-[#1a1a1a] text-[#c9a96e] border border-[#c9a96e]/30',
      'hover:bg-[#c9a96e] hover:text-black hover:border-[#c9a96e]',
      'focus-visible:ring-[#c9a96e]'
    ),
    outline: cn(
      'border-2 border-[#c9a96e] bg-transparent text-[#c9a96e]',
      'hover:bg-[#c9a96e] hover:text-black',
      'focus-visible:ring-[#c9a96e]'
    ),
    ghost: cn(
      'text-[#c9a96e] hover:bg-[#c9a96e]/10',
      'focus-visible:ring-[#c9a96e]'
    ),
    link: cn(
      'text-[#c9a96e] underline-offset-4 hover:underline',
      'focus-visible:ring-[#c9a96e]'
    ),
    destructive: cn(
      'bg-red-600 text-white hover:bg-red-700',
      'focus-visible:ring-red-600'
    ),
  };

  const sizeClasses = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 px-4 py-2 text-xs',
    lg: 'h-12 px-8 py-3 text-base',
    icon: 'h-11 w-11 p-2',
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
      {children}
      {showArrow && !isLoading && <ArrowRight className="ml-1" />}
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
