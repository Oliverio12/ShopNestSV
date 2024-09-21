'use client';
import NavBar from '@/app/navBar/page';
import { useState, useEffect } from 'react';

const CategoriaElectronica = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado para ver detalles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Controla el modal de éxito

  // Obtener los productos desde MongoDB
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('/api/electronica', { // Ruta a la API
          method: 'GET', // Método GET
        });
        const data = await res.json();
        if (data.success) {
          setProductos(data.data);
        }
      } catch (error) {
        console.error('Error al obtener los productos de la API:', error);
      }
    };

    fetchProductos();
  }, []);

  // Abrir el modal y mostrar detalles del producto seleccionado
  const handleVerMasDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductoSeleccionado(null);
  };

  // Manejar el "Agregar al carrito" y mostrar el modal de éxito
  const handleAgregarAlCarrito = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    // Cerrar el modal de éxito automáticamente después de 3 segundos
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 3000);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-purple-600 my-4">
          Electrónica
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <li key={producto._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-2xl font-semibold text-center my-2">{producto.nombre}</h2>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-60 object-cover"
                />
                <p className="text-center text-gray-700 my-2">${producto.precio.toFixed(2)}</p>
                <div className="text-center">
                  <button
                    onClick={() => handleVerMasDetalle(producto)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Ver más detalle
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No se encontraron productos.</p>
          )}
        </ul>

        {/* Modal de detalles del producto */}
        {isModalOpen && productoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{productoSeleccionado.nombre}</h2>
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-full h-60 object-cover mb-4"
              />
              <p className="text-gray-700 mb-4">{productoSeleccionado.descripcion}</p>
              <p className="text-gray-700 mb-4">Precio: ${productoSeleccionado.precio.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleAgregarAlCarrito}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de éxito */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-xl font-bold text-center mb-2">Producto agregado al carrito</h2>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriaElectronica;
