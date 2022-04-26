import { AppDispatch, RootState } from '../store';

type AppDispatchType = AppDispatch;
type RootStateType = RootState;
type noteTypes = {
    id: number,
    name: string,
    created: number,
    category: number,
    description: string,
    archived: number,
    [key: string]: string | number,
}
type noteEditTypes = {
    id: number,
    name: string,
    category: number,
    description: string,
}
type archiveStatisticTypes = {
    id: number,
    category: number,
    active: number,
    archived: number,

    [key: string]: any,
};
type formDataTypes = {
    id: number | null;
    name: string;
    category: number;
    description: string;
}

type eventType = React.FormEvent<EventTarget>;

export {
    type AppDispatchType,
    type RootStateType,
    type formDataTypes,
    type noteTypes,
    type noteEditTypes,
    type archiveStatisticTypes,
    type eventType
};
