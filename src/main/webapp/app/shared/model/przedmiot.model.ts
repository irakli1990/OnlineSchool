import { INauczyciel } from 'app/shared/model/nauczyciel.model';

export interface IPrzedmiot {
    id?: number;
    nazwa?: string;
    nauczyciel?: INauczyciel;
}

export class Przedmiot implements IPrzedmiot {
    constructor(public id?: number, public nazwa?: string, public nauczyciel?: INauczyciel) {}
}
