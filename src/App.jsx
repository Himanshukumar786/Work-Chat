import './App.css'
import { Routes , Route, Navigate} from "react-router-dom"
import { SigninCard } from '@/components/organisms/Auth/SigninCard';
import { SignupCard } from '@/components/organisms/Auth/SignupCard';
import { Auth } from '@/pages/Auth/Auth';
import { Notfound } from '@/pages/Notfound/Notfound';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth/signup" element={<Auth><SignupCard/></Auth>} />
      <Route path="/auth/signin" element={<Auth><SigninCard /></Auth>} />

      <Route path="/*" element={<Notfound />} />
    </Routes>
  )
}

export default App
