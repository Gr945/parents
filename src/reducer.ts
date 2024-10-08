import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
const initialState: CounterState = {
    parents: [],
    children: []
}
export type Child = {
    id: string;
    name: string;
    parentId: string;
}

export type Parent = {
    id: string;
    title: string;
}

export interface CounterState {
    parents: Parent[];
    children: Child[]
}


export const counterSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addParrent: (state, action: PayloadAction<Parent>) => {
            state.parents = [...state.parents, action.payload]
        },
        addChildren: (state, action: PayloadAction<Child>) => {
            state.children = [...state.children, action.payload]
        },
        deleteChildren: (state, action: PayloadAction<string>) => {
            state.children = state.children.filter((el: Child) => el.id !== action.payload)
        },
    }
})
export const { addParrent, addChildren, deleteChildren} = counterSlice.actions

export const selectCount = (state: RootState) => state.todoReducer

export default counterSlice.reducer