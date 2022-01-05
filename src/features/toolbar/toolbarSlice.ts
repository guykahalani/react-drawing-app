import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ToolbarState {
  activeTool: string;
  penColor: string;
  penSize: number;
}

const initialState: ToolbarState = {
    activeTool: 'pen',
    penColor: '#EF476F',
    penSize: 5,
}

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    logTool: (state) => {
      console.log(state.activeTool)
    },
    selectTool: (state, action: PayloadAction<any>) => {
        state.activeTool = action.payload.tool;
        console.log(state.activeTool, action);
        switch (action.payload.tool) {
            case 'clear':
                clearCanvas();
                break;
            case 'penColor':
                state.penColor = action.payload.value;
                break;
            case 'penSize':
                state.penSize = action.payload.value;
                break;
            case 'export':
                exportCanvas();
                break;
            default:
                break;
        }
    }
  },
});

const exportCanvas = () => {
    const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    const dataURL = canvas.toDataURL("image/png");
    const newTab = window.open('about:blank','image from canvas');
    newTab?.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}

const clearCanvas = () => {
    const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export const { logTool, selectTool } = toolbarSlice.actions;

export const selectActiveTool = (state: RootState) => state.toolbar.activeTool;
export const selectPenColor = (state: RootState) => state.toolbar.penColor;
export const selectPenSize = (state: RootState) => state.toolbar.penSize;

export default toolbarSlice.reducer;
