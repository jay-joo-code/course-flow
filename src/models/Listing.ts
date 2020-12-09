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
    // TODO: get regions from reference site
    type: Number,
  },
  propertyTypeCode: {
    // 1: apartment, 2: house, 3: townhouse, 4: condo
    type: Number,
  },
  furnishingCode: {
    // 1: unfurnished, 2: partially, 3: fully
    type: Number,
  },
  bedroomsCount: {
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

export default mongoose.model<ListingDoc>('Listing', listingSchema)
