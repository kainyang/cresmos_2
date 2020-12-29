import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../value-land.model';
import { ProfileService } from 'src/app/profile/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../purchase-dialog/purchase-dialog.component';
import { FeedbackResult } from 'src/app/core/models/core.model';
import { CoreService } from 'src/app/core/services/core.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shopping-list',
    templateUrl: 'shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {

    @Input() items: Item[];

    constructor(private profileService: ProfileService,
        private coreService: CoreService,
        private router: Router,
        private dialog: MatDialog) { }

    ngOnInit() {

    }

    purchase(item: Item) {
        if (this.coreService.isUserLoggedIn()) {
            const dialogRef = this.dialog.open(PurchaseDialogComponent, {
                data: {
                    title: 'Confirm purchase?',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Confirm'
                }
            });

            dialogRef.afterClosed().subscribe((result: FeedbackResult) => {
                if (result === FeedbackResult.Confirm) {
                    this.profileService.updateUserInventory(item).subscribe((res: any) => {
                        if (res.length > 0) {
                            this.showErrorDialog(res);
                        } else {
                            this.showSuccessDialog('You can view your purchase in your vault.');
                        }
                    });
                }
            });
        } else {
            this.router.navigate(['/login']);
        }
    }

    private showErrorDialog(message: string) {
        this.dialog.open(PurchaseDialogComponent, {
            data: {
                title: 'Purchase error!',
                heading: message,
                confirmButtonText: 'Okay'
            }
        });
    }

    private showSuccessDialog(message: string) {
        this.dialog.open(PurchaseDialogComponent, {
            data: {
                title: 'Purchase success!',
                heading: message,
                confirmButtonText: 'Okay'
            }
        });
    }
}
