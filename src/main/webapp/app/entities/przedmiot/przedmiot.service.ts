import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';

type EntityResponseType = HttpResponse<IPrzedmiot>;
type EntityArrayResponseType = HttpResponse<IPrzedmiot[]>;

@Injectable({ providedIn: 'root' })
export class PrzedmiotService {
    public resourceUrl = SERVER_API_URL + 'api/przedmiots';

    constructor(protected http: HttpClient) {}

    create(przedmiot: IPrzedmiot): Observable<EntityResponseType> {
        return this.http.post<IPrzedmiot>(this.resourceUrl, przedmiot, { observe: 'response' });
    }

    update(przedmiot: IPrzedmiot): Observable<EntityResponseType> {
        return this.http.put<IPrzedmiot>(this.resourceUrl, przedmiot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrzedmiot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrzedmiot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
