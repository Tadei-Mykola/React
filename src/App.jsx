import { Routes, Route } from 'react-router-dom';
import './App.scss'
import { Todo, User, Header } from '@components';
import { UserProvider, PrivateUserRoute } from '@hooks';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient()

  return ( 
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<div>Welcome Home</div>} />

          <Route path="/todo" element={<PrivateUserRoute />}>
            <Route path="" element={<Todo />} />
          </Route>
          <Route path='/user/*' element={<User/>}/>
        </Routes>
    </UserProvider>
   </QueryClientProvider>
  );
}