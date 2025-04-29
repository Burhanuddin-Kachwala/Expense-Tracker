import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getExpenses = createAsyncThunk("expense/getExpenses", async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/expenses');
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


const intialState = {
    expenses: [],
    isloading: false,
    error:null,
};



const expenseSlice = createSlice({
    name: "expense",
    initialState: intialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id);
        },
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase("FETCH_EXPENSES_REQUEST", (state) => {
                state.isloading = true;
            })
            .addCase("FETCH_EXPENSES_SUCCESS", (state, action) => {
                state.isloading = false;
                state.expenses = action.payload;
                state.error = null;
            })
            .addCase("FETCH_EXPENSES_FAILURE", (state, action) => {
                state.isloading = false;
                state.error = action.payload;
            });
    }
});

export const  {addExpense,removeExpense,setLoading,setError} = expenseSlice.actions;
export default expenseSlice.reducer;