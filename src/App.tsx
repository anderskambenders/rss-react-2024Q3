import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/Routes'
import './app.css'

function App() {

  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  )
}

export default App
