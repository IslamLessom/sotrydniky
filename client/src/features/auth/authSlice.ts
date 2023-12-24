//slice - reduser
import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import { RootState } from '../../app/store'

interface InitialState {
    user: User & { token: string } | null,
    isAuthenticated: boolean
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
}


