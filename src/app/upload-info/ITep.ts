export interface IReadFile{
    name?: string;
    surname?:string;
    lavorateFeriali?: number;
    lavorateFestivi?: number;
    lavorateNonFestivi?: number;
    pagateFeriali?: number;
    pagateFestivi?: number;
    pagateNonFestivi?: number;
}

export interface ISheetMonths {
    mese?: number;
    sheet?: IReadFile[];
}