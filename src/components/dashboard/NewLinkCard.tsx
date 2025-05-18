
import React from 'react';
import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const NewLinkCard: React.FC = () => {
  const [newUrl, setNewUrl] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

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

  return (
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
  );
};

export default NewLinkCard;
