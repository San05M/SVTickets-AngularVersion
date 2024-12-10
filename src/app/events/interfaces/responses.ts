import { MyEvent } from "./my-event";

export interface EventsResponse {
    events: MyEvent[];
}

export interface SingleEventResponse {
    event: MyEvent;
}