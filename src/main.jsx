import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/design-system.scss'
import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));

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
