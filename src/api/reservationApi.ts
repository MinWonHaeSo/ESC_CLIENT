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
interface FinishStadiumUtilization {}

interface CancelReservation {}

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
    finishStadiumUtilization: builder.mutation<any, { stadiumId: number; reservationId: number }>({
      query: ({ stadiumId, reservationId }) => ({
        url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
        method: 'PATCH',
      }),
    }),
    cancelReservation: builder.mutation<any, { stadiumId: number; reservationId: number }>({
      query: ({ stadiumId, reservationId }) => ({
        url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetReservationStadiumTimeQuery, useFinishStadiumUtilizationMutation, useCancelReservationMutation } =
  reservationApi;
