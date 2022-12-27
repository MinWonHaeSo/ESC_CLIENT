import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { OriginFilesProvider } from './context/OriginFilesContext';
import ModalProvider from './context/ModalContext';

import { ScrollToTop } from './hooks/useScollToTop';

import PrivateRoute from './routes/PrivateRoutes';
import Layout from './routes/Layout';

import PATH from './constants/path';

// 페이지
import ReservationUserInfoPage from './pages/ReservationUserInfoPage';
import StadiumReservationPage from './pages/StadiumReservationPage';
import ManagerStadiumListPage from './pages/ManagerStadiumListPage';
import MeRecentSearchPage from './pages/MeRecentSearchPage';
import SearchPasswordPage from './pages/SearchPasswordPage';
import OAuthRedirectPage from './pages/OAuthRedirectPage';
import MeLikeStadiumPage from './pages/MeLikeStadiumPage';
import StadiumDetailPage from './pages/StadiumDetailPage';
import StadiumUploadPage from './pages/StadiumUploadPage';
import MeRentalListPage from './pages/MeRentalListPage';
import NotificationPage from './pages/NotificationPage';
import NotFoundPage from './pages/NotFoundPage';
import SignOutPage from './pages/SignOutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';

const App = () => {
  return (
    <CookiesProvider>
      <OriginFilesProvider>
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route element={<Layout />}>
                  <Route path={PATH.ROOT} element={<MainPage />} />
                  <Route path={PATH.LOGIN} element={<LoginPage />} />
                  <Route path="/oauth2/:social" element={<OAuthRedirectPage />} />
                  <Route path={PATH.SEARCH_PASSWORD} element={<SearchPasswordPage />} />
                  <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route element={<PrivateRoute />}>
                    <Route path={PATH.ME} element={<MyPage />} />
                    <Route path={PATH.ME_NOTIFICATION} element={<NotificationPage />} />
                    <Route path={PATH.SIGN_OUT} element={<SignOutPage />} />
                    <Route path={`${PATH.STADIUM_DETAIL}/:id`} element={<StadiumDetailPage />} />
                    <Route path={PATH.STADIUM_RENTAL} element={<StadiumReservationPage />} />
                    <Route path={PATH.STADIUM_RESERVATION_USER} element={<ReservationUserInfoPage />} />
                    <Route path={PATH.ME_RENTAL_LIST} element={<MeRentalListPage />} />
                    <Route path={PATH.ME_RECENT_SEARCH_LIST} element={<MeRecentSearchPage />} />
                    <Route path={PATH.ME_LIKE_STADIUM_LIST} element={<MeLikeStadiumPage />} />
                    <Route path={PATH.MANAGER_STADIUM_UPLOAD} element={<StadiumUploadPage />} />
                    <Route path={PATH.MANAGER_STADIUM_UPLOAD_LIST} element={<ManagerStadiumListPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </Provider>
      </OriginFilesProvider>
    </CookiesProvider>
  );
};

export default App;
