import { Component, OnInit } from '@angular/core';
import { VaultItem, Rarity } from '../../profile.model';

@Component({
    selector: 'app-vault-borders',
    templateUrl: 'vault-borders.component.html',
    styleUrls: ['./vault-borders.component.scss']
})

export class VaultBordersComponent implements OnInit {

    items: VaultItem[];

    constructor() { }

    ngOnInit() {
        this.items = [];
    }
}
