import { Injectable } from '@angular/core';
import { CategModel } from './categ-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategService {
  private categs: CategModel[];

  constructor(private http: HttpClient) 
   { }

  getAllCategs(): Observable<CategModel[]> {
     return this.http.get<CategModel[]>(`${environment.firebase.baseUrl}/categs.json`)
        .pipe(map(data => Object.values(data)));
    // return this.http.get<CategModel[]>(`${environment.firebase.baseUrl}/categs.json`)
    //     .map(data => Object.values(data));
  }

  getCategById(id: string): Observable<CategModel> {
    return this.http.get<CategModel>(`${environment.firebase.baseUrl}/categs/${id}.json`);


    //const cat = this.categs.filter(x => x.id === +id);
   // return cat.length > 0 ? cat[0] : new CategModel(CategModel.emptyCateg);
  }
}
