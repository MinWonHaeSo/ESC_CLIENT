import { imagesType, rentalItemType } from '@/store/stadiumWriteSlice';
import { DetailStadiumType } from '@/types/stadiumType';
import { baseApi } from './baseApi';

export interface ReservationStadiumType extends DetailStadiumType {
  id: string;
  imgs: imagesType[];
  imtes: rentalItemType[];
}

export interface RentalItemsType {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
}

export interface GetReservationStadiumResponse extends ReservationStadiumType {
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
interface FinishStadiumUtilization {
  statusCode: number;
  message: string;
}

type CancelReservation = FinishStadiumUtilization;

interface MakeReservationData {
  date: string;
  openTime?: string;
  closeTime?: string;
  pricePerHalfHour?: number;
  headCount: number;
  items: RentalItemsType[];
  totalPrice: number;
  reservedTimes: string[];
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
    finishStadiumUtilization: builder.mutation<FinishStadiumUtilization, { stadiumId: string; reservationId: string }>({
      query: ({ stadiumId, reservationId }) => ({
        url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
        method: 'PATCH',
      }),
    }),
    cancelReservation: builder.mutation<CancelReservation, { stadiumId: string; reservationId: string }>({
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
