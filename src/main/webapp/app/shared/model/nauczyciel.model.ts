export interface INauczyciel {
    id?: number;
    imie?: string;
    nazwisko?: string;
    pesel?: string;
    email?: string;
    adres?: string;
}

export class Nauczyciel implements INauczyciel {
    constructor(
        public id?: number,
        public imie?: string,
        public nazwisko?: string,
        public pesel?: string,
        public email?: string,
        public adres?: string
    ) {}
}
