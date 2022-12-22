import { baseApi } from './baseApi';
import { DetailStadiumResponse } from './stadiumApi';

export interface RentalItemsType {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
}

export interface GetReservationStadiumResponse extends DetailStadiumResponse {
  rentalItems: RentalItemsType[];
}

export interface GetReservationStadiumTimeReseponse {
  date: string;
  openTime: string;
  closeTime: string;
  pricePerHalfHour: number;
  reservedTimes: string[];
  stadium: GetReservationStadiumResponse;
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
