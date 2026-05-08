import React from 'react';
import type { Produto } from '@/types/global';

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <div className="flex justify-between items-stretch p-4 bg-white border border-gray-100 rounded shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full font-sans group hover:border-red-100 transition-colors cursor-pointer">
      
      {/* LADO ESQUERDO: Textos e Preço */}
      <div className="flex flex-col justify-between pr-4 flex-1">
        <div>
          <h3 className="text-[16px] font-medium text-gray-800 mb-1.5 group-hover:text-red-600 transition-colors">
            {produto.nome}
          </h3>
          <p className="text-[14px] text-gray-500 leading-snug line-clamp-2">
            {produto.descricao}
          </p>
        </div>

        <div className="mt-4">
          <span className="text-[15px] font-medium text-gray-800">
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>
      </div>

      {/* LADO DIREITO: Imagem */}
      {produto.imagem && (
        <div className="flex-shrink-0 w-[100px] h-[100px] ml-2 overflow-hidden rounded-md bg-gray-50">
          <img 
            src={produto.imagem} 
            alt={`Foto de ${produto.nome}`} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      )}
    </div>
  );
}
