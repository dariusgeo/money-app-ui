import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {TransactionType} from "./transactionType";

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  apiURL = 'http://localhost:9092/api/transaction-types';

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get<TransactionType[]>(`${this.apiURL}/all`, { observe: 'response'}).pipe(tap(result => {
      return result;
    }));
  }

}
