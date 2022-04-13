import { AppDispatch, RootState } from '../store';

type AppDispatchType = AppDispatch;
type RootStateType = RootState;
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
    type eventType
};
