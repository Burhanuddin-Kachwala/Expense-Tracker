import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../axiosClient";
//fetch all
export const getExpenses = createAsyncThunk("expense/getExpenses", async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('http://127.0.0.1:8000/api/expenses');
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

//add
 export const addExpense = createAsyncThunk("expense/addExpense", async (expenseData, thunkAPI) => {
    try {
      const response = await axiosClient.post("http://127.0.0.1:8000/api/expenses", expenseData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error adding expense");
    }
  });
  //delete
export const removeExpense = createAsyncThunk(
    "expense/removeExpense",
    async (id, thunkAPI) => {     
        try {
            await axiosClient.delete(`http://127.0.0.1:8000/api/expenses/${id}`);
            return { id: id };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error removing expense");
        }
    }
);
//edit
export const editExpense = createAsyncThunk(
    "expense/editExpense",
    async (updatedExpense, thunkAPI) => {
      const { id, ...data } = updatedExpense;
      try {
        const response = await axiosClient.put(`http://127.0.0.1:8000/api/expenses/${id}`, data);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Error updating expense");
      }
    }
  );
  

const intialState = {
    expenses: [],
    isloading: false,
    error:null,
};



const expenseSlice = createSlice({
    name: "expense",
    initialState: intialState,
    reducers: {
       
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
              })
              .addCase(removeExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter(
                  (expense) => expense.id !== action.payload.id
                );
              })
              .addCase(removeExpense.rejected, (state, action) => {
                state.error = action.payload;
              })
              .addCase(editExpense.fulfilled, (state, action) => {
                const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
                if (index !== -1) {
                  state.expenses[index] = action.payload;
                }
              })
              .addCase(editExpense.rejected, (state, action) => {
                state.error = action.payload;
              });
    }
    
});

export const  {setLoading,setError} = expenseSlice.actions;
export default expenseSlice.reducer;