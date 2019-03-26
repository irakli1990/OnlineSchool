import { Moment } from 'moment';

export interface IUczen {
    id?: number;
    imie?: string;
    pesel?: string;
    dataUrodzenia?: Moment;
    email?: string;
}

export class Uczen implements IUczen {
    constructor(public id?: number, public imie?: string, public pesel?: string, public dataUrodzenia?: Moment, public email?: string) {}
}
