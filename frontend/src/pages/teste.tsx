import React, { useState } from 'react';

// --- TIPAGENS (TYPESCRIPT) ---
interface QuestionCardProps {
  questionTitle: string;
  questionHighlight: string;
  options: string[];
}

// --- COMPONENTES MENORES ---

// 1. Cabeçalho Superior
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-3 border-b border-neutral-800 mb-4 md:mb-6 md:pb-4">
      <div className="flex items-center gap-4">
        {/* Ícone de Fechar (X) */}
        <button className="text-neutral-400 hover:text-white transition-colors">
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Informações do App */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F47521] rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 md:w-6 md:h-6 border-[3px] border-white rounded-full border-t-transparent transform rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-200 text-[15px] md:text-base font-medium leading-tight">Crunchyroll: Anime Strea...</h1>
            <span className="text-neutral-400 text-[13px] md:text-sm">Avaliação do app</span>
          </div>
        </div>
      </div>
      
      <button className="text-neutral-600 font-medium text-sm md:text-base px-2 hover:text-neutral-400 transition-colors">
        Post...
      </button>
    </header>
  );
};

// 2. Informações do Usuário
const UserInfo: React.FC = () => {
  return (
    <div className="flex gap-4 mb-6 md:mb-8">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-700 overflow-hidden flex-shrink-0">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alec" 
          alt="Avatar do usuário" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-neutral-200 text-[15px] md:text-base font-medium mb-1">Alec Vinícius Souza Carvalho</h2>
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
          As avaliações são públicas e incluem informações sobre sua conta e seu dispositivo. <a href="#" className="underline text-neutral-300 hover:text-white transition-colors">Saiba mais</a>
        </p>
      </div>
    </div>
  );
};

// 3. Sistema de Estrelas
const StarRating: React.FC = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex justify-center gap-4 md:gap-6 mb-8 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button 
          key={star} 
          onClick={() => setRating(star)}
          className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
        >
          <svg 
            className={`w-8 h-8 md:w-10 md:h-10 ${star <= rating ? 'text-neutral-200 fill-current' : 'text-neutral-400 hover:text-neutral-300'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

// 4. Caixa de Texto para o Review
const ReviewInput: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <div className="mb-8 md:mb-10">
      <textarea
        className="w-full bg-transparent border border-neutral-700 rounded-lg p-4 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all resize-none h-24 md:h-32 text-[15px] md:text-base"
        placeholder="Descreva sua experiência (opcional)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
      />
      <div className="text-right text-neutral-400 text-xs md:text-sm mt-2">
        {text.length}/500
      </div>
    </div>
  );
};

// 5. Cartão de Detalhes Individual
const DetailCard: React.FC<QuestionCardProps> = ({ questionTitle, questionHighlight, options }) => {
  return (
    <div className="border border-neutral-700 rounded-2xl p-4 min-w-[280px] md:min-w-[320px] bg-[#1a1a1b] flex-shrink-0 hover:border-neutral-500 transition-colors">
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <h3 className="text-neutral-200 text-[15px] md:text-base leading-snug pr-4">
          {questionTitle} <span className="font-bold">{questionHighlight}</span> com este app?
        </h3>
        <button className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors mt-1">Apa...</button>
      </div>
      
      <div className="flex gap-2">
        {options.map((option, index) => (
          <button 
            key={index}
            className="border border-neutral-700 text-neutral-300 text-sm py-1.5 px-4 rounded-full hover:bg-neutral-700 hover:text-white transition-all flex-1"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// 6. Seção de Detalhes (Container do Carrossel)


// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export default function AppReview() {
  return (
    // Fundo escuro total, centraliza conteúdo em telas grandes
    <div className="min-h-screen bg-[#121212] md:bg-[#0a0a0a] font-sans flex items-center justify-center md:py-10">
      
      {/* O CONTAINER MÁGICO: 
        No celular: w-full (100%), sem bordas, tela inteira.
        No Tablet/Desktop (md: e lg:): largura máxima definida, bordas arredondadas e sombra.
      */}
      <div className="w-full h-full md:h-auto md:max-w-2xl lg:max-w-3xl bg-[#121212] p-4 md:p-8 md:rounded-3xl md:border md:border-neutral-800 flex flex-col md:shadow-2xl">
        <Header />
        <UserInfo />
        <StarRating />
        <ReviewInput />
        
        
        {/* Barra de navegação do sistema Android (Escondida em tablets/desktops) */}
        <div className="mt-auto pt-10 flex justify-center pb-2 md:hidden">
          <div className="w-1/3 h-1 bg-neutral-500 rounded-full"></div>
        </div>
      </div>
      
    </div>
  );
}