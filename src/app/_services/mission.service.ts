import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
    constructor(private http: Http) {
    }

    private readonly apiURL: string = 'http://localhost:3001/api/mission/';

    getMissions() {
        return this.http.get(this.apiURL)
            .map((res: Response) => res.json());
    }

    getMissionsFrom(date) {
        return this.http.get(this.apiURL + 'from/' + date)
            .map((res: Response) => res.json());
    }

    getMissionsByRange(from, to) {
        return this.http.post(this.apiURL + 'range', {'from': from, 'to': to})
            .map((res: Response) => res.json());
    }

    addMission(mission) {
        return this.http.post(this.apiURL, {
            'type': mission.type,
            'startDate': mission.startDate,
            'endDate': mission.endDate,
            'status': 0,
            'participents': mission.participents
        })
        .map((res: Response) => res.json());
    }
}
