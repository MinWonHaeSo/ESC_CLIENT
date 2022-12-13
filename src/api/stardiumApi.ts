import { geoLocationType } from '@/hooks/useCurrentLocation';
import { stardiumWriteState } from '@/store/stardiumWriteSlice';
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

export const stardiumApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getStadiumList: builder.query({
      query: (location: geoLocationType) => ({
        url: `/stadiums/near-loc?lat=${location.lat}&lnt=${location.lnt}`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzA5MzAxNDcsImV4cCI6MTY3MTUzNDk0N30.BpnzuVog-enOtsxkibExTYJfIGV_so4qaU20qAQow5w',
        },
        method: 'GET',
      }),
    }),
    addStadium: builder.mutation({
      query: (stardium: stardiumWriteState) => ({
        url: '/stadiums/register',
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzA5MzAxNDcsImV4cCI6MTY3MTUzNDk0N30.BpnzuVog-enOtsxkibExTYJfIGV_so4qaU20qAQow5w',
        },
        body: stardium,
      }),
    }),
    searchStadium: builder.mutation<SearchStadiumResponse, string>({
      query: search => ({
        url: `/stadiums/search?searchValue=${search}`,
        transformResponse: (response: { data: SearchStadiumResponse }) => response.data,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStadiumListQuery, useAddStadiumMutation, useSearchStadiumMutation } = stardiumApi;
