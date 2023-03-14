import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFountPage from '../../pages/not-found-page/not-found-page';
import Layout from '../../pages/layout/layout';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';

type offerCountProps = {
  offerCount: number;
};

export default function App({offerCount}: offerCountProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainPage offerCount={offerCount}/>} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Favorites} element={<FavoritesPage />} />
          <Route path={AppRoute.Room} element={<RoomPage />} />
          <Route path='*' element={<NotFountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    //<MainPage offerCount={offerCount}/>
  );
}

