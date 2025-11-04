import { addTicket } from '$lib/utils/prismaUtils';
import type { Ticket } from '@prisma/client';

async function createTickets(adultCount: number, childCount: number, eventName: string, eventDate: Date, userId: string) {
    const ticketsWithTokens = [];

    // Create adult tickets
    for (let i = 0; i < adultCount; i++) {
        const result = await addTicket({
            user_id: userId,
            event_name: eventName,
            event_date: eventDate,
            type: 'adult',
            seat_number: null,
        });
        ticketsWithTokens.push(result);
    }

    // Create child tickets
    for (let i = 0; i < childCount; i++) {
        const result = await addTicket({
            user_id: userId,
            event_name: eventName,
            event_date: eventDate,
            type: 'child',
            seat_number: null,
        });
        ticketsWithTokens.push(result);
    }

    return ticketsWithTokens;
}

export async function load(event) {
    console.log(event.locals);
    const userId = event.locals.user?.id;
    /* Henter ut parametere fra URL */
    const url = new URL(event.url);
    const data = url.searchParams.get('data');

    const childValue = parseInt(url.searchParams.get('childValue') || '0');
    const adultValue = parseInt(url.searchParams.get('adultValue') || '0');

    console.log('URL params - data:', data, 'childValue:', childValue, 'adultValue:', adultValue);

    let eventDate: Date | null = null;
    if (data && data.includes('&')) {
        const [dateStr, timeStr] = data.split('&');
        const day = parseInt(dateStr.substring(0, 2));
        const month = parseInt(dateStr.substring(2, 4));
        const hour = parseInt(timeStr.substring(0, 2));
        const minute = parseInt(timeStr.substring(2, 4));

        eventDate = new Date(`2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+01:00`);
        console.log('Parsed event date:', eventDate, 'from data:', data);
    } else {
        console.log('No valid data parameter found');
    }

    let ticketsWithTokens: Array<{ ticket: Ticket; rawToken: string }> = [];

    // Only create tickets if values are provided and we have a valid event date and user is logged in
    if ((adultValue > 0 || childValue > 0) && eventDate && userId) {
        console.log('Creating tickets...');
        ticketsWithTokens = await createTickets(adultValue, childValue, 'Example Event', eventDate, userId);
        console.log('Created tickets with tokens:', ticketsWithTokens);
    } else {
        console.log('Not creating tickets - adultValue:', adultValue, 'childValue:', childValue, 'eventDate:', eventDate, 'userId:', userId);
    }

    /* Returnerer data til +page.svelte */
    return {
        eventDate,
        childValue,
        adultValue,
        ticketsWithTokens
    };
}

