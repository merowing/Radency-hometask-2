import { AppDispatch, RootState } from '../store';

type AppDispatchType = AppDispatch;
type RootStateType = RootState;
type formDataType = {
    name: string;
    category: string;
    description: string;
    [key: string]: string | number;
}
type eventType = React.FormEvent<EventTarget>;

export {
    type AppDispatchType,
    type RootStateType,
    type formDataType,
    type eventType
};
