import type { Actions } from './$types';
import { fetchTicketById, compareToken } from '$lib/utils/prismaUtils';

export const actions: Actions = {
    verifyTicket: async ({ request }) => {
        const data = await request.formData();
        const scannedData = data.get('scannedData') as string;

        console.log('Scanned data:', scannedData);

        if (!scannedData) {
            return { success: false, message: 'No data scanned' };
        }
        const ticket_id = scannedData.split('.')[0];
        const token = scannedData.split('.')[1];

        const ticket = await fetchTicketById(ticket_id);
        if (!ticket || !ticket.token) {
            return { success: false, message: 'Invalid ticket' };
        }

        const isValidToken = await compareToken(token, ticket.token);
        if (!isValidToken) {
            return { success: false, message: 'Invalid token' };
        }

        return { success: true, message: 'Valid ticket' };
    }
};
