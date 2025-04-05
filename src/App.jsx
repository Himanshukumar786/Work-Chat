import './App.css'
import { Routes , Route, Navigate} from "react-router-dom"
import { SigninCard } from '@/components/organisms/Auth/SigninCard';
import { Auth } from '@/pages/Auth/Auth';
import { Notfound } from '@/pages/Notfound/Notfound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignupContainer } from './components/organisms/Auth/SignupContainer';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth/signup" element={<Auth><SignupContainer/></Auth>} />
      <Route path="/auth/signin" element={<Auth><SigninCard /></Auth>} />

      <Route path="/*" element={<Notfound />} />
    </Routes>
    </QueryClientProvider>
  )
}

export default App
