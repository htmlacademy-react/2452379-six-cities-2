import { RouterProvider } from 'react-router-dom';
import { router } from '../../services/router';


function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
