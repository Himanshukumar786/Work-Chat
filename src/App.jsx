import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from "@/components/ui/sonner"
import { AppContextProvider } from './context/AppContextProvider';
import { AppRoutes } from '@/Routes';
import { Modals } from '@/components/organisms/Modals/Modals';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />
        <Modals />
        
      </AppContextProvider>
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
