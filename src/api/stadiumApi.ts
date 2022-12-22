import { geoLocationType } from '@/hooks/useCurrentLocation';
import { rentalItemType, stadiumWriteState } from '@/store/stadiumWriteSlice';
import { baseApi } from './baseApi';

export interface SearchStadiumContent {
  id: number;
  name: string;
  address: string;
  img: string;
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
  }),
});

export const {
  useGetStadiumListQuery,
  useGetStadiumDetailQuery,
  useAddStadiumMutation,
  useUpdateStadiumInfoMutation,
  useSearchStadiumMutation,
  usePostLikeStadiumMutation,
} = stadiumApi;
