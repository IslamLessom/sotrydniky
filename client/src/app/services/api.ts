import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.user?.token ||
            localStorage.getItem('token')

        if (token && token !== null) {
            headers.set('authorization', `Bearer ${token}`)
        }
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 }) //если запрос провалился то повтори его три раза https://async-transformresponse--rtk-query-docs.netlify.app/concepts/error-handling/

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})
