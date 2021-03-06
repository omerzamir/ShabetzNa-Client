import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    private readonly apiURL: string = 'http://localhost:3001/api/user/';

    getAllUsers(){
        return [{
            "_id":"59d09ee280291065889daf49",
            "userName": "Omer",
            "firstName": "עומר",
            "lastName": "זמיר",
            "job": "מפתח",
            "hierarchy":["תכניתן מס 1","עומר"],
            "directGroup":"59gf8hjk158869423654d5a"
        },
        {
            "_id":"59d09ee280291065989daf49",
            "userName": "Omer",
            "firstName": "ggg",
            "lastName": "זמgggיר",
            "job": "מפתח",
            "hierarchy":["תכניתן מס 1","עומר"],
            "directGroup":"59gf8hjk154567893654d5a"
        }];
    }
}
