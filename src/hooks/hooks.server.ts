import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains', // Enforce HTTPS
    'X-Frame-Options': 'DENY', // Prevent clickjacking
    'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
    'Referrer-Policy': 'strict-origin-when-cross-origin', // Control referrer information
    'Permissions-Policy': 'geolocation=(self), microphone=()', // Define permissions for features
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow POST and OPTIONS methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/x-www-form-urlencoded', // Allow specific headers
    'Vary': 'Origin' // Handle multiple domains
};

export const handle: Handle = async ({ event, resolve }) => {
    const origin = event.request.headers.get('Origin');
    if (origin) {
        console.log(`Request Origin: ${origin}`);
    } else {
        console.log('No Origin header present.');
    }
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