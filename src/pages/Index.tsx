
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">ThriveStack</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Purpose-built analytics for growth-focused teams. 
          Consolidate your analytics stack and get insights that drive revenue.
        </p>
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/pricing')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
          >
            View Pricing
          </Button>
          <div className="text-sm text-slate-500">
            14-day free trial • No credit card required
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
