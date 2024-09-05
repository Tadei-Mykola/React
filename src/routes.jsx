import { Routes, Route } from 'react-router-dom';
import { Todo, User } from '@components';
import { PrivateUserRoute } from '@hooks';

export function RoutesComponent() {
  return (
    <Routes>
      <Route path='/' element={<div>Welcome Home</div>} />
      <Route path="/todo" element={<PrivateUserRoute />}>
        <Route path="" element={<Todo />} />
      </Route>
      <Route path='/user/*' element={<User/>}/>
    </Routes>
  );
}
