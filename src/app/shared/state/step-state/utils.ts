import { Languages } from "../../translate/translation.serive";


export interface InitQueryParams {
    mode: Mode | null
    lang?: Languages | null
    token?: string | null;
    loading?: boolean;
    error?: string | null;
}

export type Mode = 'dark' | 'light';


export enum FlowQueryStore {
    TnetQuery = 'tnetQuery',
}