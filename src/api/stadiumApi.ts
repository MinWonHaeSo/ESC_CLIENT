import { geoLocationType } from '@/hooks/useCurrentLocation';
import { rentalItemType, stadiumWriteState } from '@/store/stadiumWriteSlice';
import { PageType } from '@/types/pageType';
import { baseApi } from './baseApi';

export interface SearchStadiumContent {
  id: number;
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
  id: number;
  stadiumId: number;
  name: string;
  address: string;
  starAvg: number;
  imgUrl: string;
}

export type LikeStadiumListResponse = {
  content: LikeStadium[];
};

export type ReservationStatus = 'RESERVED' | 'EXECUTED' | 'CANCELED';

export interface RentalStadium {
  reservationId?: number;
  stadiumId: number;
  name: string;
  address: string;
  imgUrl: string;
  starAvg: number;
  status?: ReservationStatus;
}

interface RentalStadiumListResponse {
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

interface RentalStadiumDetail {
  reservationId: number;
  stadiumId: number;
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
    getStadiumDetail: builder.query<stadiumWriteState, string>({
      query: id => ({
        url: `/stadiums/${id}/info`,
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
      query: ({ stadium, id }: { stadium: stadiumWriteState; id: number }) => ({
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
    }),
    getLikeStadiumList: builder.query<LikeStadiumListResponse, string>({
      query: () => ({
        url: `/stadiums/likelist`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getRentalStadiumList: builder.query<RentalStadiumListResponse, string>({
      query: () => ({
        url: `/stadiums/reservations`,
        method: 'GET',
      }),
    }),
    getRentalStadiumDetail: builder.query<RentalStadiumDetail, { stadiumId: string; reservationId: string }>({
      query: ({ stadiumId, reservationId }) => ({
        url: `/stadiums/${stadiumId}/reservations/${reservationId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetStadiumListQuery,
  useGetStadiumManagerListQuery,
  useGetStadiumDetailQuery,
  useAddStadiumMutation,
  useUpdateStadiumInfoMutation,
  useSearchStadiumMutation,
  usePostLikeStadiumMutation,
  useGetLikeStadiumListQuery,
  useGetRentalStadiumListQuery,
  useGetRentalStadiumDetailQuery,
} = stadiumApi;
