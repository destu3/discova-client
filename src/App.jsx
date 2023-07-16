import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './App.css';

// pages and layouts
import Root from './layouts/root/root';
import Home from './pages/home/home';
import SearchWrapper from './layouts/search-wrapper/search-wrapper';
import SignUp from './pages/auth/sign-up-form/sign-up-form';
import LoginForm from './pages/auth/login-form/login-form';
import CategorySearch from './pages/category-search/category-search';

// routes definitions and pages associated
const routerConfig = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="search" element={<SearchWrapper />}>
      <Route index element={<CategorySearch name="anime" />} />
    </Route>
    <Route path="login" element={<LoginForm />} />
    <Route path="sign-up" element={<SignUp />} />
  </Route>
);

const router = createBrowserRouter(routerConfig);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
