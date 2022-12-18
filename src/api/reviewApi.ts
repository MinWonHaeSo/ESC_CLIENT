import { PageType } from './../types/pageType';
import { baseApi } from '@/api/baseApi';

export type ContentType = {
  id: string;
  star: number;
  comment: string;
  nickname: string;
  memberId: string;
  createdAt: string;
};

interface GetReviewResponse extends PageType {
  content: ContentType[];
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReviewList: builder.query<GetReviewResponse, { id: string; pageNum?: number }>({
      query: ({ id, pageNum = 0 }) => ({
        url: `/stadiums/${id}/reviews?page=${pageNum}&size=${5}&sort=${'createdAt'},DESC`,
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
      query: ({ stadiumId, reviewId }: { stadiumId: string; reviewId: string }) => ({
        url: `/stadiums/${stadiumId}/reviews/${reviewId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetReviewListQuery, useAddReviewMutation, useRemoveReviewMutation, useUpdateReviewMutation } =
  reviewApi;
