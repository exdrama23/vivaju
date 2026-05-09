import * as React from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────

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

// ─── Modal base ───────────────────────────────────────────────────────────────

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#F7F0E4] rounded-[28px] w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.28),0_0_0_1px_rgba(232,97,26,0.08)] animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E8E0D0] bg-white flex-shrink-0">
          <div>
            {subtitle && (
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-[1.5px] bg-[#E8611A] rounded-full inline-block" />
                <span className="text-[9px] font-bold text-[#E8611A] uppercase tracking-[0.18em]">
                  {subtitle}
                </span>
              </div>
            )}
            {title && (
              <h2
                className="text-[17px] font-black text-[#0A0A0A] leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {title}
              </h2>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-full bg-[#F7F0E4] border-[1.5px] border-[#E8E0D0] flex items-center justify-center transition-all hover:bg-[#FDDFC8] hover:border-[#E8611A] active:scale-95"
          >
            <X className="w-[14px] h-[14px] text-[#7A6E60]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto">
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
      <div className="w-8 h-8 rounded-[10px] bg-[#FDF0E8] border border-[#FDDFC8] flex items-center justify-center flex-shrink-0 text-[#E8611A]">
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
  };
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

