import {Person} from "./person";

export class Transaction {

  id: number;

  payer: Person;

  payerIBAN: string;

  payee: Person;

  payeeIBAN: string;

  amount: number;

  transactionTypeId: number;

  currencyId: number;

 }
