import { baseApi } from './baseApi';

type RenstalItems = {
  id: string;
  name: string;
  imgUrl: string;
  count: number;
  pirce: number;
};

interface GetReservationStadiumTimeReseponse {
  stadiumId: string;
  stadiumName: string;
  pricePerHalfHour: number;
  reservedTimes: string[];
  rentalItems: RenstalItems[];
}

export const reservationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReservationStadiumTime: builder.query<GetReservationStadiumTimeReseponse, string>({
      query: id => ({
        url: `/stadiums/${id}/reservation`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetReservationStadiumTimeQuery } = reservationApi;
