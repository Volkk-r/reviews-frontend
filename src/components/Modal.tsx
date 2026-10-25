import { useEffect, useRef, type ReactNode, type FormEvent } from 'react';
import styled from '@emotion/styled';

const Backdrop = styled.div`position:fixed;inset:0;z-index:20;background:rgba(24,29,38,.48);display:grid;place-items:center;padding:20px;backdrop-filter:blur(4px);`;
const Dialog = styled.div`width:min(100%,480px);max-height:min(90vh,760px);overflow:auto;background:#fff;border-radius:24px;padding:28px;box-shadow:0 24px 80px rgba(15,23,42,.2);`;
const Top = styled.div`display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:22px;`;
const Title = styled.h2`margin:0;font-size:24px;letter-spacing:-.04em;`;
const Close = styled.button`border:0;background:#f3f4f6;border-radius:50%;width:36px;height:36px;font-size:20px;cursor:pointer;color:#566071;`;
interface Props { title: string; onClose: () => void; children: ReactNode; busy?: boolean }
export function Modal({ title, onClose, children, busy = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; ref.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && !busy) onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; previous?.focus(); window.removeEventListener('keydown', onKeyDown); };
  }, [onClose, busy]);
  function stop(event: FormEvent | React.MouseEvent) { event.stopPropagation(); }
  return <Backdrop onMouseDown={() => { if (!busy) onClose(); }}><Dialog role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref} onMouseDown={stop}><Top><Title>{title}</Title><Close type="button" aria-label="Закрыть" onClick={onClose} disabled={busy}>×</Close></Top>{children}</Dialog></Backdrop>;
}
