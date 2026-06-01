'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ProductDetailClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );

        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-40 skeleton mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square skeleton rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 skeleton" />
                <div className="h-10 w-1/3 skeleton" />
                <div className="h-6 w-24 skeleton" />
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-2/3 skeleton" />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="py-20">
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-300 mb-2">{error}</h2>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a productos
            </Link>
          </div>
        </main>
      </>
    );
  }

  const inStock = product.stock > 0;

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-8 transition-colors duration-300 group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a productos
        </Link>

        {/* Product Detail Card */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto">
              <img
                src={product.image_url || 'https://picsum.photos/seed/detail/600/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/20 hidden md:block" />
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              {/* Stock Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${inStock
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                  />
                  {inStock ? `${product.stock} unidades en stock` : 'Agotado'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {product.name}
              </h1>

              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                S/. {Number(product.price).toFixed(2)}
              </p>

              <div className="mb-8">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Descripción
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {product.description || 'Sin descripción disponible.'}
                </p>
              </div>

              {/* Product Meta */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">ID</p>
                  <p className="text-sm font-bold text-slate-300 mt-1">#{product.id}</p>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Stock</p>
                  <p className="text-sm font-bold text-slate-300 mt-1">{product.stock} uds.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 text-center py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Editar Producto
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-slate-600/30"
                >
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
