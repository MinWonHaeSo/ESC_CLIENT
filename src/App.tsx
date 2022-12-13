import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './routes/Layout';
import LoginPage from './pages/LoginPage';
import { store } from './store/store';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import PrivateRoute from './routes/PrivateRoutes';
import StardiumUploadPage from './pages/StardiumUploadPage';
import SearchPasswordPage from './pages/SearchPasswordPage';
import SignOutPage from './pages/SignOutPage';
import OAuthRedirectPage from './pages/OAuthRedirectPage';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/oauth2/:social" element={<OAuthRedirectPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/searchpassword" element={<SearchPasswordPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/signout" element={<SignOutPage />} />
                <Route path="/manager/stardium/upload" element={<StardiumUploadPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
