import { addTicket } from '$lib/utils/prismaUtils';

async function createTickets(adultCount: number, childCount: number, eventName: string, eventDate: Date) {
    const userId = '2dc2b712-3693-4979-8c25-f000025af2f0';


    // Create adult tickets
    for (let i = 0; i < adultCount; i++) {
        await addTicket({
            user_id: userId,
            event_name: eventName,
            event_date: eventDate,
            type: 'adult',
            seat_number: null,
        });
    }

    // Create child tickets
    for (let i = 0; i < childCount; i++) {
        await addTicket({
            user_id: userId,
            event_name: eventName,
            event_date: eventDate,
            type: 'child',
            seat_number: null,
        });
    }
}

export async function load(event) {
    /* Henter ut parametere fra URL */
    const url = new URL(event.url);
    const data = url.searchParams.get('data');

    const childValue = parseInt(url.searchParams.get('childValue') || '0');
    const adultValue = parseInt(url.searchParams.get('adultValue') || '0');

    let eventDate = new Date();
    if (data) {
        const [dateStr, timeStr] = data.split('&');
        const day = parseInt(dateStr.substring(0, 2));
        const month = parseInt(dateStr.substring(2, 4)) - 1; 
        const hour = parseInt(timeStr.substring(0, 2));
        const minute = parseInt(timeStr.substring(2, 4));

        eventDate = new Date(2025, month, day, hour, minute);
    }

    // Only create tickets if values are provided
    if (adultValue > 0 || childValue > 0) {
        await createTickets(adultValue, childValue, 'Example Event', eventDate);
    }

    /* Returnerer data til +page.svelte */
    return { eventDate, childValue, adultValue };
}

