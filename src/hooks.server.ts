import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    // Add other security headers as needed
};

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // Set custom security headers
    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );

    return response;
};
