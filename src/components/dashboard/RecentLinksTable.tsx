
import React from 'react';
import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock recent links
const recentLinks = [
  { id: 1, original: 'https://example.com/very-long-path-to-some-resource', short: 'pantog.io/ex4mp', clicks: 243, date: '1 dia atrás' },
  { id: 2, original: 'https://anotherexample.com/blog/10-ways-to-improve', short: 'pantog.io/impr0', clicks: 187, date: '2 dias atrás' },
  { id: 3, original: 'https://website.com/products/specific-product-details', short: 'pantog.io/pr0du', clicks: 92, date: '5 dias atrás' },
];

const RecentLinksTable: React.FC = () => {
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success('URL copiada para a área de transferência!');
  };

  return (
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
  );
};

export default RecentLinksTable;
