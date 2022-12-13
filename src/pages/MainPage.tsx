import BasicUserHome from '@/components/Main/BasicUserHome';
import useCurrentLocation from '@/hooks/useCurrentLocation';

const MainPage = () => {
  const currentLocation = useCurrentLocation();

  return <BasicUserHome currentLocation={currentLocation} />;
};

export default MainPage;
