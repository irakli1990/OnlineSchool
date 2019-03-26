export interface IKlasa {
    id?: number;
    nazwaklasi?: string;
}

export class Klasa implements IKlasa {
    constructor(public id?: number, public nazwaklasi?: string) {}
}
