export interface BaseMemberType {
  id: string;
  email: string;
  imgUrl: string;
  name: string;
  nickname: string;
}

export type RentalMemberType = Omit<BaseMemberType, 'name' | 'imgUrl'>;
