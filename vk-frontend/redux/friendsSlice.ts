import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@/utils/types/post';


export const friendsSlice = createApi({
  reducerPath: 'friends',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/friends`, credentials: 'include' }),
  endpoints: builder => ({
    getRecommendations: builder.query<User[], void>({
      query: () => '/recommendations'
    })
  })
})

export const { useGetRecommendationsQuery } = friendsSlice