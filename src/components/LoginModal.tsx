import { useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import { login } from '../api/authApi';
import { getApiError, TOKEN_KEY } from '../api/client';
import type { User } from '../types';
import { Modal } from './Modal';

const Form = styled.form`display:grid;gap:16px;`;
const Label = styled.label`display:grid;gap:7px;color:#525c6b;font-size:13px;font-weight:650;`;
const Input = styled.input`width:100%;padding:13px 14px;border:1px solid #e4e7ec;border-radius:12px;font:inherit;color:#202633;outline:none; &:focus{border-color:#7c72ef;box-shadow:0 0 0 3px #7669e51c;}`;
const Button = styled.button`border:0;border-radius:12px;padding:14px;background:#6558df;color:white;font:inherit;font-weight:700;cursor:pointer; &:hover{background:#5244cd;} &:disabled{opacity:.55;cursor:wait;}`;
const ErrorBox = styled.p`margin:0;padding:11px 13px;border-radius:10px;background:#fff1f0;color:#b42318;font-size:14px;`;
const Hint = styled.p`margin:0;color:#7a8290;font-size:13px;line-height:1.55;`;
interface Props { onClose: () => void; onSuccess: (user: User) => void }
export function LoginModal({ onClose, onSuccess }: Props) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setBusy(true); try { const result = await login(email, password); sessionStorage.setItem(TOKEN_KEY, result.token); onSuccess(result.user); } catch (err) { setError(getApiError(err)); } finally { setBusy(false); } }
  return <Modal title="Вход в аккаунт" onClose={onClose} busy={busy}><Form onSubmit={submit}><Label>Email<Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></Label><Label>Пароль<Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></Label>{error && <ErrorBox role="alert">{error}</ErrorBox>}<Button disabled={busy}>{busy ? 'Входим…' : 'Войти'}</Button><Hint>Используйте тестовый аккаунт из README проекта.</Hint></Form></Modal>;
}
