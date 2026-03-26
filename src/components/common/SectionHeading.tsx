interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, center = false, className = '' }: SectionHeadingProps) => {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
