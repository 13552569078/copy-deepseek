import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "github-markdown-css";
import './index.css'
import App from './App.tsx'
// 注意此处
import "./style/index.css"

createRoot(document.getElementById('root')!).render(
  <App />,
)
{/* <StrictMode>
    <App />
  </StrictMode>, */}