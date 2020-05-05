import { AddressInterface } from "./order";

export interface ShowroomInterface {
  id: string;
  name: string;
  address: AddressInterface;
}

export interface ShowroomTimeSlotInterface {
  startTime: string;
  endTime: string;
  id: number;
  slotsRemaining: number;
}
