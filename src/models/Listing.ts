import mongoose from 'mongoose'

const { Schema } = mongoose;

const listingSchema = new Schema({
  // metadata
  isComplete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  views: {
    type: Number,
    default: 0,
  },

  // init data
  address: {
    type: String,
    required: true,
  },
  milesToCampus: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },

  // property
  regionCode: {
    type: String,
  },
  propertyTypeCode: {
    // 1: apartment, 2: house, 3: townhouse, 4: condo
    type: String,
  },
  furnishingCode: {
    // 1: unfurnished, 2: partially, 3: fully
    type: String,
  },
  bedroomsTotal: {
    type: Number,
  },
  bedroomsAvailable: {
    type: Number,
  },
  bathroomsTotal: {
    type: Number,
  },

  // dates
  year: {
    type: String,
  },
  termCode: {
    // 1: winter, 2: spring, 3: summer, 4: fall
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

  // rent
  rent: {
    type: Number,
  },
  deposit: {
    type: Number,
  },

  // utilities
  isUtilIncluded: {
    type: Boolean,
  },
  separateUtils: {
    type: [String]
  },
  utilCost: {
    type: Number
  },

  // roommates
  roommates: {
    type: [{
      gender: {
        // 'Male' | 'Female' | String
        type: String,
      },
    }],
  },
  tenantGenderCode: {
    // 1: female, 2: male, 3: I don't mind
    type: Number,
  },

  // photos
  photos: {
    // first photo is thumbnail
    type: [{
      src: {
        type: String,
        required: true,
      }
    }],
  },


  // description
  description: {
    type: String,
  },

}, { timestamps: true });

export interface ListingDoc extends mongoose.Document {
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

export default mongoose.model<ListingDoc>('Listing', listingSchema)
