import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOcena } from 'app/shared/model/ocena.model';

type EntityResponseType = HttpResponse<IOcena>;
type EntityArrayResponseType = HttpResponse<IOcena[]>;

@Injectable({ providedIn: 'root' })
export class OcenaService {
    public resourceUrl = SERVER_API_URL + 'api/ocenas';

    constructor(protected http: HttpClient) {}

    create(ocena: IOcena): Observable<EntityResponseType> {
        return this.http.post<IOcena>(this.resourceUrl, ocena, { observe: 'response' });
    }

    update(ocena: IOcena): Observable<EntityResponseType> {
        return this.http.put<IOcena>(this.resourceUrl, ocena, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOcena>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOcena[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
