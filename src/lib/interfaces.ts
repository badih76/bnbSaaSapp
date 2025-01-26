export interface IHome {
    categoryName?: string,
    id?: string,
    title?: string,
    photo?: string,
    price?: string,
    country?: string,
    description?: string,
    deleted?: boolean,
    guests?: number,
    bedrooms?: number,
    bathrooms?: number,
    address?: string,
    addedCategory?: boolean,
    addedDescription?: boolean,
    addedLocation?: boolean,
    createdAT?: Date,
    enabled?: boolean,
    facilities?: string
    
}

export interface IAddress {
    value: string,
    label: string,
    lon: number,
    lat: number,
}

export interface IUserSettings {
    hideDeletedListings: boolean,
    currency: string
}

export interface IReservationDetails {
    homeId: string | undefined,
    userId: string | undefined,
    rate: string,
    startDate: string,
    endDate: string,
    guests: number,
    success?: number,
    resToken?: string
}

export enum EListingCardMode {
    Home,
    Reservation
}

export interface IFilters {
    filter? : string,
    country?: string,
    guests?: string,
    rooms?: string,
    bathrooms?: string,
    startDate?: Date,
    endDate?: Date,
    priceMin?: number,
    priceMax?: number,
    facilities?: string
  }