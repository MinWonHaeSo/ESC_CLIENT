import BasicUserHome from '@/components/Home/BasicUserHome';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import currentGeoLocation from '@/lib/utils/currentGeoLocation';

const HomePage = () => {
  const currentLocation = useCurrentLocation();
  // const currentLocation = currentGeoLocation();

  return <BasicUserHome currentLocation={currentLocation} />;
};

export default HomePage;
