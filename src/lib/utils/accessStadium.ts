export interface CurrentStadium {
  id: number;
  imgUrl: string;
  starAvg: number;
  name: string;
  address: string;
  urlParam: string;
}

export const getAccessStadium = (name: string) => {
  if (localStorage.getItem('stadiums') === null) {
    return;
  }
  const stadiumList = JSON.parse(localStorage.getItem(name) as string);
  return stadiumList;
};

export const addAccessStadium = (name: string, currentStadium: CurrentStadium) => {
  const stadiums = localStorage.getItem(name) as string;
  const maxStadiumNum = 10;

  if (stadiums === null) {
    const stadiumList = [currentStadium];
    const newStadium = JSON.stringify(stadiumList);
    return localStorage.setItem(name, newStadium);
  }

  if (stadiums) {
    const stadiumList = JSON.parse(stadiums);

    const doubleCheck = getAccessStadium(name).filter(
      (stadium: CurrentStadium) => stadium.id === currentStadium.id,
    ).length;

    if (doubleCheck) {
      return;
    }
    stadiumList.unshift(currentStadium);
    if (stadiumList.length > maxStadiumNum) {
      stadiumList.pop();
    }
    const newStadium = JSON.stringify(stadiumList);
    return localStorage.setItem(name, newStadium);
  }
};
