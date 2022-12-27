import ZERO_LOCATION from '@/constants/defaultLocation';

declare global {
  interface Window {
    kakao: any;
  }
}

type PanToParam = {
  lat: string;
  lnt: string;
};

type setMarkerParam = {
  place: any;
  handleClick: (el: any) => void;
};

const { kakao } = window;

class KaKaoMap {
  map: any = null;
  markers: any[] = [];

  initScript() {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(ZERO_LOCATION.lat, ZERO_LOCATION.lnt),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    this.map = map;
  }

  getGeoCode(address: string) {
    const geocoder = new kakao.maps.services.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          resolve({ lat: result[0].y, lnt: result[0].x });
        } else {
          reject(status);
        }
      });
    });
  }

  goToLocation(location: PanToParam) {
    if (!this.map) return;
    const moveLatLon = new kakao.maps.LatLng(location.lat, location.lnt);

    this.map.panTo(moveLatLon);
  }

  setMarker({ place, handleClick }: setMarkerParam) {
    place.forEach((el: any) => {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: this.map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lnt),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        handleClick(el);
        this.map.setLevel(8);
        this.goToLocation({ lat: el.lat, lnt: el.lnt });
      });
      this.markers.push(marker);
    });

    this.goToLocation({ lat: place[0].lat, lnt: place[0].lnt });
  }

  setClearMarker() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
  }

  zoomIn() {
    // 현재 지도의 레벨을 얻어옵니다
    const level = this.map.getLevel();

    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    this.map.setLevel(level - 1);
  }

  zoomOut() {
    const level = this.map.getLevel();

    // 지도를 1레벨 올립니다 (지도가 축소됩니다)
    this.map.setLevel(level + 1);
  }
}

const kakaoService = new KaKaoMap();

export default kakaoService;
