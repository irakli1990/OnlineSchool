import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUczen } from 'app/shared/model/uczen.model';

type EntityResponseType = HttpResponse<IUczen>;
type EntityArrayResponseType = HttpResponse<IUczen[]>;

@Injectable({ providedIn: 'root' })
export class UczenService {
    public resourceUrl = SERVER_API_URL + 'api/uczens';

    constructor(protected http: HttpClient) {}

    create(uczen: IUczen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(uczen);
        return this.http
            .post<IUczen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(uczen: IUczen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(uczen);
        return this.http
            .put<IUczen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUczen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUczen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(uczen: IUczen): IUczen {
        const copy: IUczen = Object.assign({}, uczen, {
            dataUrodzenia: uczen.dataUrodzenia != null && uczen.dataUrodzenia.isValid() ? uczen.dataUrodzenia.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataUrodzenia = res.body.dataUrodzenia != null ? moment(res.body.dataUrodzenia) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((uczen: IUczen) => {
                uczen.dataUrodzenia = uczen.dataUrodzenia != null ? moment(uczen.dataUrodzenia) : null;
            });
        }
        return res;
    }
}
