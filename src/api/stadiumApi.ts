import { geoLocationType } from '@/hooks/useCurrentLocation';
import { stadiumWriteState } from '@/store/stadiumWriteSlice';
import { LikeStadiumType, LocationStadiumType, PriceStadiumType, RentalStadiumType } from '@/types/stadiumType';
import { RentalMemberType } from '@/types/memberType';
import { PageType } from '@/types/pageType';
import { baseApi } from './baseApi';

export interface SearchStadiumContentType extends PriceStadiumType, LocationStadiumType {
  stadiumId: number;
}

export type ImagesType = {
  imgUrl: string;
  publicId: string;
};

interface RentalStadiumItems {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
}

export interface ReservationUserType {
  name: string;
  paymentDate: string;
  reservationId: string;
  reservingDate: string;
  stadiumId: string;
  status: ReservationStatus;
}

export type ReservationStatus = 'RESERVED' | 'EXECUTED' | 'CANCELED';

interface GetSearchStadiumResponse {
  content: SearchStadiumContentType[];
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface GetRentalStadiumDetailResponse {
  reservationId: string;
  stadiumId: string;
  name: string;
  status: ReservationStatus;
  member: RentalMemberType;
  reservingDate: string;
  reservingTime: string[];
  headCount: number;
  price: number;
  paymentType: string;
  items: RentalStadiumItems[];
}

export interface GetReservationUserListResponse extends PageType {
  content: ReservationUserType[];
}

export interface LikeStadiumListResponse extends PageType {
  content: LikeStadiumType[];
}

interface RentalStadiumListResponse extends PageType {
  content: RentalStadiumType[];
}

interface GetManagerListResponse extends PageType {
  content: RentalStadiumType[];
}

export const stadiumApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchStadium: builder.mutation<GetSearchStadiumResponse, string>({
      query: search => ({
        url: `/stadiums/search?searchValue=${search}`,
        transformResponse: (response: { data: GetSearchStadiumResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getStadiumList: builder.query({
      query: (location: geoLocationType) => ({
        url: `/stadiums/near-loc?lat=${location.lat}&lnt=${location.lnt}`,
        method: 'GET',
      }),
    }),
    getStadiumManagerList: builder.query<GetManagerListResponse, void>({
      query: () => ({
        url: `/stadiums/manager?page=${0}&size=${5}&sort=${'createdAt'},DESC`,
        method: 'GET',
      }),
    }),
    getMoreStadiumManagerList: builder.query<GetManagerListResponse, number>({
      query: page => ({
        url: `/stadiums/manager?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
        method: 'GET',
      }),
    }),
    getStadiumManagerReservationUserList: builder.query<GetReservationUserListResponse, string>({
      query: id => ({
        url: `/stadiums/manager/${id}`,
        method: 'GET',
      }),
    }),
    getStadiumManagerReservationUserDetail: builder.query<
      GetRentalStadiumDetailResponse,
      { stadiumId: string; reservationId: string }
    >({
      query: ({ reservationId, stadiumId }) => ({
        url: `/stadiums/manager/${stadiumId}/reservations/${reservationId}`,
        method: 'GET',
      }),
    }),
    getStadiumDetail: builder.query<stadiumWriteState, string>({
      query: id => ({
        url: `/stadiums/${id}/info`,
        method: 'GET',
      }),
    }),
    getLikeStadiumList: builder.query<LikeStadiumListResponse, void>({
      query: () => ({
        url: `/stadiums/likelist?page=${0}&size=${5}`,
        transformResponse: (response: { data: LikeStadiumListResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getMoreLikeStadiumList: builder.query<LikeStadiumListResponse, number>({
      query: (page: number) => ({
        url: `/stadiums/likelist?page=${page}&size=${5}`,
        transformResponse: (response: { data: LikeStadiumListResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getRentalStadiumList: builder.query<RentalStadiumListResponse, void>({
      query: () => ({
        url: `/stadiums/reservations?page=${0}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: RentalStadiumListResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getMoreRentalStadiumList: builder.query<RentalStadiumListResponse, number>({
      query: (page: number) => ({
        url: `/stadiums/reservations?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: RentalStadiumListResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getRentalStadiumDetail: builder.query<GetRentalStadiumDetailResponse, { reservationId: string; stadiumId: string }>(
      {
        query: ({ stadiumId, reservationId }) => ({
          url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
          method: 'GET',
        }),
      },
    ),
    addStadium: builder.mutation({
      query: (stadium: stadiumWriteState) => ({
        url: '/stadiums/register',
        method: 'POST',
        body: stadium,
      }),
    }),
    updateStadiumInfo: builder.mutation({
      query: ({ stadium, id }: { stadium: stadiumWriteState; id: string }) => ({
        url: `/stadiums/${id}/info`,
        method: 'PATCH',
        body: stadium,
      }),
    }),
    postLikeStadium: builder.mutation<any, string>({
      query: id => ({
        url: `/stadiums/${id}/likes`,
        method: 'POST',
      }),
      invalidatesTags: ['LikeStadium'],
    }),
    removeStadium: builder.mutation<any, string>({
      query: id => ({
        url: `/stadiums/${id}/info`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStadiumListQuery,
  useGetStadiumManagerListQuery,
  useGetMoreStadiumManagerListQuery,
  useGetStadiumManagerReservationUserListQuery,
  useGetStadiumManagerReservationUserDetailQuery,
  useGetStadiumDetailQuery,
  useAddStadiumMutation,
  useUpdateStadiumInfoMutation,
  useSearchStadiumMutation,
  usePostLikeStadiumMutation,
  useGetLikeStadiumListQuery,
  useGetMoreLikeStadiumListQuery,
  useGetRentalStadiumListQuery,
  useGetMoreRentalStadiumListQuery,
  useGetRentalStadiumDetailQuery,
  useRemoveStadiumMutation,
} = stadiumApi;
