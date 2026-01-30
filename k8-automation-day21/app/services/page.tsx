// Server Component - fetches services data
import ServicesList from '@/components/ServicesList';
import SearchAndFilter from '@/components/SearchAndFilter';

// Service type definition
export type Service = {
  id: number;
  title: string;
  description: string;
  category: 'All' | 'AI Services' | 'Workflow';
  isPopular?: boolean;
};

// Server-side data fetch
async function getServices(): Promise<Service[]> {
  // In production, this would be an API call
  return [
    {
      id: 1,
      title: 'Workflow Automation',
      description: 'Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.',
      category: 'Workflow',
      isPopular: true,
    },
    {
      id: 2,
      title: 'System Integration',
      description: 'Connect your tools and platforms seamlessly with custom integrations and API orchestration.',
      category: 'All',
    },
    {
      id: 3,
      title: 'AI Automation',
      description: 'Leverage AI to automate complex decision-making processes.',
      category: 'AI Services',
    },
    {
      id: 4,
      title: 'Automation Consulting',
      description: 'Strategic guidance to identify automation opportunities and optimize workflows.',
      category: 'All',
    },
    {
      id: 5,
      title: 'AI-Powered Analytics',
      description: 'Transform data into actionable insights with AI-driven analytics and reporting.',
      category: 'AI Services',
    },
    {
      id: 6,
      title: 'Process Optimization',
      description: 'Streamline your business processes with intelligent automation strategies.',
      category: 'Workflow',
    },
    {
      id: 7,
      title: 'Smart Document Processing',
      description: 'Automate document handling with AI-powered extraction and classification.',
      category: 'AI Services',
    },
    {
      id: 8,
      title: 'Custom Workflow Development',
      description: 'Build tailored automation solutions designed specifically for your business needs.',
      category: 'Workflow',
    },
  ];
}

export default async function ServicesPage() {
  // Server-side fetch - data ready before page loads
  const services = await getServices();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold">K8</div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/services" className="text-white font-medium">Services</a>
              <a href="/success" className="text-gray-300 hover:text-white transition-colors">Success</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
            <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-16 text-center">
        <h1 className="text-5xl font-bold mb-8">Our Automation Services</h1>
        
        {/* Client Component for search and filter */}
        <SearchAndFilter />
      </div>

      {/* Services Grid - Client Component handles interactivity */}
      <ServicesList initialServices={services} />
    </div>
  );
}
