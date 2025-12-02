import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ArticleDetail from './components/ArticleDetail'

function App() {
  

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
