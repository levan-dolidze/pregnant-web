import { HttpErrorResponse } from "@angular/common/http";
import { GroupButtonModel } from "src/app/components/button-group/button-group.component";
import { CourseId } from "src/app/shared/utils/enums";


export interface SidePanelConfig {
    items?: SidePanelItem
    additionalCoverages?: CoverageConfig;
    promoCode?: PromoCodeConfig;
    totalPrice: PriceConfig;
    specialMessage?: MessageConfig;
    terms?: TermsConfig;
    submitButton: ButtonConfig;
    customActions?: CustomAction[];
    inlineMessage?: InlineMessage;
    priceMessage?: InlineMessage;
    productId?: CourseId;
    pageLoading?: boolean;
    checkboxInput?: boolean,
    contentText?: ContentTextConfig,
    checkboxCard?: RecoverConfig,
    checkboxCardAlreadyActive?: string,
    cardNumberToggle?: CardNumberToggleConfig,


}

export interface RecoverConfig {
    enabled: boolean;
    label?: string;
    value?: number;
    tooltipText?: string;
    isDisabled?: boolean;
    isChecked?: boolean
}

export interface CardNumberToggleConfig {
    enabled: boolean;
    label?: string;
    tooltipText?: string;
    value?: number;
    groupList?: GroupButtonModel[];
    selectedValue?: GroupButtonModel;
}


export interface SidePanelItem {
    label: string;
    value: number;
    originalPrice?: number;
    showStrikethrough?: boolean;
    insuredCount?: number;
    show: boolean
}

export interface PromoCodeConfig {
    enabled: boolean;
    placeholder?: string;
    hasError?: boolean | HttpErrorResponse
}

export interface CoverageConfig {
    enabled: boolean;
    label?: string;
    value?: number;
    originalPrice?: number
}

export interface PriceConfig {
    original?: number;
    final: number
    currency?: string;
    showStrikethrough?: boolean;
    symbols?: string
}

export interface MessageConfig {
    text: string;
    icon: string;
    type?: 'info' | 'warning' | 'success';
}
export interface InlineMessage {
    text: string;
    enabled: boolean;
    tipText?: string;
}

export interface TermsConfig {
    text?: string;
    documentNumber: string;
    linkUrl?: string;
}

export interface ButtonConfig {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    showSubmit?: boolean;
}

export interface ContentTextConfig {
    beforeLink: string;
    linkText: string;
    afterLink: string;
    linkUrl: string;
    enabled: boolean
}

export interface CustomAction {
    actionType: 'submit' | 'edit' | 'calculate' | 'preview'
    label: string;
    icon?: string;
}

