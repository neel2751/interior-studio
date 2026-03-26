interface BadgeProps {
  children: React.ReactNode;
  variant?: 'residential' | 'commercial' | 'featured' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '' 
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
  
  const variantClasses = {
    residential: 'bg-green-100 text-green-800 border border-green-200',
    commercial: 'bg-blue-100 text-blue-800 border border-blue-200',
    featured: 'bg-gray-900 text-white',
    default: 'bg-gray-100 text-gray-800 border border-gray-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
