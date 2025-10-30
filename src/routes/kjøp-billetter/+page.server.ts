import createTicket from '$lib/utils/prismaUtils';

export async function load(event) {
    /* Henter ut parametere fra URL */
    const url = new URL(event.url);
    const showCode = url.searchParams.get('showCode');
    const childValue = url.searchParams.get('childValue');
    const adultValue = url.searchParams.get('adultValue');

    await createTicket({
        userId: 'example-user-id',
        eventName: 'Example Event',
        eventDate: new Date(),
        seatNumber: 'A1',
        });

    /* Returnerer data til +page.svelte */
    return { showCode, childValue, adultValue };
}