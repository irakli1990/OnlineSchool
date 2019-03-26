import { INauczyciel } from 'app/shared/model/nauczyciel.model';

export interface IKlasa {
    id?: number;
    nazwaklasi?: string;
    nauczyciel?: INauczyciel;
}

export class Klasa implements IKlasa {
    constructor(public id?: number, public nazwaklasi?: string, public nauczyciel?: INauczyciel) {}
}
