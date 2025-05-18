
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
    
    setIsLoading(true);
    
    // Mock signup - in a real app, this would be an actual API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Cadastro realizado com sucesso!');
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
            <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Preencha os campos abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="Seu nome" 
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
                <Label htmlFor="password">Senha</Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword" 
                  type="password" 
                  className="bg-pantog-black border-pantog-gray focus:border-pantog-green"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pantog-green text-pantog-black hover:bg-pantog-green/90"
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Criar conta'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-400 mt-2">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-pantog-green hover:underline">
                Fazer login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
