import { OnboardingModal } from '@/components/OnboardingModal';

const OnboardingTest = () => {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingModal 
        open={true} 
        userId="test-user-id" 
        userEmail="test@example.com" 
      />
    </div>
  );
};

export default OnboardingTest;
