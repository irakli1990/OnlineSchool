export interface IOcena {
    id?: number;
    rodzaj?: number;
}

export class Ocena implements IOcena {
    constructor(public id?: number, public rodzaj?: number) {}
}
