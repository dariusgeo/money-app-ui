import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { TransactionService } from '../transaction.service';
import { TransactionTypeService } from "../transactionType.service";
import { CurrencyService } from '../currency.service';

import { ActivatedRoute, Router } from "@angular/router";
import { TransactionType } from "../transactionType";
import { Currency } from "../currency";
import {Person} from "../person";
import {Transaction} from "../transaction";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: Transaction;
  transactionTypes: TransactionType[] = [];
  currencies: Currency[] = [];
  transactionForm: FormGroup;
  ibanReactive: FormControl;
  payer: Person;
  payee: Person;
  submitted = false;
  success = false;
  subscriber;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router, private transactionService: TransactionService,
              private transactionTypeService: TransactionTypeService, private currencyService: CurrencyService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.transactionTypeService.getAll().subscribe(data => {
      for(let i = 0 ; i < data.body.length; i++){
        this.transactionTypes.push(data.body[i]);
      }
    });

    this.currencyService.getAll().subscribe(data => {
      for(let i = 0 ; i < data.body.length; i++){
        this.currencies.push(data.body[i]);
      }
    });

    this.ibanReactive = new FormControl(
      null,
      [
        Validators.required,
        ValidatorService.validateIban
      ]
    );
  }

  onSubmit(){
    this.submitted = true;
    if(this.transactionForm.invalid){
      return;
    }

    this.payer = new Person();
    this.payer.firstname= this.transactionForm.controls.payer_firstname.value;
    this.payer.lastname= this.transactionForm.controls.payer_lastname.value;
    this.payer.cnp= this.transactionForm.controls.payer_cnp.value;

    this.payee = new Person();
    this.payee.firstname= this.transactionForm.controls.payee_firstname.value;
    this.payee.lastname= this.transactionForm.controls.payee_lastname.value;
    this.payee.cnp= this.transactionForm.controls.payee_cnp.value;

    this.transaction = new Transaction();
    this.transaction.payer = this.payer;
    this.transaction.payerIBAN = this.transactionForm.controls.payer_iban.value;
    this.transaction.payee = this.payee;
    this.transaction.payeeIBAN = this.transactionForm.controls.payee_iban.value;
    this.transaction.amount = this.transactionForm.controls.amount.value;
    this.transaction.transactionTypeId = this.transactionForm.controls.transactionType.value;
    this.transaction.currencyId = this.transactionForm.controls.currency.value;

    this.success = true;

    if (this.transaction.id == null){
      this.subscriber = this.activatedRoute.paramMap.subscribe(params => {
        this.transactionService.createTransaction(this.transaction).subscribe(result => {
            this.router.navigate(['/']);
        });
      });
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  createForm() {
    this.transactionForm = this.formBuilder.group({
      payer_firstname: ['', Validators.required ],
      payer_lastname: ['', Validators.required ],
      payer_iban: ['', Validators.required ],
      payer_cnp: ['', Validators.required ],
      amount: ['', Validators.required ],
      transactionTypes: [''],
      transactionType: ['', Validators.required],
      currencies: [''],
      currency: ['', Validators.required],
      payee_firstname: ['', Validators.required ],
      payee_lastname: ['', Validators.required ],
      payee_iban: ['', Validators.required ],
      payee_cnp: ['', Validators.required ]
    });
  }


}
