// tslint:disable: no-empty-interface

export interface EventInformationBasic {
    id: string;
    eventName: string;
    points: number;
}

export interface EventInformation {
    id?: string;
    eventName: string;
    eventDate: Date;
    location: string;
    eventType: EventType;
    points: number;
    country: string;
    imageURL: string;
    description: string;
    participationType: ParticipationType;
    groupSize: number;
    isPaidEvent: boolean;
    amount: number;
    particpants?: string[];
}

export interface HistoricalEventInformation extends EventInformation {

}

export interface EventContext {
    eventID: string;
}

export interface UpdateEventPointsContext {
    usersID: string[];
    eventID: string;
    amount: number;
    transactionType: TransactionType;
}

export interface UserEventBasic {
    eventID: string;
    eventName: string;
}

export interface UserEvent extends UserEventBasic {
    id: string;
    userID: string;
    userName: string;
    registrationDate: Date;
}

export interface TeamEvent {
    eventID: string;
    eventName: string;
    teamName: string;
    membersDetail: MemberDetail[];
}

export interface RegisteredUserEvent {
    eventID: string;
    userNames: string[];
}

export interface MemberDetail {
    userName: string;
    status?: boolean;
    discordName?: string;
    playerIGN?: string;
    gameID?: string;
    dateOfBirth?: Date;
    postalCode?: number;
    phoneNumber?: number;
}

export interface PaymentMethod {
    value: string;
    viewValue: string;
  }

export enum EventType {
    Tournament = 1,
    Internship = 2,
}

export enum ParticipationType {
    Single = 1,
    Group = 2,
}

export enum PaidEvent {
    Yes = 1,
    No = 2
}

export enum TransactionType {
    Credit = 1,
    Debit = 2
}
