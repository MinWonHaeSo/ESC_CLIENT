import { ReservationStatus } from '@/api/stadiumApi';

export interface BaseStadiumType {
  address: string;
  imgUrl: string;
  name: string;
  tags: string[];
  likes: number;
  star_avg: number;
}

export interface DetailStadiumType extends BaseStadiumType {
  detailAddress: string;
  memberId: string;
  phone: string;
  openTime: string;
  closeTime: string;
}

export interface PriceStadiumType extends BaseStadiumType {
  holidayPricePerHalfHour: number;
  weekdayPricePerHalfHour: number;
}

export interface LocationStadiumType extends BaseStadiumType {
  lat: string;
  lnt: string;
}

export interface LikeStadiumType extends Omit<BaseStadiumType, 'tags' | 'likes' | 'star_avg'> {
  id: string;
  stadiumId: string;
  starAvg: number;
  like: boolean;
}

export interface RentalStadiumType extends Pick<BaseStadiumType, 'address' | 'imgUrl' | 'name'> {
  reservationId?: string;
  stadiumId: string;
  starAvg: number;
  status?: ReservationStatus;
}
