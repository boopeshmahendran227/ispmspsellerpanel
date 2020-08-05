import { AddressInterface } from "./order";

export interface ShowroomInterface {
  id: string;
  name: string;
  address: AddressInterface;
}

export interface ShowroomVisitInterface {
  bookingId: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
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
