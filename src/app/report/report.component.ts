import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../report.service";
import {Report} from "../report";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  report: Report;
  subscriber;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router, private reportService: ReportService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.report = new Report();
    this.report.cnp = this.reportForm.controls.cnp.value;
    this.report.iban = this.reportForm.controls.iban.value;

    if (this.report.id == null){
      this.subscriber = this.activatedRoute.paramMap.subscribe(params => {
        this.reportService.generateReport(this.report).subscribe(result => {
          this.router.navigate(['/']);
        });
      });
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  createForm() {
    this.reportForm = this.formBuilder.group({
      cnp: ['', Validators.required ],
      iban: ['', Validators.required ]
    });
  }

}
