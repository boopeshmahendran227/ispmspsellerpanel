import { AddressInterface } from "./order";
import moment from "moment";

export interface ShowroomInterface {
  id: string;
  name: string;
  address: AddressInterface;
  contactNumber: string;
  description: string;
}

export interface ShowroomTimeSlotInterface {
  startTime: string;
  endTime: string;
  id: number;
  slotsRemaining: number;
}

export interface DateRangeFilterInterface {
  startDate: moment.Moment;
  endDate: moment.Moment;
}
