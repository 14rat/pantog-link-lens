
import React, { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardCard from '@/components/DashboardCard';
import { BarChart3, Link, Link2, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AreaChart, Card } from '@tremor/react';

// Mock chart data
const chartdata = [
  {
    date: "Jan",
    "Cliques": 34,
  },
  {
    date: "Fev",
    "Cliques": 25,
  },
  {
    date: "Mar",
    "Cliques": 43,
  },
  {
    date: "Abr",
    "Cliques": 68,
  },
  {
    date: "Mai",
    "Cliques": 50,
  },
  {
    date: "Jun",
    "Cliques": 82,
  },
  {
    date: "Jul",
    "Cliques": 95,
  },
];

// Mock recent links
const recentLinks = [
  { id: 1, original: 'https://example.com/very-long-path-to-some-resource', short: 'pantog.io/ex4mp', clicks: 243, date: '1 dia atrás' },
  { id: 2, original: 'https://anotherexample.com/blog/10-ways-to-improve', short: 'pantog.io/impr0', clicks: 187, date: '2 dias atrás' },
  { id: 3, original: 'https://website.com/products/specific-product-details', short: 'pantog.io/pr0du', clicks: 92, date: '5 dias atrás' },
];

const Dashboard = () => {
  const [newUrl, setNewUrl] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check sidebar state from localStorage and listen for window resizes
  useEffect(() => {
    const checkSidebarState = () => {
      const savedState = localStorage.getItem('sidebar-collapsed');
      setSidebarCollapsed(savedState === 'true');
    };

    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial checks
    checkSidebarState();
    checkDeviceSize();
    
    // Set up event listeners
    window.addEventListener('storage', checkSidebarState);
    window.addEventListener('sidebarStateChanged', checkSidebarState);
    window.addEventListener('resize', checkDeviceSize);
    
    return () => {
      window.removeEventListener('storage', checkSidebarState);
      window.removeEventListener('sidebarStateChanged', checkSidebarState);
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);
  
  const handleCreateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUrl) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }
    
    setIsCreating(true);
    
    // Mock API call
    setTimeout(() => {
      toast.success('URL encurtada criada com sucesso!');
      setNewUrl('');
      setIsCreating(false);
    }, 1000);
  };
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success('URL copiada para a área de transferência!');
  };
  
  return (
    <div className="min-h-screen bg-pantog-black">
      <DashboardSidebar />
      
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } p-4 md:p-6 lg:p-8 pt-6`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            
            <div className="flex gap-2 items-center">
              <Button 
                size="sm" 
                className="bg-pantog-green text-pantog-black hover:bg-pantog-green-dark"
              >
                <Plus size={16} className="mr-1" /> Novo Link
              </Button>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 gap-4 md:gap-6 ${
            sidebarCollapsed 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'md:grid-cols-2 lg:grid-cols-3'
          } mb-8`}>
            <DashboardCard title="Total de Links" icon={<Link2 />}>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-white">12</p>
                <span className="text-sm text-pantog-green ml-2">+3 este mês</span>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Cliques Totais" icon={<BarChart3 />}>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-white">1,243</p>
                <span className="text-sm text-pantog-green ml-2">
                  <span className="flex items-center">
                    +18% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
                  </span>
                </span>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Taxa de Conversão" icon={<Users />}>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-white">24.8%</p>
                <span className="text-sm text-pantog-green ml-2">+2.3% este mês</span>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Links Ativos" icon={<Link />}>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-white">8</p>
                <span className="text-sm text-gray-400 ml-2">de 12 links</span>
              </div>
            </DashboardCard>
          </div>
          
          <div className={`grid grid-cols-1 gap-4 md:gap-6 ${
            sidebarCollapsed
              ? 'lg:grid-cols-3'
              : 'lg:grid-cols-3'
          } mb-8`}>
            <div className="lg:col-span-2">
              <Card className="bg-pantog-gray border-pantog-gray h-full hover-elevate transition-all">
                <h3 className="text-lg font-medium text-white mb-4">Performance</h3>
                <AreaChart
                  className="h-64"
                  data={chartdata}
                  index="date"
                  categories={["Cliques"]}
                  colors={["green"]}
                  showLegend={false}
                  showXAxis={true}
                  showYAxis={true}
                  showGridLines={false}
                  startEndOnly={true}
                />
              </Card>
            </div>
            
            <div>
              <Card className="bg-pantog-gray border-pantog-gray h-full hover-elevate transition-all">
                <h3 className="text-lg font-medium text-white mb-4">Criar novo link</h3>
                <form onSubmit={handleCreateUrl} className="space-y-4">
                  <Input 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Cole sua URL longa aqui"
                    className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-pantog-green text-pantog-black hover:bg-pantog-green/90 flex items-center justify-center"
                    disabled={isCreating}
                  >
                    <Plus size={18} className="mr-2" />
                    {isCreating ? 'Criando...' : 'Criar Link'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
          
          <div>
            <Card className="bg-pantog-gray border-pantog-gray hover-elevate transition-all">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Links recentes</h3>
                <Button variant="ghost" className="text-pantog-green text-sm hover:bg-pantog-black/30">
                  Ver todos os links
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-pantog-black">
                      <th className="pb-3 text-gray-400 font-normal">URL Original</th>
                      <th className="pb-3 text-gray-400 font-normal">URL Curta</th>
                      <th className="pb-3 text-gray-400 font-normal">Cliques</th>
                      <th className="pb-3 text-gray-400 font-normal">Criado</th>
                      <th className="pb-3 text-gray-400 font-normal">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLinks.map((link) => (
                      <tr key={link.id} className="border-b border-pantog-black hover:bg-pantog-black/10 transition-colors">
                        <td className="py-3 text-white">
                          <div className="truncate max-w-[200px]">{link.original}</div>
                        </td>
                        <td className="py-3 text-pantog-green">{link.short}</td>
                        <td className="py-3 text-white">{link.clicks}</td>
                        <td className="py-3 text-gray-400">{link.date}</td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-pantog-black/30"
                            onClick={() => copyToClipboard(link.short)}
                          >
                            Copiar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
