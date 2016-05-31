import { Injectable } from '@angular/core'
import { BaseService } from './all'
import { Http, Headers } from '@angular/http';

@Injectable()
export class PlacasService extends BaseService {
    constructor(private http: Http) {
        super();
    }
    
    getPlacas(){
        return this.http.get(this.baseUrl + '/placas')
    }
}