import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Landing Pages
import Layout from './components/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';

// Dashboard Pages
import DashLayout from './components/DashLayout';
import UserListPage from './pages/DashboardPages/UserListPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Auth Pages
import AuthLayout from './components/AuthLayout';
import SignIn from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Error Page
import NotFoundPage from './pages/NotFoundPage';


const routes = [
  {
    path: '/',
    element: <Layout />,
    // Error element
    errorElement: <NotFoundPage />,
    children: [{
      // Path declaration
      path: '',
      element: <HomePage />
    },
    {
      path: 'about',
      element: <AboutPage />
    },
    {
      path: 'articles',
      element: <ArticleListPage />
    },
    {
      path: 'articles/:name', // -->articles/learn-react
      element: <ArticlePage />
    }
    ]
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      }
    ],
  },
  {
    path: 'dashboard/',
    element: <DashLayout />,
    // Error element 
    errorElement: <NotFoundPage />,
    children: [{
      // Path declaration
      path: 'users',
      element: <UserListPage />
    },
    {
      path: 'dash-articles',
      element: <DashArticleListPage />
    },
    ]
  },
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
