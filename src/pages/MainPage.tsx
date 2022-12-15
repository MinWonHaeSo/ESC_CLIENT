import MainBasicUser from '@/components/MainBasicUser/MainBasicUser';
import useCurrentLocation from '@/hooks/useCurrentLocation';

const MainPage = () => {
  const currentLocation = useCurrentLocation();

  return <MainBasicUser currentLocation={currentLocation} />;
};

export default MainPage;
