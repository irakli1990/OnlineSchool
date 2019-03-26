import { IUczen } from 'app/shared/model/uczen.model';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';

export interface IOcena {
    id?: number;
    rodzaj?: number;
    uczen?: IUczen;
    przedmiot?: IPrzedmiot;
}

export class Ocena implements IOcena {
    constructor(public id?: number, public rodzaj?: number, public uczen?: IUczen, public przedmiot?: IPrzedmiot) {}
}
