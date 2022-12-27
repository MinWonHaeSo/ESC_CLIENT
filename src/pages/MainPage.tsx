import MainBasicUser from '@/components/MainBasicUser/Index';
import useCurrentLocation from '@/hooks/useCurrentLocation';

const MainPage = () => {
  const currentLocation = useCurrentLocation();

  return <MainBasicUser currentLocation={currentLocation} />;
};

export default MainPage;
