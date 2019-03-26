import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKlasa } from 'app/shared/model/klasa.model';

type EntityResponseType = HttpResponse<IKlasa>;
type EntityArrayResponseType = HttpResponse<IKlasa[]>;

@Injectable({ providedIn: 'root' })
export class KlasaService {
    public resourceUrl = SERVER_API_URL + 'api/klasas';

    constructor(protected http: HttpClient) {}

    create(klasa: IKlasa): Observable<EntityResponseType> {
        return this.http.post<IKlasa>(this.resourceUrl, klasa, { observe: 'response' });
    }

    update(klasa: IKlasa): Observable<EntityResponseType> {
        return this.http.put<IKlasa>(this.resourceUrl, klasa, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IKlasa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IKlasa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
