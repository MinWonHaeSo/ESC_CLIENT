import { geoLocationType } from '@/hooks/useCurrentLocation';
import { rentalItemType, stadiumWriteState } from '@/store/stadiumWriteSlice';
import { PageType } from '@/types/pageType';
import { baseApi } from './baseApi';

export interface SearchStadiumContent {
  stadiumId: number;
  name: string;
  address: string;
  imgUrl: string;
  likes: number;
  tags: string[];
  star_avg: number;
  holidayPricePerHalfHour: number;
  weekdayPricePerHalfHour: number;
  lat: string;
  lnt: string;
}

export interface SearchStadiumResponse {
  content: SearchStadiumContent[];
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface ManagerListStadium {
  id: string;
  address: string;
  name: string;
  weekdayPricePerHalfHour: number;
  holidayPricePerHalfHour: number;
  tags: string[];
  starAvg: number;
  imgUrl: string;
  lat: string;
  lnt: string;
}

export type ImagesType = {
  imgUrl: string;
  publicId: string;
};

export interface DetailStadiumResponse {
  id: string;
  name: string;
  address: string;
  detailAddress: string;
  memberId: string;
  phone: string;
  lnt: string;
  lat: string;
  imgs: ImagesType[];
  imtes: rentalItemType[];
  openTime: string;
  closeTime: string;
  holidayPricePerHalfHour: number;
  weekdayPricePerHalfHour: number;
  tags: string[];
  likes: any;
}

interface LikeStadium {
  id: string;
  stadiumId: string;
  name: string;
  address: string;
  starAvg: number;
  imgUrl: string;
}

export interface ReservationUser {
  name: string;
  paymentDate: string;
  reservationId: string;
  reservingDate: string;
  stadiumId: string;
  status: ReservationStatus;
}

export interface GetReservationUserListResponse extends PageType {
  content: ReservationUser[];
}

export interface LikeStadiumListResponse extends PageType {
  content: LikeStadium[];
}

export type ReservationStatus = 'RESERVED' | 'EXECUTED' | 'CANCELED';

export interface RentalStadium {
  reservationId?: string;
  stadiumId: string;
  name: string;
  address: string;
  imgUrl: string;
  starAvg: number;
  status?: ReservationStatus;
}

interface RentalStadiumListResponse extends PageType {
  content: RentalStadium[];
}

interface RentalStadiumItems {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
}

interface GetManagerListResponse extends PageType {
  content: RentalStadium[];
}

export interface RentalStadiumDetail {
  reservationId: string;
  stadiumId: string;
  name: string;
  status: 'RESERVED' | 'EXECUTED' | 'CANCELED';
  member: {
    id: number;
    nickname: string;
    email: string;
  };
  reservingDate: string;
  reservingTime: string[];
  headCount: number;
  price: number;
  paymentType: string;
  items: RentalStadiumItems[];
}

export const stadiumApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchStadium: builder.mutation<SearchStadiumResponse, string>({
      query: search => ({
        url: `/stadiums/search?searchValue=${search}`,
        transformResponse: (response: { data: SearchStadiumResponse }) => response.data,
        method: 'GET',
      }),
    }),
    getStadiumList: builder.query({
      query: (location: geoLocationType) => ({
        url: `/stadiums/near-loc?lat=${location.lat}&lnt=${location.lnt}`,
        method: 'GET',
      }),
    }),
    getStadiumManagerList: builder.query<GetManagerListResponse, number>({
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
      RentalStadiumDetail,
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
        transformResponse: (response: { data: LikeStadium }) => response.data,
        method: 'GET',
      }),
      providesTags: ['LikeStadium'],
    }),
    getMoreLikeStadiumList: builder.query<LikeStadiumListResponse, number>({
      query: (page: number) => ({
        url: `/stadiums/likelist?page=${page}&size=${5}`,
        transformResponse: (response: { data: LikeStadium }) => response.data,
        method: 'GET',
      }),
      providesTags: ['LikeStadium'],
    }),
    getRentalStadiumList: builder.query<RentalStadiumListResponse, void>({
      query: () => ({
        url: `/stadiums/reservations?page=${0}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: RentalStadium }) => response.data,
        method: 'GET',
      }),
    }),
    getMoreRentalStadiumList: builder.query<RentalStadiumListResponse, number>({
      query: (page: number) => ({
        url: `/stadiums/reservations?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: RentalStadium }) => response.data,
        method: 'GET',
      }),
    }),
    getRentalStadiumDetail: builder.query<RentalStadiumDetail, { reservationId: string; stadiumId: string }>({
      query: ({ stadiumId, reservationId }) => ({
        url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
        method: 'GET',
      }),
    }),
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
