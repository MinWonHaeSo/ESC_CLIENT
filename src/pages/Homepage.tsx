import BasicUserHome from '@/components/Home/BasicUserHome';
import useCurrentLocation from '@/hooks/useCurrentLocation';

const HomePage = () => {
  const currentLocation = useCurrentLocation();

  return <BasicUserHome currentLocation={currentLocation} />;
};

export default HomePage;
