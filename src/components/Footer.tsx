
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Twitter, 
  Github, 
  Linkedin 
} from 'lucide-react';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const handleFeedbackClick = () => {
    toast.success("Obrigado pelo seu feedback! Entraremos em contato em breve.");
  };
  
  return (
    <footer className="bg-pantog-black py-10 px-6 border-t border-pantog-gray/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-medium mb-4">Pantog</h3>
            <p className="text-gray-400 text-sm">
              A ferramenta definitiva para encurtar URLs e acompanhar o desempenho dos seus links.
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} className="text-gray-400 hover:text-pantog-green transition-colors" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={18} className="text-gray-400 hover:text-pantog-green transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} className="text-gray-400 hover:text-pantog-green transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Links rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/pricing" className="text-gray-400 text-sm hover:text-pantog-green transition-colors">
                Preços
              </Link>
              <Link to="/features" className="text-gray-400 text-sm hover:text-pantog-green transition-colors">
                Recursos
              </Link>
              <Link to="/about" className="text-gray-400 text-sm hover:text-pantog-green transition-colors">
                Sobre nós
              </Link>
              <Link to="/contact" className="text-gray-400 text-sm hover:text-pantog-green transition-colors">
                Contato
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Suporte</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/docs" className="text-gray-400 text-sm hover:text-pantog-green transition-colors flex items-center">
                <BookOpen size={14} className="mr-2" />
                Documentação
              </Link>
              <Link to="/support" className="text-gray-400 text-sm hover:text-pantog-green transition-colors flex items-center">
                <HelpCircle size={14} className="mr-2" />
                Central de ajuda
              </Link>
              <Link to="/faq" className="text-gray-400 text-sm hover:text-pantog-green transition-colors flex items-center">
                <MessageSquare size={14} className="mr-2" />
                Perguntas frequentes
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Status do sistema</h3>
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-green"></div>
              <span className="text-gray-400 text-sm">Todos os sistemas operacionais</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFeedbackClick}
              className="border-pantog-gray hover:bg-pantog-gray/20 text-white text-sm w-full"
            >
              Enviar Feedback
            </Button>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-pantog-gray/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Pantog. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 text-sm hover:text-pantog-green transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-pantog-green transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
