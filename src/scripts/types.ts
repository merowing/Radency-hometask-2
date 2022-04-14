import { AppDispatch, RootState } from '../store';

type AppDispatchType = AppDispatch;
type RootStateType = RootState;
type noteTypes = {
    id: any,
    name: string,
    created: number,
    category: string,
    description: string,
    archived: number,
}
type archiveStatisticTypes = {
    id: number,
    category: string,
    active: number,
    archived: number,

    created?: string,
    description?: string,
    name?: string,
};
type modalWindowTypes = {
    data: formDataTypes;
    visibility?: boolean;
}
type formDataTypes = {
    id: number | null;
    name: string;
    category: string;
    description: string;
}

type eventType = React.FormEvent<EventTarget>;

export {
    type AppDispatchType,
    type RootStateType,
    type formDataTypes,
    type modalWindowTypes,
    type noteTypes,
    type archiveStatisticTypes,
    type eventType
};
