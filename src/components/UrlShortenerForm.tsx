
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

const UrlShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call - in a real app, this would be an actual API call
    setTimeout(() => {
      const mockShortUrl = `pantog.io/${Math.random().toString(36).substring(2, 7)}`;
      setShortUrl(mockShortUrl);
      setIsLoading(false);
      toast.success('URL encurtada com sucesso!');
    }, 1000);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast.success('URL copiada para a área de transferência!');
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <Input
          type="url"
          placeholder="Cole sua URL longa aqui"
          className="flex-1 bg-pantog-gray border-pantog-gray focus:border-pantog-green"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="bg-pantog-green text-pantog-black hover:bg-pantog-green/90"
          disabled={isLoading}
        >
          {isLoading ? 'Encurtando...' : 'Encurtar URL'}
        </Button>
      </form>
      
      {shortUrl && (
        <div className="mt-4 p-4 bg-pantog-gray rounded-lg flex flex-col md:flex-row items-center justify-between gap-3 animate-slide-in">
          <p className="text-white"><span className="text-gray-400 mr-2">URL encurtada:</span> https://{shortUrl}</p>
          <Button onClick={copyToClipboard} variant="outline" className="border-pantog-green text-pantog-green hover:bg-pantog-green/10">
            Copiar
          </Button>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
