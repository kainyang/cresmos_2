export interface ValidationError {
    message: string;
    property: string;
    validationKey: string;
}

export interface ValidationMessage {
    message: string;
    property: string;
    replacements: ValidationErrorReplacement[];
}

export interface ValidationErrorReplacement {
    key: string;
    value: any;
}

export interface UserModel {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserForm extends UserModel {
    confirmPassword: string;
}

export interface ForgetPasswordModel {
    email: string;
}

export interface ResetPasswordModel {
    email: string;
    password: string;
    confirmPassword: string;
    token: string;
}

export interface LoginModel {
    userName: string;
    password: string;
}

export interface RegisteredUsers {
    userNames: string[];
}

export enum NavArea {
    None = '',
    Profile = 'profile',
    Administrator = 'administrator',
}

export interface URLTracker {
    current: string;
    previous: string;
}

export interface Country {
    name: string;
    ISOCode: string;
}

export class TabNavLink {
    constructor(public text: string, public link: string, public icon?: string, public active: boolean = true) { }
}

export class Payment {
    tokenID: string;
    description: string;
    amount: number;
}

export enum FeedbackResult {
    Confirm = 1
}
