export interface IPrzedmiot {
    id?: number;
    nazwa?: string;
}

export class Przedmiot implements IPrzedmiot {
    constructor(public id?: number, public nazwa?: string) {}
}
