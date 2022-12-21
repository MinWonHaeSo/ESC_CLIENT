import { baseApi } from './baseApi';

export interface RentalItemsType {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
}

export interface GetReservationStadiumTimeReseponse {
  stadiumId: string;
  stadiumName: string;
  date: string;
  openTime: string;
  closeTime: string;
  pricePerHalfHour: number;
  reservedTimes: string[];
  rentalItems: RentalItemsType[];
}

interface GetReservationStadiumTimeRequest {
  id: string;
  date?: string;
}

export const reservationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReservationStadiumTime: builder.query<GetReservationStadiumTimeReseponse, GetReservationStadiumTimeRequest>({
      query: ({ id, date }) => ({
        url: `/stadiums/${id}/reservation`,
        transformResponse: (response: { data: GetReservationStadiumTimeReseponse }) => response.data,
        method: 'GET',
        params: { date },
      }),
    }),
  }),
});

export const { useGetReservationStadiumTimeQuery } = reservationApi;
