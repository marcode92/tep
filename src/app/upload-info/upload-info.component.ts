import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IReadFile } from './ITep';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
type AOA = any[][];

@Component({
  selector: 'app-upload-info',
  templateUrl: './upload-info.component.html',
  styleUrls: ['./upload-info.component.scss']
})
export class UploadInfoComponent {

  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;

  nameControl = new FormControl('');

  row: IReadFile[] = [];
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  names: string[] = [];
  
  onChange(evt: any){
    this.fileInput!.nativeElement.value = null;
  }
  
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
      this.searchByName();
     

    };
    reader.readAsBinaryString(target.files[0]);
  }

  searchByName(){
    this.data.forEach(x => {
      this.row.push({
        name:x[0],
        residuoMesiPrecFeriali:x[1],
        residuoMesiPrecFestivi:x[2],
        residuoMesiPrecNonFestivi:x[3],
        lavorateFeriali:x[4],
        lavorateFestivi:x[5],
        lavorateNonFestivi:x[6],
        totaleFeriali:x[7],
        totaleFestivi:x[8],
        totaleNonFestivi:x[9],
        pagateFeriali:x[10],
        pagateFestivi:x[11],
        pagateNonFestivi:x[12],
        pagateOreFeriali:x[13],
        pagateOreFestivi:x[14],
        pagateOreNonFestivi:x[15],
        residuoCorrenteFeriali:x[16],
        residuoCorrenteFestivi:x[17],
        residuoCorrenteNonFestivi:x[18],   
      })      
    })    
  }

  calculate(){
    this.row.forEach(x => {
      x.totaleFeriali = x.lavorateFeriali && x.residuoMesiPrecFeriali && x.lavorateFeriali+x.residuoMesiPrecFeriali
    })
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
