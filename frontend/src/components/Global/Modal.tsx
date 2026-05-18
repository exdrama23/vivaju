import * as React from 'react';
import { X, ChevronRight } from 'lucide-react';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

interface ModalInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ModalBadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'green' | 'neutral';
}

interface ModalCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}




export function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 p-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full h-full bg-white p-4 md:p-8 rounded-none border-0 flex flex-col overflow-hidden shadow-2xl font-sans text-neutral-900">

        {/* Header */}
        <header className="flex items-center justify-between pb-4 md:pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-black hover:text-black transition-colors md:hidden">
              <X className="w-6 h-6 cursor-pointer" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                {title ? (
                  <div className="flex items-center gap-1">
                    <h2 className="text-[16px] md:text-[18px] font-medium leading-tight text-neutral-900">{title}</h2>
                    {title.trim().toLowerCase() === 'sua avaliação' && (
                      <ChevronRight className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                    )}
                  </div>
                ) : (
                  <h2 className="text-[16px] md:text-[18px] font-medium leading-tight text-neutral-900">Detalhes</h2>
                )}
                {subtitle && <span className="text-sm text-neutral-500">{subtitle}</span>}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onClose} className="p-2 rounded-lg bg-transparent text-neutral-400 hover:text-neutral-200 transition-colors focus:outline-none">
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Body (container que recebe os children) */}
        <div className="flex-1 overflow-y-auto py-4 md:py-6">
          {children}
        </div>

      </div>
    </div>
  );
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────

export function ModalDivider() {
  return <div className="h-px bg-[#E8E0D0] my-4" />;
}

export function ModalInfoRow({ icon, label, value }: ModalInfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-[10px] bg-[#FDF0E8] border border-[#FDDFC8] flex items-center justify-center shrink-0 text-[#E8611A]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[#7A6E60] uppercase tracking-[0.08em] mb-0.5">
          {label}
        </p>
        <p className="text-[13px] font-bold text-[#0A0A0A]">{value}</p>
      </div>
    </div>
  );
}

export function ModalBadge({ children, variant = 'orange' }: ModalBadgeProps) {
  const styles = {
    orange:  'bg-[#FDF0E8] text-[#E8611A] border-[#FDDFC8]',
    green:   'bg-[#ebf2e3] text-[#2D5016] border-[#c5dba8]',
    neutral: 'bg-[#EDE3D0] text-[#7A6E60] border-[#E8E0D0]',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function ModalCTA({ children, onClick, variant = 'primary' }: ModalCTAProps) {
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        className="w-full py-3 rounded-[14px] bg-[#F7F0E4] text-[#2D5016] border border-[#E8E0D0] text-[13px] font-bold transition-all hover:bg-[#EDE3D0] active:scale-[0.98]"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-[14px] bg-[#E8611A] text-white text-[13px] font-black tracking-[0.06em] transition-all hover:bg-[#C04E10] active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

