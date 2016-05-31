import { Injectable } from '@angular/core'

@Injectable()
export abstract class BaseService {
    constructor(protected baseUrl: string = 'https://vivendas-project-uriannrima.c9users.io/api') {

    }
}