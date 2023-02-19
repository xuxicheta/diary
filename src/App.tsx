import { Link, Outlet } from 'react-router-dom';
import './pages/pages.css';
import { AppRoutes } from './routes.enum';

export function App() {
  return (
    <div id='App'>
      <nav className='app-nav'>
        <Link to='/'>Home</Link>
        <Link to={`/${AppRoutes.Input}`}>Input</Link>
        <Link to={`/${AppRoutes.Records}`}>Records</Link>
      </nav>

      <main className='app-outlet'>
        <Outlet />
      </main>
    </div>
  );
}
