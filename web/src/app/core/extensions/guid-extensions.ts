function newGuid(): string {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
}

function gen(count: number): string {
    let out = '';
    for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return out;
}

export const Guid = { newGuid };