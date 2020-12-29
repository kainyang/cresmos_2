export interface ItemBasic {
    id: string;
    quantity: number;
    rarity: Rarity;
    catalogueType: CatalogueType;
}

export interface Item extends ItemBasic {
    name: string;
    image: string;
    cashValue: number;
    pointValue: number;
}

export enum CatalogueType {
    Icon = 1,
    Borders = 2,
    LootBox = 3,
    Collectible = 4,
    Accesories = 5
}

export enum Rarity {
    None = 1,
    Common = 2,
    Rare = 3,
    Epic = 4,
    Legendary = 5
}
