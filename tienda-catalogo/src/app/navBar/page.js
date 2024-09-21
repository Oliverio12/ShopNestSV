'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = ({ onSearch }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery); // Envía el término de búsqueda al componente padre
  };

  return (
    <nav className="bg-purple-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/" passHref>
            <span className="text-xl font-bold text-white cursor-pointer">ShopNestSV</span>
          </Link>
        </div>

        <div className="relative">
          <button onClick={toggleCategories} className="text-white px-4 py-2">
            Categorías
          </button>
          {isCategoriesOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg mt-2 py-2 rounded">
              <Link href="/routes/categoria/electronica" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Electrónica
                </span>
              </Link>
              <Link href="/categoria/ropa" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Ropa
                </span>
              </Link>
              <Link href="/categoria/hogar" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Hogar
                </span>
              </Link>
              <Link href="/categoria/deportes" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Deportes
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex-1 mx-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Buscar
            </button>
          </form>
        </div>

        <div>
          <Link href="/ofertas" passHref>
            <span className="text-white px-4 py-2 cursor-pointer">Ofertas</span>
          </Link>
        </div>

        <div className="relative">
          <button onClick={toggleCart} className="text-white px-4 py-2">
            Carrito
          </button>
          {isCartOpen && (
            <div className="absolute top-full right-0 bg-white shadow-lg mt-2 py-2 rounded">
              <Link href="/carrito" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Ver Carrito
                </span>
              </Link>
              <Link href="/checkout" passHref>
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Finalizar Compra
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <Link href="/perfil" passHref>
            <span className="text-white px-4 py-2 cursor-pointer">Mi Cuenta</span>
          </Link>
        </div>

        <div>
          <Link href="/login" passHref>
            <span className="text-white px-4 py-2 cursor-pointer">Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
