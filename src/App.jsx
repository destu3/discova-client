import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/loader/loader';

// pages and layouts
import Root from './layouts/root/root';
const Home = lazy(() => import('./pages/home/home'));
const SearchWrapper = lazy(() =>
  import('./layouts/search-wrapper/search-wrapper')
);
const SignUp = lazy(() => import('./pages/auth/sign-up-form/sign-up-form'));
const LoginForm = lazy(() => import('./pages/auth/login-form/login-form'));
const CategorySearch = lazy(() =>
  import('./pages/category-search/category-search')
);
const Anime = lazy(() => import('./pages/anime/anime'));

// routes definitions
const routerConfig = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route
      index
      element={
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      }
    />
    <Route
      path="search"
      element={
        <Suspense fallback={<Loader />}>
          <SearchWrapper />
        </Suspense>
      }
    >
      <Route index element={<CategorySearch name="anime" />} />
    </Route>
    <Route
      path="login"
      element={
        <Suspense fallback={<Loader />}>
          <LoginForm />
        </Suspense>
      }
    />
    <Route
      path="sign-up"
      element={
        <Suspense fallback={<Loader />}>
          <SignUp />
        </Suspense>
      }
    />
    <Route
      path="anime/:slug/:id"
      element={
        <Suspense fallback={<Loader />}>
          <Anime />
        </Suspense>
      }
    />
  </Route>
);

const router = createBrowserRouter(routerConfig);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
