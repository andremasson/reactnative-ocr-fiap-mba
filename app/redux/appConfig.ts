import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AppConfigState {
    mediaPermission: boolean,
    cameraPermission: boolean
}

const initialState = { mediaPermission: false, cameraPermission: false } as AppConfigState;

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setMediaPermission(state, action: PayloadAction<boolean>) {
            state.mediaPermission = action.payload;
        },
        setCameraPermission(state, action: PayloadAction<boolean>) {
            state.cameraPermission = action.payload;
        }
    }
});

export const { setMediaPermission, setCameraPermission } = configSlice.actions;
export const getMediaPermission = (state: RootState) => state.appConfigReducer.mediaPermission;
export const getCameraPermission = (state: RootState) => state.appConfigReducer.cameraPermission;
export default configSlice.reducer;