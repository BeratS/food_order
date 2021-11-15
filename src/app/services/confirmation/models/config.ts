import { SafeHtml } from '@angular/platform-browser';

export enum ICFormType {
    INPUT = 0,
    SELECT = 1,
    CHECKBOX = 2,
    RADIO = 3
}

export interface IForm {
    label?: string;
    type?: ICFormType;
    validator?: any;
    value?: any;
    options?: any[];
}

export interface IData {
    panelClass?: string;
    title?: string;
    data?: any;
    msg: string;
    msg2?: string;
    note?: string;
    desc?: string;
    descHtml?: string | SafeHtml;
    btn?: string | ICButton;
    btn2?: string | ICButton;
    form?: IForm | IForm[];
    hideBtn?: boolean;
    hideBtn2?: boolean;
    centerAlign?: boolean;
    closeIcon?: boolean;
}

export interface ICButton {
    text: string;
    class: string;
}
