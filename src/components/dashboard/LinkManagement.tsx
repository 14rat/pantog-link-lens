
import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Grid, 
  List, 
  Filter, 
  Copy, 
  ArrowDown, 
  Eye, 
  Edit, 
  Trash, 
  Menu 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from '@/components/ui/badge';

// Mock link data
const mockLinks = [
  { 
    id: 1, 
    original: 'https://example.com/very-long-path-to-some-resource', 
    short: 'pantog.io/ex4mp', 
    clicks: 243, 
    date: '1 dia atrás',
    tags: ['marketing', 'homepage'],
    status: 'active'
  },
  { 
    id: 2, 
    original: 'https://anotherexample.com/blog/10-ways-to-improve', 
    short: 'pantog.io/impr0', 
    clicks: 187, 
    date: '2 dias atrás',
    tags: ['blog', 'seo'],
    status: 'active'
  },
  { 
    id: 3, 
    original: 'https://website.com/products/specific-product-details', 
    short: 'pantog.io/pr0du', 
    clicks: 92, 
    date: '5 dias atrás',
    tags: ['produto', 'campanha'],
    status: 'active'
  },
  { 
    id: 4, 
    original: 'https://learning-platform.com/courses/web-development', 
    short: 'pantog.io/learn', 
    clicks: 156, 
    date: '1 semana atrás',
    tags: ['educação', 'curso'],
    status: 'active'
  },
  { 
    id: 5, 
    original: 'https://portfolio-site.com/projects/design-system', 
    short: 'pantog.io/desig', 
    clicks: 78, 
    date: '2 semanas atrás',
    tags: ['portfolio', 'design'],
    status: 'active'
  },
];

// Format numbers with K, M suffix
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

type ViewMode = 'list' | 'grid';
type SortOption = 'newest' | 'oldest' | 'most-clicks' | 'least-clicks';

const LinkManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success('URL copiada para a área de transferência!');
  };
  
  const handleDeleteLink = (id: number) => {
    toast.success(`Link ${id} excluído com sucesso!`);
  };
  
  const handleEditLink = (id: number) => {
    toast.info(`Editando link ${id}...`);
  };
  
  const sortLinks = (links: typeof mockLinks): typeof mockLinks => {
    return [...links].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return -1; // Mock sorting, would compare dates in real app
        case 'oldest':
          return 1; // Mock sorting, would compare dates in real app
        case 'most-clicks':
          return b.clicks - a.clicks;
        case 'least-clicks':
          return a.clicks - b.clicks;
        default:
          return 0;
      }
    });
  };
  
  const filteredLinks = sortLinks(mockLinks).filter(link => 
    link.original.toLowerCase().includes(searchTerm.toLowerCase()) || 
    link.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleLinkSelection = (id: number) => {
    if (selectedLinks.includes(id)) {
      setSelectedLinks(selectedLinks.filter(linkId => linkId !== id));
    } else {
      setSelectedLinks([...selectedLinks, id]);
    }
  };
  
  const handleBulkAction = (action: 'delete' | 'export') => {
    if (selectedLinks.length === 0) {
      toast.error('Selecione pelo menos um link');
      return;
    }
    
    if (action === 'delete') {
      toast.success(`${selectedLinks.length} links excluídos com sucesso!`);
      setSelectedLinks([]);
    } else if (action === 'export') {
      toast.success(`${selectedLinks.length} links exportados com sucesso!`);
    }
  };

  return (
    <Card className="bg-pantog-gray border-pantog-gray hover-elevate transition-all mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h3 className="text-lg font-medium text-white">Gerenciamento de Links</h3>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Input
            placeholder="Buscar links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-48 lg:w-64 bg-pantog-black border-pantog-gray focus:border-pantog-green"
          />
          
          <div className="flex space-x-1">
            <Button 
              size="icon" 
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-pantog-green text-pantog-black' : 'border-pantog-gray'}
            >
              <List size={16} />
            </Button>
            <Button 
              size="icon" 
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-pantog-green text-pantog-black' : 'border-pantog-gray'}
            >
              <Grid size={16} />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-pantog-gray">
                <Menu size={16} className="mr-1" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-pantog-gray border-pantog-gray text-white">
              <DropdownMenuItem 
                onClick={() => setSortBy('newest')} 
                className={`hover:bg-pantog-black/30 cursor-pointer ${sortBy === 'newest' ? 'text-pantog-green' : ''}`}
              >
                Mais recentes
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('oldest')} 
                className={`hover:bg-pantog-black/30 cursor-pointer ${sortBy === 'oldest' ? 'text-pantog-green' : ''}`}
              >
                Mais antigos
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('most-clicks')} 
                className={`hover:bg-pantog-black/30 cursor-pointer ${sortBy === 'most-clicks' ? 'text-pantog-green' : ''}`}
              >
                Mais cliques
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('least-clicks')} 
                className={`hover:bg-pantog-black/30 cursor-pointer ${sortBy === 'least-clicks' ? 'text-pantog-green' : ''}`}
              >
                Menos cliques
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="border-pantog-gray"
          >
            <Filter size={16} className="mr-1" />
            Filtros
          </Button>
        </div>
      </div>
      
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent className="mb-4 p-3 bg-pantog-black/30 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <h4 className="text-sm text-white mb-2">Status</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 cursor-pointer">Ativos</Badge>
                <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 cursor-pointer">Inativos</Badge>
                <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer">Expirados</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-white mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 cursor-pointer">marketing</Badge>
                <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 cursor-pointer">blog</Badge>
                <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 cursor-pointer">produto</Badge>
                <Badge className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 cursor-pointer">campanha</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-white mb-2">Data de criação</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-pantog-gray/50 text-white hover:bg-pantog-gray/70 cursor-pointer">Hoje</Badge>
                <Badge className="bg-pantog-gray/50 text-white hover:bg-pantog-gray/70 cursor-pointer">Esta semana</Badge>
                <Badge className="bg-pantog-gray/50 text-white hover:bg-pantog-gray/70 cursor-pointer">Este mês</Badge>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {selectedLinks.length > 0 && (
        <div className="bg-pantog-black/50 p-2 rounded-md mb-4 flex items-center justify-between">
          <span className="text-white text-sm">
            {selectedLinks.length} link(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-pantog-gray text-gray-300"
              onClick={() => setSelectedLinks([])}
            >
              Cancelar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash size={14} className="mr-1" />
              Excluir
            </Button>
            <Button 
              size="sm" 
              className="bg-pantog-green text-pantog-black"
              onClick={() => handleBulkAction('export')}
            >
              Exportar
            </Button>
          </div>
        </div>
      )}
      
      {viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-pantog-black">
                <th className="pb-3 text-gray-400 font-normal w-10">
                  <input 
                    type="checkbox" 
                    className="rounded bg-pantog-black border-pantog-gray"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLinks(filteredLinks.map(link => link.id));
                      } else {
                        setSelectedLinks([]);
                      }
                    }}
                    checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                  />
                </th>
                <th className="pb-3 text-gray-400 font-normal">URL Original</th>
                <th className="pb-3 text-gray-400 font-normal">URL Curta</th>
                <th className="pb-3 text-gray-400 font-normal">Cliques</th>
                <th className="pb-3 text-gray-400 font-normal">Tags</th>
                <th className="pb-3 text-gray-400 font-normal">Criado</th>
                <th className="pb-3 text-gray-400 font-normal">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <tr key={link.id} className="border-b border-pantog-black hover:bg-pantog-black/10 transition-colors">
                    <td className="py-3">
                      <input 
                        type="checkbox" 
                        className="rounded bg-pantog-black border-pantog-gray"
                        checked={selectedLinks.includes(link.id)}
                        onChange={() => toggleLinkSelection(link.id)}
                      />
                    </td>
                    <td className="py-3 text-white">
                      <div className="truncate max-w-[200px]">{link.original}</div>
                    </td>
                    <td className="py-3 text-pantog-green">{link.short}</td>
                    <td className="py-3 text-white">{formatNumber(link.clicks)}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {link.tags.map((tag, index) => (
                          <Badge key={index} className="bg-pantog-black/50 text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 text-gray-400">{link.date}</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-pantog-black/30"
                          onClick={() => copyToClipboard(link.short)}
                        >
                          <Copy size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-pantog-black/30"
                          onClick={() => toast.info(`Visualizando estatísticas para ${link.short}`)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-pantog-black/30"
                          onClick={() => handleEditLink(link.id)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-pantog-black/30"
                          onClick={() => handleDeleteLink(link.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    Nenhum link encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <div key={link.id} className="bg-pantog-black/50 rounded-lg p-4 border border-pantog-gray/30 hover:border-pantog-gray/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-pantog-green font-medium mb-1 truncate">{link.short}</p>
                    <p className="text-xs text-gray-400 truncate">{link.original}</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="rounded bg-pantog-black border-pantog-gray ml-2 mt-1"
                    checked={selectedLinks.includes(link.id)}
                    onChange={() => toggleLinkSelection(link.id)}
                  />
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xs text-gray-400">Cliques</span>
                    <p className="text-white font-medium">{formatNumber(link.clicks)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Criado</span>
                    <p className="text-white">{link.date}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {link.tags.map((tag, index) => (
                      <Badge key={index} className="bg-pantog-gray/50 text-gray-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-3 border-t border-pantog-gray/30 pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-pantog-black/30"
                    onClick={() => copyToClipboard(link.short)}
                  >
                    <Copy size={14} className="mr-1" />
                    Copiar
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-pantog-black/30">
                        <Menu size={14} className="mr-1" />
                        Mais
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-pantog-gray border-pantog-gray text-white">
                      <DropdownMenuItem 
                        onClick={() => toast.info(`Visualizando estatísticas para ${link.short}`)}
                        className="hover:bg-pantog-black/30 cursor-pointer"
                      >
                        <Eye size={14} className="mr-2" />
                        Ver estatísticas
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleEditLink(link.id)}
                        className="hover:bg-pantog-black/30 cursor-pointer"
                      >
                        <Edit size={14} className="mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteLink(link.id)}
                        className="hover:bg-pantog-black/30 text-red-400 cursor-pointer"
                      >
                        <Trash size={14} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-400">
              Nenhum link encontrado com os filtros atuais.
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default LinkManagement;
