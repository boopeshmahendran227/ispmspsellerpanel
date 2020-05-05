import { AddressInterface } from "./order";
import {
  GET_SHOWROOMS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
} from "../constants/ActionTypes";
import moment from "moment";

interface GetShowroomsAction {
  type: typeof GET_SHOWROOMS_REQUEST;
}

interface GetFilteredShowroomVisitsAction {
  type: typeof GET_FILTERED_SHOWROOM_VISITS_REQUEST;
}

interface SetDateFilterAction {
  type: typeof SET_DATE_FILTER_FOR_SHOWROOM_VISIT;
  date: moment.Moment;
}

interface SetShowroomFilterAction {
  type: typeof SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT;
  showroomId: string;
}

export type ShowroomVisitActionType =
  | GetShowroomsAction
  | GetFilteredShowroomVisitsAction
  | SetDateFilterAction
  | SetShowroomFilterAction;

export interface ShowroomInterface {
  id: string;
  name: string;
  address: AddressInterface;
}

export interface ShowroomVisitInterface {
  bookingId: number;
  customerId: string;
  customerName: string;
  date: string;
  startTime: string;
  endTime: string;
  showroomDetails: ShowroomInterface;
}

export interface ShowroomTimeSlotInterface {
  startTime: string;
  endTime: string;
  id: number;
  slotsRemaining: number;
}
