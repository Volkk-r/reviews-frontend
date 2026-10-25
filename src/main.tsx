import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, css } from '@emotion/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Global styles={css`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}button,input,textarea,select{font-family:inherit}button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid #a9a0ff;outline-offset:2px}::selection{background:#dedaff}`} /><App /></React.StrictMode>);
