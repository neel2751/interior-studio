import { PROCESS_STEPS } from '@/lib/constants';
import StepCard from './StepCard';
import SectionHeading from '@/components/common/SectionHeading';

const ProcessTimeline = () => {
  return (
    <div className="space-y-12">
      <SectionHeading
        title="Our Design Process"
        subtitle="A structured approach to bring your vision to life, from concept to completion"
        center
      />

      <div className="space-y-12">
        {PROCESS_STEPS.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            isLast={index === PROCESS_STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
