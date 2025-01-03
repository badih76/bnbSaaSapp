import { int, mysqlTable, varchar, text, float, boolean, datetime } from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

export const Users = mysqlTable('users', {
    id: varchar({ length: 255 }).primaryKey(),
  
    email: varchar({ length: 255 }).notNull().unique(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    profileImage: varchar({ length: 255 }).notNull(),

    createdAt: datetime().default(new Date())

});

export const Homes = mysqlTable('homes', {
    id: varchar({ length: 255 }).$defaultFn(() => uuidv4()).primaryKey(),

    userId: varchar({ length: 255 }).notNull(),

    title: varchar({ length: 255 }).notNull(),
    description: text(),
    guests: int().default(0),
    bedrooms: int().default(0),
    bathrooms: int().default(0),
    country: varchar({ length: 5 }).default(''),
    address: varchar({ length: 255 }).default(''),
    photo: text().default(''),
    price: float().default(0),
    facilities: text().default(''),

    category: varchar({ length: 50 }).default(''),
    addedCategory: boolean().default(false),
    addedDescription: boolean().default(false),
    addedLocation: boolean().default(false),

    createdAt: datetime().default(new Date()),

    deleted: boolean().default(false),
    enabled: boolean().default(true),

});

export const Favorites = mysqlTable('favorites', {
    id: varchar({ length: 255 }).$defaultFn(() => uuidv4()).primaryKey(),

    userId: varchar({ length: 255 }).notNull(),
    homeId: varchar({ length: 255 }).notNull()
})

export const Reservations = mysqlTable('reservations', {
    id: varchar({ length: 255 }).$defaultFn(() => uuidv4()).primaryKey(),

    startDate: datetime().default(new Date()),
    endDate: datetime().default(new Date()),
    rate: float().default(0),
    totalCharged: float().default(0),

    createdAt: datetime().default(new Date()),

    userId: varchar({ length: 255 }).notNull(),
    homeId: varchar({ length: 255 }).notNull(),
    deleted: boolean().default(false),
    deleteDate: datetime()
})

export const Logs = mysqlTable('logs', {
    id: varchar({ length: 255 }).$defaultFn(() => uuidv4()).primaryKey(),

    dateTimeStamp: datetime(),
    level: varchar({ length: 50 }).default(''),
    component: varchar({ length: 100 }).default(''),
    message: text().default(''),
    category: varchar({ length: 100 }).default(''),
    moreinfo: text().default(''),
    stackdump: text().default('')
})