
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="py-4 px-6 md:px-10 flex items-center justify-between">
      <Link to="/">
        <Logo />
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="outline" className="border-pantog-gray hover:bg-pantog-gray/20">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-pantog-green text-pantog-black hover:bg-pantog-green/90">
            Cadastrar
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
