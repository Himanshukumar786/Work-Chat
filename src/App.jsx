import './App.css'
import { Routes , Route, Navigate} from "react-router-dom"
import { Auth } from '@/pages/Auth/Auth';
import { Notfound } from '@/pages/Notfound/Notfound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';
import { Toaster } from "@/components/ui/sonner"
import { SigninContainer } from '@/components/organisms/Auth/SigninContainer';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth/signup" element={<Auth><SignupContainer/></Auth>} />
      <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>} />
      <Route path="/home" element={<Auth><h1>Home</h1></Auth>} />

      <Route path="/*" element={<Notfound />} />
    </Routes>
    <Toaster
        theme="light"
        toastOptions={{
          style: {
            color: 'black',
          },
        }}
    />
    </QueryClientProvider>
  )
}

export default App
