'use client';

import Link from 'next/link';

export default function ProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar "${product.name}"? Esta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}`,
        { method: 'DELETE' }
      );

      if (!res.ok) {
        throw new Error('Error al eliminar el producto');
      }

      if (onDelete) onDelete(product.id);
    } catch (error) {
      alert('Error al eliminar el producto: ' + error.message);
    }
  };

  const inStock = product.stock > 0;

  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image_url || 'https://picsum.photos/seed/product/400/300'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              inStock
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                inStock ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            {inStock ? `${product.stock} en stock` : 'Agotado'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
          S/. {Number(product.price).toFixed(2)}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-5">
          {product.description || 'Sin descripción disponible.'}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 rounded-xl text-sm font-semibold transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40"
          >
            Ver detalle
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="flex items-center justify-center w-11 h-11 bg-slate-700/50 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 rounded-xl transition-all duration-300 border border-slate-600/30 hover:border-amber-500/30"
            title="Editar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center w-11 h-11 bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl transition-all duration-300 border border-slate-600/30 hover:border-red-500/30"
            title="Eliminar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
