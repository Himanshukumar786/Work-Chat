import './App.css'
import { Routes , Route, Navigate} from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Auth" />} />
      <Route path="/Auth" element={<Auth />} />
    </Routes>
  )
}

export default App
