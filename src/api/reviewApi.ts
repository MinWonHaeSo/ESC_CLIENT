import { PageType } from './../types/pageType';
import { baseApi } from '@/api/baseApi';

interface MemberType {
  id: string;
  email: string;
  imgUrl: string;
  name: string;
  nickname: string;
}

export interface ContentType {
  id: string;
  star: number;
  comment: string;
  createdAt: string;
  member: MemberType;
}

interface GetReviewResponse extends PageType {
  content: ContentType[];
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReviewList: builder.query<GetReviewResponse, { id: string; page?: number }>({
      query: ({ id, page = 0 }) => ({
        url: `/stadiums/${id}/reviews?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: GetReviewResponse }) => response.data,
        method: 'GET',
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, comment, star }: { id: string; comment: string; star: number }) => ({
        url: `/stadiums/${id}/reviews`,
        body: { comment, star },
        method: 'POST',
      }),
    }),
    removeReview: builder.mutation({
      query: ({ stadiumId, reviewId }: { stadiumId: string; reviewId: string }) => ({
        url: `/stadiums/${stadiumId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
    }),
    updateReview: builder.mutation({
      query: ({
        stadiumId,
        reviewId,
        comment,
        star,
      }: {
        stadiumId: string;
        reviewId: string;
        comment: string;
        star: number;
      }) => ({
        url: `/stadiums/${stadiumId}/reviews/${reviewId}`,
        body: {
          comment,
          star,
        },
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetReviewListQuery, useAddReviewMutation, useRemoveReviewMutation, useUpdateReviewMutation } =
  reviewApi;
