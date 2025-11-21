import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/design-system.scss';
import './styles/main.scss';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

// Only use StrictMode in development for better performance in production
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}
