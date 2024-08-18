import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/Routes'
import './app.css'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </BrowserRouter>
  )
}

export default App
