import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Copy, Share, Link, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdvancedOptions {
  expiresAt: string;
  customAlias: string;
  trackClicks: boolean;
  passwordProtected: boolean;
}

const EnhancedNewLinkCard: React.FC = () => {
  const [newUrl, setNewUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    expiresAt: '',
    customAlias: '',
    trackClicks: true,
    passwordProtected: false
  });
  const [urlMetadata, setUrlMetadata] = useState<{title: string, icon: string} | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewUrl(url);
    
    // Simulate fetching metadata when a valid URL is entered
    if (url.startsWith('http') && url.includes('.')) {
      setTimeout(() => {
        setUrlMetadata({
          title: 'Título da Página',
          icon: '🌐'
        });
      }, 500);
    } else {
      setUrlMetadata(null);
    }
  };

  const handleCreateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUrl) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }
    
    setIsCreating(true);
    
    // Mock API call
    setTimeout(() => {
      // Create a more realistic short URL
      const mockShortUrl = `pantog.io/${advancedOptions.customAlias || Math.random().toString(36).substring(2, 7)}`;
      setShortUrl(mockShortUrl);
      
      toast.success('URL encurtada criada com sucesso!');
      setIsCreating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast.success('URL copiada para a área de transferência!');
  };

  const shareUrl = () => {
    // In a real implementation, this would open share dialog
    toast.success('Abrindo opções de compartilhamento...');
  };

  const createAnotherUrl = () => {
    setNewUrl('');
    setShortUrl('');
    setUrlMetadata(null);
    setShowAdvancedOptions(false);
  };

  return (
    <Card className="bg-pantog-gray border-pantog-gray h-full hover-elevate transition-all">
      <h3 className="text-lg font-medium text-white mb-4">Criar novo link</h3>
      {!shortUrl ? (
        <form onSubmit={handleCreateUrl} className="space-y-4">
          <div className="relative">
            <Input 
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="Cole sua URL longa aqui"
              className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
            />
            {urlMetadata && (
              <div className="mt-2 p-2 bg-pantog-black/50 rounded border border-pantog-gray/50 text-sm text-gray-300 flex items-center">
                <span className="mr-2">{urlMetadata.icon}</span>
                <span className="truncate">{urlMetadata.title}</span>
              </div>
            )}
          </div>

          <Collapsible
            open={showAdvancedOptions}
            onOpenChange={setShowAdvancedOptions}
            className="border border-pantog-gray/50 rounded-md overflow-hidden"
          >
            <CollapsibleTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full flex items-center justify-between text-gray-400 hover:text-white"
              >
                <span>Opções avançadas</span>
                <ArrowDown 
                  size={16} 
                  className={`transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 space-y-3 bg-pantog-black/30">
              <div>
                <Label htmlFor="custom-alias" className="text-gray-300 text-xs block mb-1">
                  Alias personalizado
                </Label>
                <Input
                  id="custom-alias"
                  placeholder="meu-link"
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green text-sm"
                  value={advancedOptions.customAlias}
                  onChange={(e) => setAdvancedOptions({...advancedOptions, customAlias: e.target.value})}
                />
                {advancedOptions.customAlias && (
                  <p className="text-xs text-gray-400 mt-1">
                    Preview: pantog.io/{advancedOptions.customAlias}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="expires-at" className="text-gray-300 text-xs block mb-1">
                  Data de expiração (opcional)
                </Label>
                <Input
                  id="expires-at"
                  type="date"
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green text-sm"
                  value={advancedOptions.expiresAt}
                  onChange={(e) => setAdvancedOptions({...advancedOptions, expiresAt: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="track-clicks" className="text-gray-300 text-xs cursor-pointer">
                  Rastrear cliques
                </Label>
                <Switch
                  id="track-clicks"
                  checked={advancedOptions.trackClicks}
                  onCheckedChange={(checked) => setAdvancedOptions({...advancedOptions, trackClicks: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="password-protected" className="text-gray-300 text-xs cursor-pointer">
                  Proteger com senha
                </Label>
                <Switch
                  id="password-protected"
                  checked={advancedOptions.passwordProtected}
                  onCheckedChange={(checked) => setAdvancedOptions({...advancedOptions, passwordProtected: checked})}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button 
            type="submit" 
            className="w-full bg-pantog-green text-pantog-black hover:bg-pantog-green/90 flex items-center justify-center"
            disabled={isCreating}
          >
            <Plus size={18} className="mr-2" />
            {isCreating ? 'Criando...' : 'Criar Link'}
          </Button>
        </form>
      ) : (
        <div className="animate-slide-in">
          <div className="mb-4 p-4 bg-pantog-black/50 rounded-lg border border-pantog-gray/50">
            <p className="text-gray-400 text-sm mb-1">URL original:</p>
            <p className="text-white text-sm truncate">{newUrl}</p>
            <p className="text-gray-400 text-sm mt-3 mb-1">URL encurtada:</p>
            <p className="text-pantog-green font-medium">https://{shortUrl}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={copyToClipboard} 
                  className="bg-pantog-black border border-pantog-gray/50 hover:bg-pantog-black/80 text-white"
                >
                  <Copy size={16} className="mr-2" />
                  Copiar
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Copiar para área de transferência</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={shareUrl}
                  className="bg-pantog-black border border-pantog-gray/50 hover:bg-pantog-black/80 text-white"
                >
                  <Share size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Compartilhar em redes sociais</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={createAnotherUrl}
                  className="bg-pantog-black border border-pantog-gray/50 hover:bg-pantog-black/80 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Novo
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Criar outro link</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="mt-4 bg-pantog-black/30 p-3 rounded-lg border border-pantog-gray/50">
            <h4 className="text-white text-sm mb-2">Próximos passos:</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="flex items-center">
                <Link size={12} className="mr-2 text-pantog-green" />
                <span>Compartilhe seu link nas redes sociais</span>
              </li>
              <li className="flex items-center">
                <Link size={12} className="mr-2 text-pantog-green" />
                <span>Adicione este link às suas campanhas de marketing</span>
              </li>
              <li className="flex items-center">
                <Link size={12} className="mr-2 text-pantog-green" />
                <span>Acompanhe o desempenho na aba Analytics</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EnhancedNewLinkCard;
