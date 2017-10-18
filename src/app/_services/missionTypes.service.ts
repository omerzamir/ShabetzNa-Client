import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionTypesService {
    constructor(private http: Http) {
    }

    private readonly apiURL: string = 'http://localhost:3001/api/missiontype/';

    getMissionTypes() {
        return this.http.get(this.apiURL)
            .map((res: Response) => res.json());
    }

    addMIssionType(body) {
        return this.http.post(this.apiURL, body)
            .subscribe();
    }
}
