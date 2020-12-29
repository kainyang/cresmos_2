import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/core/models/core.model';
import { CoreService } from 'src/app/core/services/core.service';

declare var StripeCheckout: any;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    @Input() disableButton;
    @Input() amount;
    @Input() description;

    @Output() paymentSucess: EventEmitter<void> = new EventEmitter<void>();

    handler: any;

    loading = false;

    constructor(private coreService: CoreService) { }

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            key: 'pk_test_RzDSd1qwOVSRQ42eMlc5KYjC00ZkzEv99d',
            locale: 'auto',
            token: (token) => {
                this.loading = true;

                const paymentRequest: Payment = {
                    tokenID: token.id,
                    description: this.description,
                    amount: this.amount
                };

                this.coreService.checkoutPayment(paymentRequest).subscribe(() => {
                    this.loading = false;
                    this.paymentSucess.emit();
                });
            }
        });
    }

    checkout(e) {
        this.handler.open({
            name: this.description,
            amount: this.amount,
            currency: 'sgd',
        });
        e.preventDefault();
    }

    @HostListener('window:popstate')
    onPopstate() {
        this.handler.close();
    }
}
