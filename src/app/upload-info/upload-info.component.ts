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
    this.data.forEach((x,index) => {
      if(index !== 0){
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
    }      
    })    
  }

  calculate(){
    this.row.forEach(x => {
      x.totaleFeriali = x.lavorateFeriali !== undefined && x.residuoMesiPrecFeriali !== undefined? x.lavorateFeriali+x.residuoMesiPrecFeriali : 0,
      x.totaleFestivi = x.lavorateFestivi !== undefined && x.residuoMesiPrecFestivi !== undefined? x.lavorateFestivi+x.residuoMesiPrecFestivi : 0,
      x.totaleNonFestivi = x.lavorateNonFestivi !== undefined && x.residuoMesiPrecNonFestivi !== undefined? x.lavorateNonFestivi+x.residuoMesiPrecNonFestivi: 0

      x.pagateOreFeriali = x.pagateFeriali && x.pagateFeriali/60;
      x.pagateOreFestivi = x.pagateFestivi && x.pagateFestivi/60;
      x.pagateOreNonFestivi = x.pagateNonFestivi && x.pagateNonFestivi/60;

      x.residuoCorrenteFeriali = x.totaleFeriali !== undefined && x.pagateFeriali !== undefined ? x.totaleFeriali-x.pagateFeriali : 0;
      x.residuoCorrenteFestivi = x.totaleFestivi !== undefined && x.pagateFestivi !== undefined ? x.totaleFestivi-x.pagateFestivi : 0; 
      x.residuoCorrenteNonFestivi = x.totaleNonFestivi !== undefined && x.pagateNonFestivi !== undefined? x.totaleNonFestivi-x.pagateNonFestivi : 0;
    })

    console.log(this.row)
  }

  export(): void {

    this.data.forEach((x,index) => {
      if(index !== 0){
      x[0] = this.row[index-1].name;
      x[1] = this.row[index-1].residuoMesiPrecFeriali;
      x[2] = this.row[index-1].residuoMesiPrecFestivi;
      x[3] = this.row[index-1].residuoMesiPrecNonFestivi;

      x[4] = this.row[index-1].lavorateFeriali;
      x[5] = this.row[index-1].lavorateFestivi;
      x[6] = this.row[index-1].lavorateNonFestivi;

      x[7] = this.row[index-1].totaleFeriali;
      x[8] = this.row[index-1].totaleFestivi;
      x[9] = this.row[index-1].totaleNonFestivi;

      x[10] = this.row[index-1].pagateFeriali;
      x[11] = this.row[index-1].pagateFestivi;
      x[12] = this.row[index-1].pagateNonFestivi;

      x[13] = this.row[index-1].pagateOreFeriali;
      x[14] = this.row[index-1].pagateOreFestivi;
      x[15] = this.row[index-1].pagateOreNonFestivi;

      x[16] = this.row[index-1].residuoCorrenteFeriali;
      x[17] = this.row[index-1].residuoCorrenteFestivi;
      x[18] = this.row[index-1].residuoCorrenteNonFestivi;
      }
    }) 
    
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    var wscols = [{width:10},{width:25},{width:25},{width:25},{width:18},{width:18},
      {width:18},{width:13},{width:13},{width:13},{width:13},{width:13},{width:13},
      {width:20},{width:20},{width:20},{width:20},{width:20},{width:20}
  ];
  
  ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
