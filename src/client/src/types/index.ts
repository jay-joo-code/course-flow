
export interface AuthState {
  accessToken: string | null
}

export interface RootState {
  authState: AuthState
}

export interface TaskDoc {
  _id: string
  name: string
  complete: boolean
  userId: string
}

export interface UserDoc {
  _id: string
  authProvider: 'google'
  providerId?: string
  providerData?: any
  createdAt: Date
  updatedAt: Date
  validatePassword: (candidate: string) => boolean
}

export interface ListingDoc {
  _id: string
  createdAt: Date
  updatedAt: Date
  address: string
  milesToCampus: number
  lat: number
  lng: number
  isComplete: boolean
  isActive: boolean
  userId: string | undefined
  views: number
  regionCode: number | undefined
  propertyTypeCode: 1 | 2 | 3 | 4 | undefined
  furnishingCode: 1 | 2 | 3 | undefined
  bedroomsCount: number | undefined
  year: string | undefined
  termCode: 1 | 2 | 3 | 4 | undefined
  startDate: Date | undefined
  endDate: Date | undefined
  rent: number | undefined
  deposit: number | undefined
  isUtilIncluded: boolean | undefined
  separateUtils: string[] | undefined
  utilCost: number | undefined
  roommates: IRoommate[] | undefined
  tenantGenderCode: 1 | 2 | 3 | undefined
  photos: IPhoto[] | undefined
  description: string | undefined
}

export interface IPhoto {
  src: string
}

export interface IRoommate {
  gender: 'Male' | 'Female' | string
}
