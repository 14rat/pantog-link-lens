
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

const Settings = () => {
  const handleLogout = () => {
    toast.success('Você foi desconectado com sucesso');
    // In a real app, this would actually log the user out
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen bg-pantog-black">
      <DashboardSidebar />
      
      <div className="ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Configurações</h1>
          
          <Card className="bg-pantog-gray border-pantog-gray mb-8">
            <CardHeader>
              <CardTitle>Conta</CardTitle>
              <CardDescription className="text-gray-400">
                Gerencie suas configurações de conta
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-300">
                Esta seção terá opções de configuração adicionais em breve, incluindo personalização, 
                notificações, segurança e integrações.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-pantog-gray border-pantog-gray border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de perigo</CardTitle>
              <CardDescription className="text-gray-400">
                Ações que requerem atenção extra
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-300 mb-4">
                Ao sair, você será desconectado da sua conta em todos os dispositivos.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="destructive" 
                className="flex items-center" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da conta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
