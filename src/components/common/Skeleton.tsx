interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = ({ 
  className = '', 
  variant = 'text',
  width,
  height,
  lines = 1
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  const variantClasses = {
    text: 'h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const style = {
    width: width || '100%',
    height: height || 'auto'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`${baseClasses} h-4 rounded`}
            style={{
              width: index === lines - 1 ? '70%' : (width || '100%'),
              height: height || 'auto'
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={classes} style={style} />;
};

export default Skeleton;
