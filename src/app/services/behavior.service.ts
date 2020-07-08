import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
    providedIn: "root"
})
export class DataService {
    dataSource = new BehaviorSubject<string>(null);
    data = this.dataSource.asObservable();

    constructor() { }

    

    updatedDataSelection(id: string) {
        return this.dataSource.next(id);
    }

}   