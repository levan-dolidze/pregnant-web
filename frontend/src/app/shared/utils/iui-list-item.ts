export interface IDropDown {
  id: number | string | boolean | null;
  text: string | null;
}

export class IDisplayValue {
  value: number | null | boolean
  displayName: string | null;
  toolTipI?: number;
  tooltipTxt?: string;
  subValue?: string;
}
