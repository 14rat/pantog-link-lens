
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-6 bg-pantog-gray text-white rounded-lg border border-pantog-gray/50">
          <AlertTriangle size={48} className="text-red-500 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-2">Algo deu errado</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Ocorreu um erro ao renderizar este componente. Tente recarregar a página.
          </p>
          <Button 
            className="bg-pantog-green text-pantog-black hover:bg-pantog-green/90 flex items-center gap-2"
            onClick={this.handleRefresh}
          >
            <RefreshCw size={16} />
            Recarregar página
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
