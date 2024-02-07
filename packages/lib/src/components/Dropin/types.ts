import type { Order, OrderStatus, PaymentActionsType } from '../../types/global-types';
import type { UIElementProps, UIElementStatus } from '../internal/UIElement/types';
import type { NewableComponent } from '../../core/core.registry';

import UIElement from '../internal/UIElement/UIElement';
import { ComponentsMap } from '../components-map';

/**
 * Available components
 */
export type PaymentMethods = typeof ComponentsMap;

/**
 * Options for a component
 */
export type PaymentMethodOptions<P extends keyof PaymentMethods> = InstanceType<PaymentMethods[P]>['props'];

type PaymentMethodsConfigurationMap = {
    [key in keyof PaymentMethods]?: Partial<PaymentMethodOptions<key>>;
};
type PaymentActionTypesMap = {
    [key in PaymentActionsType]?: Partial<UIElementProps>;
};
/**
 * Type must be loose, otherwise it will take priority over the rest
 */
type NonMappedPaymentMethodsMap = {
    [key: string]: any;
};

export type PaymentMethodsConfiguration = PaymentMethodsConfigurationMap & PaymentActionTypesMap & NonMappedPaymentMethodsMap;

export type InstantPaymentTypes = 'paywithgoogle' | 'googlepay' | 'applepay';

export interface DropinConfiguration extends UIElementProps {
    /**
     * Configure each payment method displayed on the Drop-in
     */
    paymentMethodsConfiguration?: PaymentMethodsConfiguration;

    /**
     * Pass the payment method classes that are going to be used as part of the Drop-in.
     */
    paymentMethodComponents?: NewableComponent[];

    order?: Order;

    /**
     * Show/Hide stored payment methods
     * @defaultValue true
     */
    showStoredPaymentMethods?: boolean;

    /**
     * Show/Hide regular (non-stored) payment methods
     * @defaultValue true
     */
    showPaymentMethods?: boolean;

    /**
     * Show wallet payment methods to show on top of the regular payment
     * method list.
     *
     * @defaultValue []
     */
    instantPaymentTypes?: InstantPaymentTypes[];

    openFirstStoredPaymentMethod?: boolean;
    openFirstPaymentMethod?: boolean;
    onSubmit?: (data, component) => void;
    onReady?: () => void;
    onSelect?: (paymentMethod: UIElement) => void;

    /**
     * Show/Hide the remove payment method button on stored payment methods
     * Requires {@link DropinConfiguration.onDisableStoredPaymentMethod}
     * @defaultValue false
     */
    showRemovePaymentMethodButton?: boolean;

    /**
     * Show/Hide the radio in the payment method list
     * @defaultValue false
     */
    showRadioButton?: boolean;

    /**
     * Called when a shopper clicks Remove on a stored payment method
     * Use this to call the {@link https://docs.adyen.com/api-explorer/#/Recurring/v49/post/disable /disable endpoint}
     * Call resolve() if the removal was successful, or call reject() if there was an error
     * @defaultValue false
     */
    onDisableStoredPaymentMethod?: (storedPaymentMethod, resolve, reject) => void;
}

export interface onOrderCancelData {
    order: Order;
}

export interface DropinComponentProps extends DropinConfiguration {
    onCreateElements: any;
    onChange: (newState?: object) => void;
    onOrderCancel?: (data: onOrderCancelData) => void;
}

interface DropinStatus {
    type: UIElementStatus;
    props?: DropinStatusProps;
}

export interface DropinStatusProps {
    component?: UIElement;
}

export interface DropinComponentState {
    elements: any[];
    instantPaymentElements: UIElement[];
    storedPaymentElements: UIElement[];
    status: DropinStatus;
    activePaymentMethod: UIElement;
    cachedPaymentMethods: object;
    isDisabling: boolean;
    orderStatus: OrderStatus;
}
