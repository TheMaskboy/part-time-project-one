import { useRoutes } from 'react-router-dom'
import Routes from './router'

import './App.css'

const App = () => {

  const element = useRoutes(Routes)
  return <div>{element}</div>
}

export default App
