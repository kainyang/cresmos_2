import { Component, OnInit } from '@angular/core';
import { VaultItem, Rarity, UserItem } from '../../profile.model';
import { ProfileService } from '../../profile.service';
import { Item } from 'src/app/value-land/value-land.model';

@Component({
    selector: 'app-vault-icon',
    templateUrl: 'vault-icon.component.html',
    styleUrls: ['./vault-icon.component.scss']
})

export class VaultIconComponent implements OnInit {

    items: Item[];

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        this.profileService.getUserInventory().subscribe((res: UserItem) => {
            if (res) {
                this.items = res.items;
            }
        });
    }
}
