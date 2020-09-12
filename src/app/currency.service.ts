import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Currency} from "./currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiURL = 'http://localhost:9092/api/currencies';

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get<Currency[]>(`${this.apiURL}/all`, { observe: 'response'}).pipe(tap(result => {
      return result;
    }));
  }

}
