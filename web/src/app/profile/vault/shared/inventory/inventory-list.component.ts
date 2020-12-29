import { Component, OnInit, Input } from '@angular/core';
import { VaultItem, Rarity } from '../../../profile.model';

@Component({
    selector: 'app-inventory-list',
    templateUrl: 'inventory-list.component.html',
    styleUrls: ['./inventory-list.component.scss']
})

export class InventoryListComponent implements OnInit {

    @Input() items: VaultItem[];

    constructor() { }

    ngOnInit() {
    }

    getBorderColourClass(rarity: Rarity) {
        switch (rarity) {
            case 1:
                return 'bronze-border';
            case 2:
                return 'silver-border';
            case 3:
                return 'gold-border';
            case 4:
                return 'epic-border';
            case 5:
                return 'legendary-border';
            default:
                break;
        }
    }

    getRarityText(rarity: Rarity) {
        switch (rarity) {
            case 2:
                return 'Common';
            case 3:
                return 'Rare';
            case 4:
                return 'Epic';
            case 5:
                return 'Legendary';
            default:
                break;
        }
    }
}
