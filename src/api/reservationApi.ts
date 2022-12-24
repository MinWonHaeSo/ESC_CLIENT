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

interface MakeReservationData {
  date: string;
  openTime?: string;
  closeTime?: string;
  headCount: number;
  pricePerHalfHour: number;
  items: RentalItemsType[];
  totalPrice: number;
  reservingTimes: string[];
  email: string;
  paymentType: string;
}

interface MakeReservationRequest {
  id: string;
  finalReservationData: MakeReservationData;
}

interface MakeReservationResponse {
  statusCode: number;
  successMessage: string;
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
    makeReservation: builder.mutation<MakeReservationResponse, MakeReservationRequest>({
      query: ({ id, finalReservationData }) => ({
        url: `/stadiums/${id}/payment`,
        method: 'POST',
        body: finalReservationData,
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

export const {
  useGetReservationStadiumTimeQuery,
  useMakeReservationMutation,
  useFinishStadiumUtilizationMutation,
  useCancelReservationMutation,
} = reservationApi;
