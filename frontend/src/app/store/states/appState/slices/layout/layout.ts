import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutItem } from '../layout/types';
import { getLayoutFromLocalStorage, findLayoutItemById } from './helpers';
import { EditTileInputsData } from '../../../../../Components/Overlay/OverlayContent/EditTileForm/types';
// import mock from '../../../../../../layout-mock';

// const initialState: LayoutItem[] = getLayoutFromLocalStorage() || mock;
const initialState: LayoutItem[] = getLayoutFromLocalStorage() || [];

export const LayoutStateSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<LayoutItem[]>) => action.payload,
    setLayoutItemData: (state, action: PayloadAction<EditTileInputsData>) => {
      const { id } = action.payload;
      const layoutItem = findLayoutItemById(state, id);

      layoutItem.data.content = action.payload.content;
      layoutItem.data.styles = action.payload.styles;
    },
    deleteLayoutItemById: (state, action: PayloadAction<string>) => {
      state.splice(state.indexOf(findLayoutItemById(state, action.payload)), 1);
    },
  },
});

export const { setLayout, setLayoutItemData, deleteLayoutItemById } = LayoutStateSlice.actions;

export default LayoutStateSlice.reducer;
