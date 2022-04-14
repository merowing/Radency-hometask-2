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
type archiveTypes = Array<{
    id: number,
    category: string,
    active: number,
    archived: number,
}>;
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
    type archiveTypes,
    type eventType
};
