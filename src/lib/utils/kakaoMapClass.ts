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

class KaKaoMapClass {
  map: any = null;
  markers: any[] = [];

  initScript() {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.5030426, 127.041588),
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
          resolve({ lat: result[0].y, lng: result[0].x });
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
    if (!place) return;

    place.forEach((el: any) => {
      // 마커를 생성합니다
      const markers = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: this.map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lnt),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      this.markers.push(markers);

      kakao.maps.event.addListener(markers, 'click', function () {
        handleClick(el);
      });
    });

    this.goToLocation({ lat: place[0].lat, lnt: place[0].lnt });
  }

  setClearMarker() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
}

const kakaoClass = new KaKaoMapClass();

export default kakaoClass;
