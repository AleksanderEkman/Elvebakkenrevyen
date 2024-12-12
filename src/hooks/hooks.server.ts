import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains', // Enforce HTTPS
    'X-Frame-Options': 'DENY', // Prevent clickjacking
    'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
    'Referrer-Policy': 'no-referrer', // Control referrer information
    'Permissions-Policy': 'geolocation=(self), microphone=()', // Define permissions for features
    'Access-Control-Allow-Origin': '*', // Allow specific origin
    'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow specific methods
    'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
    'Vary': 'Origin' // Handle multiple domains
};

export const handle: Handle = async ({ event, resolve }) => {
    // Handle preflight requests for CORS
    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                ...securityHeaders,
                'Content-Length': '0'
            }
        });
    }

    const response = await resolve(event);

    // Set custom security headers
    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );

    return response;
};