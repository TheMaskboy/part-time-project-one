import { useLocation, useRoutes } from 'react-router-dom'
import Routes from './router'

import './App.css'
import { useEffect } from 'react'

const App = () => {
  const location = useLocation()
  useEffect(() => {
    console.log(location)
  }, [location])

  const element = useRoutes(Routes)
  return <div>{element}</div>
}

export default App
