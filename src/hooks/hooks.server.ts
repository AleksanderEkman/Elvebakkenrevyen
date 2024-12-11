import type { Handle } from '@sveltejs/kit';
import { handleCsrf } from '@kitql/handles';

// Define security headers to enhance application security
const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains', // Enforce HTTPS

};


const csrfHandler = handleCsrf([
    [/\/api\/csrf-handler\/some-origins/, { origin: true }] 
]);

export const handle: Handle = async ({ event, resolve }) => {
    try {
        // Ensure event is defined and has a request property
        if (!event || !event.request) {
            throw new Error("Event or event.request is undefined");
        }

        // Create an object with event and resolve for CSRF handling
        const csrfResponse = await csrfHandler({ event, resolve });

        if (csrfResponse) {
            return csrfResponse; // Return the response from the CSRF handler if applicable
        }

        const response = await resolve(event); // Resolve the event

        Object.entries(securityHeaders).forEach(
            ([header, value]) => response.headers.set(header, value)
        );

        return response; // Return the final response with headers set
    } catch (error) {
        console.error("Error in handle function:", error);
        throw error; // Rethrow the error for SvelteKit to handle it appropriately
    }
};
