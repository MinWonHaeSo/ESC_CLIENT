import { geoLocationType } from '@/hooks/useCurrentLocation';
import { stardiumWriteState } from '@/store/stardiumWriteSlice';
import { baseApi } from './baseApi';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzA2MDYwODgsImV4cCI6MTY3MTIxMDg4OH0.340Mtq4hLEL73wgrByLODF7sMnFh8uNLkIPLn4CeGQU';

const stardiumApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getStardiumList: builder.query({
      query: (location: geoLocationType) => ({
        url: `/stadium/near-loc?lat=${32}&lnt=${127}`,
        method: 'GET',
      }),
    }),
    addStardium: builder.mutation({
      query: (stardium: stardiumWriteState) => ({
        url: '/stadiums/register',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: stardium,
      }),
    }),
  }),
});

export const { useGetStardiumListQuery, useAddStardiumMutation } = stardiumApi;