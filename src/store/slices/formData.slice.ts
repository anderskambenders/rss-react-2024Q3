import { createSlice } from '@reduxjs/toolkit';

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tc: boolean;
  image: string;
  country: string;
}

type formData = {
  dataList: IFormData[];
};

const initialState: formData = {
  dataList: [],
};

export const dataListSlice = createSlice({
  name: 'formDataList',
  initialState,
  reducers: {
    addNewSubmit(state, action) {
      state.dataList.push(action.payload);
    },
  },
});

export default dataListSlice.reducer;