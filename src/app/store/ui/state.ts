
export interface State {
    sidebar: boolean,
    collapsed: boolean,
    modal?: string,
    pdfSource?: any;
}

export const initialState: State = {
    sidebar: true,
    collapsed: false,
    modal: null
}