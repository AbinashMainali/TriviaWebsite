import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Trivia from './pages/Trivia'
import Score from './pages/Score.tsx'
import About from './pages/About'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} id="root" >
      <Route index element={<Trivia />} />
      <Route path="/home" element={<Home />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/score" element={<Score />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <RouterProvider router={router}/>
  
)
