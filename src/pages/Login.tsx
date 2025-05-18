
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in a real app, this would be an actual API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pantog-black p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Voltar para Home
        </Link>
        
        <Card className="w-full bg-pantog-gray border-pantog-gray">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="seu@email.com" 
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-sm text-pantog-green hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input 
                  id="password"
                  name="password" 
                  type="password" 
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pantog-green text-pantog-black hover:bg-pantog-green/90"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-400 mt-2">
              Não tem uma conta?{' '}
              <Link to="/signup" className="text-pantog-green hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
