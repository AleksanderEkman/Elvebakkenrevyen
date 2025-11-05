import type { Actions } from './$types';
import { fetchTicketById, compareToken, deactivateTicket } from '$lib/utils/prismaUtils';

export const actions: Actions = {
    verifyTicket: async ({ request }) => {
        const data = await request.formData();
        const scannedData = data.get('scannedData') as string;

        console.log('Scanned data:', scannedData);

        if (!scannedData) {
            console.log('No data scanned');
            return { type: 'error', success: false, message: 'Ingen data skannet' };
        }
        const ticket_id = scannedData.split('.')[0];
        const token = scannedData.split('.')[1];

        console.log('Ticket ID:', ticket_id);
        console.log('Scanned token:', token);

        const ticket = await fetchTicketById(ticket_id);

        if (!ticket || !ticket.token) {
            console.log('Ticket not found or no token');
            return { type: 'error', success: false, message: 'Ugyldig billett' };
        }

        console.log('Stored hashed token:', ticket.token);
        console.log('Ticket active:', ticket.active);

        if (!ticket.active) {
            return { type: 'error', success: "used", message: 'Billett allerede brukt' };
        }

        const isValidToken = await compareToken(token, ticket.token);
        console.log('Token valid?', isValidToken);

        if (!isValidToken) {
            return { type: 'error', success: false, message: 'Ugyldig token' };
        }

        await deactivateTicket(ticket_id);

        const response = { type: 'success', success: true, message: 'Gyldig billett' };
        console.log('Returning response:', JSON.stringify(response));
        return response;
    }
};
