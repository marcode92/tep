import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { CrudService } from 'src/crud.service';
import { IReadFile, ISheetMonths } from '../upload-info/ITep';

@Component({
  selector: 'app-tep-calculate',
  templateUrl: './tep-calculate.component.html',
  styleUrls: ['./tep-calculate.component.scss']
})
export class TepCalculateComponent implements OnInit {
  months: string[] = []

  strForm : FormGroup = new FormGroup({
    monthCtrl : new FormControl(),
    nameCtrl : new FormControl(),
    surnameCtrl : new FormControl(),
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

  get monthCtrl(){
    return this.strForm.get('monthCtrl')!.value
  }

  get nameCtrl(){
    return this.strForm.get('nameCtrl')!.value
  }
  
  get surnameCtrl(){
    return this.strForm.get('surnameCtrl')!.value
  }
    
  get payFestivo(){
    return this.strForm.get('payFestivo')!.value
  }

  get payFeriale(){
    return this.strForm.get('payFeriale')!.value
  }

  get payNonFestivo(){
    return this.strForm.get('payNonFestivo')!.value
  }

  get lavFestivo(){
    return this.strForm.get('lavFestivo')!.value 
  }

  get lavFeriale(){
    return this.strForm.get('lavFeriale')!.value 
  }
  
  get lavNonFestivo(){
    return this.strForm.get('lavNonFestivo')!.value 
  }

  get rmpFestivo(){
    return this.strForm.get('rmpFestivo')!.value 
  }
  
  get rmpFeriale(){
    return this.strForm.get('rmpFeriale')!.value 
  }

  get rmpNonFestivo(){
    return this.strForm.get('rmpNonFestivo')!.value 
  }

  constructor(private readonly crudService: CrudService){

  }  
  
  ngOnInit() {
    for(let i = 1; i<=12; i++){
      this.months.push( moment(`0${i}`).locale('it').startOf("month").format('MMMM') ) 
    }
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

  calculate(){
    const fields: IReadFile = {
      name: this.nameCtrl,
      surname: this.surnameCtrl,
      pagateFeriali: this.payFeriale,
      pagateFestivi: this.payFestivo,
      pagateNonFestivi: this.payNonFestivo,
      lavorateFeriali: this.lavFeriale,
      lavorateFestivi: this.lavFestivo,
      lavorateNonFestivi: this.lavNonFestivo
    }

    const sheetMonths: ISheetMonths = {
      mese: 1,
      sheet: [fields],
    }

    console.log(sheetMonths);

/*     month: this.monthCtrl.value(),
 */    /* this.crudService.createExtra(sheetMonths).subscribe((result: any) => {
      console.log(result);
    }) */
  }
}
