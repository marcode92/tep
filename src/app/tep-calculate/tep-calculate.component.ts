import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-tep-calculate',
  templateUrl: './tep-calculate.component.html',
  styleUrls: ['./tep-calculate.component.scss']
})
export class TepCalculateComponent implements OnInit {
  
  months = moment.monthsShort();
  strForm : FormGroup = new FormGroup({
    monthCtrl : new FormControl(),
    nameCtrl : new FormControl(),
    rmpFestivo : new FormControl(),
    rmpFeriale : new FormControl(),
    rmpNonFestivo: new FormControl(),
    lavFestivo : new FormControl(),
    lavFeriale : new FormControl(),
    lavNonFestivo: new FormControl(),
    totFestivo : new FormControl(),
    totFeriale : new FormControl(),
    totNonFestivo: new FormControl(),
    payFestivo : new FormControl(),
    payFeriale : new FormControl(),
    payNonFestivo: new FormControl(),
    payHFestivo : new FormControl(),
    payHFeriale : new FormControl(),
    payHNonFestivo: new FormControl(),
    rmCurrFestivo : new FormControl(),
    rmCurrFeriale : new FormControl(),
    rmCurrNonFestivo: new FormControl(),
  }); 

  constructor(){

  }  
  
  ngOnInit() {
    this.createForm();
  }

  createForm() {
  /*   this.strForm.setValue({
      monthCtrl: [null, Validators.required],
      nameCtrl: [null, Validators.required],
    }); */
  }

  upload(){
    console.log("here");
  }
}
