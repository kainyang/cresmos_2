import { Component, OnInit } from '@angular/core';
import { Item, CatalogueType, Rarity } from '../value-land.model';

@Component({
    selector: 'app-value-land-icon',
    templateUrl: 'value-land-icon.component.html',
    styleUrls: ['./value-land-icon.component.scss']
})

export class ValueLandIconComponent implements OnInit {

    items: Item[];

    constructor() { }

    ngOnInit() {
        this.items = [
            {
                id: 'CFE870C1-C53F-4EB8-8175-675716F9B2F0',
                name: 'Geralt',
                image: 'assets/images/vault/icon/geralt.png',
                pointValue: 5,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'E6CE1B87-69ED-47F1-98DD-37CD270528F9',
                name: 'Eredin',
                image: 'assets/images/vault/icon/eredin.png',
                pointValue: 1,
                cashValue: 4,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'F849EF1A-E5CA-4D81-8711-1F3A3E9BEDF9',
                name: 'Yennefer',
                image: 'assets/images/vault/icon/yennefer.png',
                pointValue: 5,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'CFE870C1-C53F-4EB8-8175-675716F9B2F0',
                name: 'Geralt',
                image: 'assets/images/vault/icon/geralt.png',
                pointValue: 500,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'E6CE1B87-69ED-47F1-98DD-37CD270528F9',
                name: 'Eredin',
                image: 'assets/images/vault/icon/eredin.png',
                pointValue: 1,
                cashValue: 4,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'F849EF1A-E5CA-4D81-8711-1F3A3E9BEDF9',
                name: 'Yennefer',
                image: 'assets/images/vault/icon/yennefer.png',
                pointValue: 500,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'CFE870C1-C53F-4EB8-8175-675716F9B2F0',
                name: 'Geralt',
                image: 'assets/images/vault/icon/geralt.png',
                pointValue: 500,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'E6CE1B87-69ED-47F1-98DD-37CD270528F9',
                name: 'Eredin',
                image: 'assets/images/vault/icon/eredin.png',
                pointValue: 1,
                cashValue: 4,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
            {
                id: 'F849EF1A-E5CA-4D81-8711-1F3A3E9BEDF9',
                name: 'Yennefer',
                image: 'assets/images/vault/icon/yennefer.png',
                pointValue: 500,
                cashValue: 5,
                catalogueType: CatalogueType.Icon,
                rarity: Rarity.Epic,
                quantity: 1
            },
        ];
    }
}
