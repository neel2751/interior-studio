import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';

interface FormSuccessProps {
  onReset?: () => void;
}

const FormSuccess = ({ onReset }: FormSuccessProps) => {
  return (
    <div className="text-center space-y-8 py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-900">
          Thank You!
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Your consultation request has been received successfully. We&#39;ll get back to you within 24 hours to discuss your project requirements and bring your vision to life.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
          <h4 className="font-semibold text-gray-900 mb-4">What happens next?</h4>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Initial Review</p>
                <p className="text-sm text-gray-600">Our team will review your project requirements</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Personal Response</p>
                <p className="text-sm text-gray-600">We&#39;ll contact you within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Consultation Call</p>
                <p className="text-sm text-gray-600">Schedule a detailed discussion about your project</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/projects" variant="secondary" size="lg">
            View Our Work
            <ArrowRight size={16} className="ml-2" />
          </Button>
          
          {onReset && (
            <button
              onClick={onReset}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              Send another message
            </button>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        While you wait, feel free to explore our portfolio or learn more about our services.
      </div>
    </div>
  );
};

export default FormSuccess;
