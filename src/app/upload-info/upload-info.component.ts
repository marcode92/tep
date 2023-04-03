import * as XLSX from 'xlsx';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IReadFile, ISheetMonths } from './ITep';
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

  row: ISheetMonths[] = [];
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  names: string[] = [];
  wsname: string[] = [];

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
      
      const ws: XLSX.WorkSheet[] = [];
      /* grab first sheet */
      this.wsname = wb.SheetNames;

      this.wsname.forEach((x,index) => {
        ws.push(wb.Sheets[x]);
        this.data.push(<AOA>(XLSX.utils.sheet_to_json(ws[index], { header: 1 })));
      })
      /* save data */
      
      this.mapFiletoRow();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  mapFiletoRow(){
    this.data.forEach((sheet,i) =>{
      this.row.push({
        mese:this.wsname[i],
        sheet: this.mapSheetMonth(sheet),
      })
    })
    console.log(this.row)
  }

  mapSheetMonth(sheet: any[]): IReadFile[]{
    let sheetMap: IReadFile[] = [];
    sheet.forEach((col,index) =>{
      if(index !== 0){
      sheetMap.push({
        name:col[0],
        residuoMesiPrecFeriali:col[1],
        residuoMesiPrecFestivi:col[2],
        residuoMesiPrecNonFestivi:col[3],
        lavorateFeriali:col[4],
        lavorateFestivi:col[5],
        lavorateNonFestivi:col[6],
        totaleFeriali:col[7],
        totaleFestivi:col[8],
        totaleNonFestivi:col[9],
        pagateFeriali:col[10],
        pagateFestivi:col[11],
        pagateNonFestivi:col[12],
        pagateOreFeriali:col[13],
        pagateOreFestivi:col[14],
        pagateOreNonFestivi:col[15],
        residuoCorrenteFeriali:col[16],
        residuoCorrenteFestivi:col[17],
        residuoCorrenteNonFestivi:col[18], 
      })
    }
    })

    return sheetMap;
  }

  calculate(){
    let precSheet: any;
    let residuoPrecFeriali = 0;
    let residuoPrecFestivi = 0;
    let residuoPrecNonFestivi = 0;
    this.row.forEach((sheets, index) => {
      if(sheets && sheets.sheet){
        sheets.sheet.forEach(element => {          
          element.residuoMesiPrecFeriali = 
          sheets.mese && sheets.mese.toLowerCase() === 'gennaio' ? 0 : this.findUser(precSheet, element.name)
          element.residuoMesiPrecFestivi = 
          sheets.mese && sheets.mese.toLowerCase() === 'gennaio' ? 0 : residuoPrecFestivi
          element.residuoMesiPrecNonFestivi = 
          sheets.mese && sheets.mese.toLowerCase() === 'gennaio' ? 0 : residuoPrecNonFestivi
          
          element.totaleFeriali = 
            element.lavorateFeriali !== undefined && element.residuoMesiPrecFeriali !== undefined? element.lavorateFeriali+residuoPrecFeriali : 0,
          element.totaleFestivi = 
            element.lavorateFestivi !== undefined && element.residuoMesiPrecFestivi !== undefined? element.lavorateFestivi+element.residuoMesiPrecFestivi : 0,
          element.totaleNonFestivi = 
            element.lavorateNonFestivi !== undefined && element.residuoMesiPrecNonFestivi !== undefined? element.lavorateNonFestivi+element.residuoMesiPrecNonFestivi: 0
          
          element.pagateOreFeriali = element.pagateFeriali && element.pagateFeriali/60;
          element.pagateOreFestivi = element.pagateFestivi && element.pagateFestivi/60;
          element.pagateOreNonFestivi = element.pagateNonFestivi && element.pagateNonFestivi/60;
          
          element.residuoCorrenteFeriali = 
            element.totaleFeriali !== undefined && element.pagateFeriali !== undefined ? element.totaleFeriali-element.pagateFeriali : 0;
          element.residuoCorrenteFestivi = 
            element.totaleFestivi !== undefined && element.pagateFestivi !== undefined ? element.totaleFestivi-element.pagateFestivi : 0; 
          element.residuoCorrenteNonFestivi = 
            element.totaleNonFestivi !== undefined && element.pagateNonFestivi !== undefined? element.totaleNonFestivi-element.pagateNonFestivi : 0;
            /* 
          residuoPrecFeriali = sheets.sheet && sheets.sheet[index].residuoCorrenteFeriali || 0
          residuoPrecFestivi = sheets.sheet && sheets.sheet[index].residuoCorrenteFestivi || 0
          residuoPrecNonFestivi = sheets.sheet && sheets.sheet[index].residuoCorrenteNonFestivi || 0 */

        });
        precSheet = sheets.sheet;
    }
    })

    console.log(this.row);
  }

  findUser(sheet: ISheetMonths[],name?: string){
    console.log("foglio e name",sheet, name)
    return 0; //TODO
  }

  export() {
    
    /* generate worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    this.data.forEach((sheets,indexSheet) => {
      sheets.forEach((x,index) => {
        if(index !== 0){
          x[0] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].name;
          x[1] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoMesiPrecFeriali;
          x[2] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoMesiPrecFestivi;
          x[3] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoMesiPrecNonFestivi;
    
          x[4] =this.row[indexSheet] && this.row[indexSheet].sheet![index-1].lavorateFeriali;
          x[5] =this.row[indexSheet] && this.row[indexSheet].sheet![index-1].lavorateFestivi;
          x[6] =this.row[indexSheet] && this.row[indexSheet].sheet![index-1].lavorateNonFestivi;
    
          x[7] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].totaleFeriali;
          x[8] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].totaleFestivi;
          x[9] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].totaleNonFestivi;
    
          x[10] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateFeriali;
          x[11] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateFestivi;
          x[12] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateNonFestivi;
    
          x[13] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateOreFeriali;
          x[14] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateOreFestivi;
          x[15] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].pagateOreNonFestivi;
    
          x[16] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoCorrenteFeriali;
          x[17] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoCorrenteFestivi;
          x[18] = this.row[indexSheet] && this.row[indexSheet].sheet![index-1].residuoCorrenteNonFestivi;
          }
        })
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheets);
        
        let wscols = [{width:10},{width:25},{width:25},{width:25},{width:18},{width:18},
          {width:18},{width:13},{width:13},{width:13},{width:13},{width:13},{width:13},
          {width:20},{width:20},{width:20},{width:20},{width:20},{width:20}
        ];
        
        ws['!cols'] = wscols;
        /* generate workbook and add the worksheet */
        XLSX.utils.book_append_sheet(wb, ws, `${this.wsname[indexSheet]}`);
    })

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
