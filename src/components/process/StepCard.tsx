import { CheckCircle, Image as ImageIcon } from 'lucide-react';

interface StepCardProps {
  step: {
    id: string;
    title: string;
    description: string;
    image?: string; // Optional image for the step
  };
  index: number;
  isLast: boolean;
}

const StepCard = ({ step, index, isLast }: StepCardProps) => {
  return (
    <div className="relative">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-lg">
            {index + 1}
          </div>
        </div>
        
        <div className="flex-grow space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {step.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>

          {step.image && (
            <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Key deliverable completed</span>
            </div>
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-6 w-0.5 h-24 bg-gray-300 -ml-0.5"></div>
      )}
    </div>
  );
};

export default StepCard;
