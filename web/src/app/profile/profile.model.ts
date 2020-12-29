import { Item, ItemBasic } from '../value-land/value-land.model';

export interface GameIcon {
    imageURL: string;
    gameTitle: GameTitle;
}

export interface VaultItem {
    id: string;
    name: string;
    imageURL: string;
    rarity: Rarity;
    quantity: number;
}

export interface Activity {
    id: string;
    activityName: string;
    activityType: ActivityType;
    registrationDate: Date;
}

export interface UserProfile {
    id?: string;
    email: string;
    userName?: string;
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
    points?: number;
}

export interface UserDashboard {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    country: string;
    items: ItemBasic[];
}

export interface UserItem {
    userID: string;
    items: Item[];
}

export interface InboxItem {
    id: string;
    eventID: string;
    sender: string;
    receiver: string;
    messageTitle: string;
    messageDescription: string;
    messageType: MessageType;
    messageDate: Date;
    status: boolean;
}

export interface ResetPasswordModel {
    password: string;
    confirmPassword: string;
}

export enum MessageType {
    System = 1,
    EventRegistration = 2,
}


export enum GameTitle {
    Overwatch = 1,
    LeageOfLegends = 2,
    Hearthstone = 3,
}

export enum ActivityType {
    Event = 1,
    Internship = 2,
}

export const enum Placing {
    Gold = 1,
    Silver = 2,
    Bronze = 3,
    None = 0,
}

export const enum Rarity {
    None = 1,
    Common = 2,
    Rare = 3,
    Epic = 4,
    Legendary = 5,
}
