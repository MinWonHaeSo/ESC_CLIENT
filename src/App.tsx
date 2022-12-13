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
import { OriginFilesProvider } from './context/OriginFilesContext';
import PATH from './constants/path';

const App = () => {
  return (
    <CookiesProvider>
      <OriginFilesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path={PATH.ROOT} element={<Homepage />} />
                <Route path={PATH.LOGIN} element={<LoginPage />} />
                <Route path="/oauth2/:social" element={<OAuthRedirectPage />} />
                <Route path={PATH.SEARCH_PASSWORD} element={<SearchPasswordPage />} />
                <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
                <Route path="*" element={<NotFoundPage />} />
                {/* <Route element={<PrivateRoute />}> */}
                <Route path={PATH.ME} element={<MyPage />} />
                <Route path={PATH.SIGN_OUT} element={<SignOutPage />} />
                <Route path={PATH.MANAGER_STARDIUM_UPLOAD} element={<StardiumUploadPage />} />
                {/* </Route> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </OriginFilesProvider>
    </CookiesProvider>
  );
};

export default App;
