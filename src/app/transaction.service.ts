import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from "./transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiURL = 'http://localhost:9092/api/transactions';

  constructor(private httpClient: HttpClient) {

  }

  public createTransaction(transaction: Transaction){
    return this.httpClient.put(`${this.apiURL}`, transaction);
  }
}
