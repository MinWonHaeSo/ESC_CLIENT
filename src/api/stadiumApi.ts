import { geoLocationType } from '@/hooks/useCurrentLocation';
import { stadiumWriteState } from '@/store/stadiumWriteSlice';
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

export const stadiumApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getStadiumList: builder.query({
      query: (location: geoLocationType) => ({
        url: `/stadiums/near-loc?lat=${location.lat}&lnt=${location.lnt}`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzExMTI1NjAsImV4cCI6MTY3MTcxNzM2MH0.DsX3Aty8RJnXc3HX1bTEBTfSBBe5Lk_QVV-Um2k4VSE',
        },
        method: 'GET',
      }),
    }),
    addStadium: builder.mutation({
      query: (stadium: stadiumWriteState) => ({
        url: '/stadiums/register',
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzExMTI1NjAsImV4cCI6MTY3MTcxNzM2MH0.DsX3Aty8RJnXc3HX1bTEBTfSBBe5Lk_QVV-Um2k4VSE',
        },
        body: stadium,
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

export const { useGetStadiumListQuery, useAddStadiumMutation, useSearchStadiumMutation } = stadiumApi;
