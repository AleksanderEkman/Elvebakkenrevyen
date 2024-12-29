import { error, type Handle } from '@sveltejs/kit';
import { RateLimiter } from "sveltekit-rate-limiter/server";

const limiter = new RateLimiter({
    IP: [75, 'd'], 
    IPUA: [10000, 'h'] 
});

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    'Access-Control-Allow-Origin': 'https://bakkarevydocker-o869w.ondigitalocean.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
    'Cache-Control': 'public, max-age=3600'
};

export const handle: Handle = async ({ event, resolve }) => {
    // Apply rate limiting
    if (await limiter.isLimited(event)) {
        throw error(429, 'Too Many Requests');
    }

    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                ...securityHeaders,
                'Content-Length': '0'
            }
        });
    }

    const response = await resolve(event);
    
    // Apply security headers
    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );

    return response;
}
