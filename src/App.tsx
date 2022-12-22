import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './routes/Layout';
import LoginPage from './pages/LoginPage';
import { store } from './store/store';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import PrivateRoute from './routes/PrivateRoutes';
import StadiumUploadPage from './pages/StadiumUploadPage';
import SearchPasswordPage from './pages/SearchPasswordPage';
import SignOutPage from './pages/SignOutPage';
import OAuthRedirectPage from './pages/OAuthRedirectPage';
import MeRentalListPage from './pages/MeRentalListPage';
import MeRecentSearchPage from './pages/MeRecentSearchPage';
import MeLikeStadiumPage from './pages/MeLikeStadiumPage';
import NotificationPage from './pages/NotificationPage';
import { CookiesProvider } from 'react-cookie';
import { OriginFilesProvider } from './context/OriginFilesContext';
import PATH from './constants/path';
import StadiumDetailPage from './pages/StadiumDetailPage';
import StadiumListPage from './pages/StadiumListPage';
import StadiumReservationPage from './pages/StadiumReservationPage';
import ModalProvider from './context/ModalContext';

const App = () => {
  return (
    <CookiesProvider>
      <OriginFilesProvider>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path={PATH.ROOT} element={<MainPage />} />
                  <Route path={PATH.LOGIN} element={<LoginPage />} />
                  <Route path="/oauth2/:social" element={<OAuthRedirectPage />} />
                  <Route path={PATH.SEARCH_PASSWORD} element={<SearchPasswordPage />} />
                  <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
                  <Route path={PATH.STADIUM_DETAIL} element={<StadiumListPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route element={<PrivateRoute />}>
                    <Route path={PATH.ME} element={<MyPage />} />
                    <Route path={PATH.ME_NOTIFICATION} element={<NotificationPage />} />
                    <Route path={PATH.SIGN_OUT} element={<SignOutPage />} />
                    <Route path={`${PATH.STADIUM_DETAIL}/:id`} element={<StadiumDetailPage />} />
                    <Route path={PATH.STADIUM_RENTAL} element={<StadiumReservationPage />} />
                    <Route path={PATH.ME_RENTAL_LIST} element={<MeRentalListPage />} />
                    <Route path={PATH.ME_RECENT_SEARCH_LIST} element={<MeRecentSearchPage />} />
                    <Route path={PATH.ME_LIKE_STADIUM_LIST} element={<MeLikeStadiumPage />} />
                    <Route path={PATH.MANAGER_STADIUM_UPLOAD} element={<StadiumUploadPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </Provider>
        </ModalProvider>
      </OriginFilesProvider>
    </CookiesProvider>
  );
};

export default App;
