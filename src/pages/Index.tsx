
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UrlShortenerForm from '../components/UrlShortenerForm';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';
import { BarChart3, Link2, LineChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pantog-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Encurte. Compartilhe. <span className="text-pantog-green">Analise.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pantog transforma suas URLs longas em links curtos e fornece análises detalhadas 
              sobre o desempenho de cada link compartilhado.
            </p>
          </div>
          
          <div className="mb-16 md:mb-24 animate-fade-in">
            <UrlShortenerForm />
          </div>
          
          {/* How it works section */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-pantog-gray rounded-xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-pantog-green/20 flex items-center justify-center rounded-full mx-auto mb-6">
                  <Link2 className="text-pantog-green" size={32} />
                </div>
                <h3 className="text-xl font-medium mb-3">1. Encurte</h3>
                <p className="text-gray-400">Cole sua URL longa e obtenha um link curto e fácil de compartilhar em segundos.</p>
              </div>
              
              <div className="bg-pantog-gray rounded-xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-pantog-green/20 flex items-center justify-center rounded-full mx-auto mb-6">
                  <Settings className="text-pantog-green" size={32} />
                </div>
                <h3 className="text-xl font-medium mb-3">2. Compartilhe</h3>
                <p className="text-gray-400">Distribua seu link em qualquer plataforma e maximize o alcance do seu conteúdo.</p>
              </div>
              
              <div className="bg-pantog-gray rounded-xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-pantog-green/20 flex items-center justify-center rounded-full mx-auto mb-6">
                  <BarChart3 className="text-pantog-green" size={32} />
                </div>
                <h3 className="text-xl font-medium mb-3">3. Analise</h3>
                <p className="text-gray-400">Acompanhe o desempenho do seu link com métricas detalhadas e insights valiosos.</p>
              </div>
            </div>
          </div>
          
          {/* Features section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Recursos poderosos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={Link2}
                title="Links personalizados"
                description="Crie URLs curtas com slugs personalizados para melhorar o reconhecimento da marca."
              />
              
              <FeatureCard
                icon={BarChart3}
                title="Análises detalhadas"
                description="Obtenha insights sobre quem, quando e onde seus links estão sendo acessados."
              />
              
              <FeatureCard
                icon={LineChart}
                title="Métricas em tempo real"
                description="Acompanhe o desempenho dos seus links em tempo real para tomar decisões mais ágeis."
              />
              
              <FeatureCard
                icon={Settings}
                title="Gerenciamento simples"
                description="Interface intuitiva para gerenciar todos os seus links em um só lugar."
              />
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/signup">
                <Button size="lg" className="bg-pantog-green text-pantog-black hover:bg-pantog-green/90">
                  Comece agora gratuitamente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
