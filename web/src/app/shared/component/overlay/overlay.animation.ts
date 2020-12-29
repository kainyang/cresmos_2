import { trigger, state, style, transition, animate } from '@angular/animations';

export const enum AnimationState {
    void = 'void',
    in = 'in',
    out = 'out'
}

export const flyInOut = trigger('flyInOut', [
    state(AnimationState.in, style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state(`${AnimationState.out}, ${AnimationState.void}`, style({
        transform: 'translate3d(100%, 0, 0)'
    })),
    transition(`${AnimationState.in} => ${AnimationState.out}`, animate('700ms ease-in-out')),
    transition(`${AnimationState.void} => ${AnimationState.in}`, animate('500ms ease-in-out'))
]);
