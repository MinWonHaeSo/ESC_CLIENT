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
<<<<<<< HEAD
import { OriginFilesProvider } from './context/OriginFilesContext';
import PATH from './constants/path';

const App = () => {
  return (
    <Provider store={store}>
      <OriginFilesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={PATH.ROOT} element={<Homepage />} />
              <Route path={PATH.LOGIN} element={<LoginPage />} />
              <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
              <Route path={PATH.FIND_PASSWORD} element={<FindPassWordPage />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* <Route element={<PrivateRoute />}> */}
              <Route path={PATH.ME} element={<MyPage />} />
              <Route path={PATH.SIGN_OUT} element={<SignOutPage />} />
              <Route path={PATH.MANAGER_STARDIUM_UPLOAD} element={<StardiumUploadPage />} />
=======
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
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/signout" element={<SignOutPage />} />
              <Route path="/manager/stardium/upload" element={<StardiumUploadPage />} />
>>>>>>> 530a4920889104786fe84c9c6cb9f565b1eb6162
              {/* </Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
<<<<<<< HEAD
      </OriginFilesProvider>
    </Provider>
=======
      </Provider>
    </CookiesProvider>
>>>>>>> 530a4920889104786fe84c9c6cb9f565b1eb6162
  );
};

export default App;
