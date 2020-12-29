import {
    style,
    animate,
    animation,
    query,
    group
} from '@angular/animations';

// =========================
// Slide
// =========================
export const slideIn = [
    query(':enter, :leave', style({ position: 'relative', width: '100%' }), { optional: true }),
    group([
        query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
        }),
    ]),
];

export const slideOut = [
    query(':enter, :leave', style({ position: 'relative', width: '100%' }), { optional: true }),
    group([
        query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
        }),
    ]),
];

// =========================
// Scale
// =========================
export const scaleIn = animation([
    style({ opacity: 0, transform: 'scale(0.5)' }), // start state
    animate(
        '300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        style({ opacity: 1, transform: 'scale(1)' })
    )
]);

export const scaleOut = animation([
    animate(
        '300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        style({ opacity: 0, transform: 'scale(0.5)' })
    )
]);

// =========================
// Fade
// =========================
export const fadeIn = animation([
    style({ opacity: 0 }), // start state
    animate('500ms', style({ opacity: 1 }))
]);

export const fadeOut = animation([
    animate('500ms', style({ opacity: 0 }))
]);
