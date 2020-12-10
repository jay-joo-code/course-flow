
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
  isComplete: boolean
  isActive: boolean
  userId: string | undefined
  views: number

  // init data
  address: string
  milesToCampus: number
  lat: number
  lng: number

  // property
  regionCode: string | undefined
  propertyTypeCode: '1' | '2' | '3' | '4' | undefined
  furnishingCode: '1' | '2' | '3' | undefined
  bedroomsTotal: number | undefined
  bedroomsAvailable: number | undefined
  bathroomsTotal: number | undefined

  // dates
  year: '2021' | '2022' | '2023' | '2024' | undefined
  termCode: '1' | '2' | '3' | '4' | undefined
  startDate: Date | undefined
  endDate: Date | undefined

  // rent
  rent: number | undefined
  deposit: number | undefined

  // utilities
  isUtilIncluded: boolean | undefined
  separateUtils: string[] | undefined
  utilCost: number | undefined

  // roommates
  roommates: IRoommate[] | undefined
  tenantGenderCode: '1' | '2' | '3' | undefined

  // photos
  photos: IPhoto[] | undefined

  // description
  description: string | undefined
}

export interface IPhoto {
  src: string
}

export interface IRoommate {
  gender: 'Male' | 'Female' | string
}
