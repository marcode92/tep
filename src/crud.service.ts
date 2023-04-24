import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISheetMonths } from './app/upload-info/ITep';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  basePath ='http://localhost:8090';

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {

   }

   createExtra(body: ISheetMonths):any{
    const test = { 
      "cognome":"marco",
      "nome": "damore",
      "mese": 1,
      "lavorateFeriali": 80,
      "lavorateFestivi": 100,
      "lavorateNonFestivi": 80,
      "pagateFeriali": 50,
      "pagateFestivi": 50,
      "pagateNonFestivi": 50   
      }
    return this.http.post(`${this.basePath}/createextratime`, test, {headers: this.headers})    
  }
}
