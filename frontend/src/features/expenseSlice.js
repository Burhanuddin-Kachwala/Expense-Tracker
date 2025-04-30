import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getExpenses = createAsyncThunk("expense/getExpenses", async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/expenses');
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
// At the top
 export const addExpense = createAsyncThunk("expense/addExpense", async (expenseData, thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/expenses", expenseData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error adding expense");
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
            .addCase(getExpenses.pending, (state) => {
                state.isloading = true;
                state.error = null;
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.isloading = false;
                state.expenses = action.payload;
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.payload;
            })
            .addCase(addExpense.pending, (state) => {
                // state.isloading = true;
                state.error = null;
              })
              .addCase(addExpense.fulfilled, (state, action) => {
                state.isloading = false;
                state.expenses.push(action.payload);
              })
              .addCase(addExpense.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.payload;
              });
    }
    
});

export const  {removeExpense,setLoading,setError} = expenseSlice.actions;
export default expenseSlice.reducer;