import { error, json, text, type Handle } from '@sveltejs/kit';

type ErrorResponse = {
    status: number;
    body: {
        message: string;
    };
};

const csrf = (allowedPaths: string[]): Handle =>
    async ({ event, resolve }) => {
        const forbidden =
            ['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.request.method) &&
            event.request.headers.get('origin') !== event.url.origin &&
            isFormContentType(event.request) &&
            !allowedPaths.includes(event.url.pathname);

        if (forbidden) {
            const csrfError: ErrorResponse = error(
                403,
                `Cross-site ${event.request.method} form submissions are forbidden`
            );
            return event.request.headers.get('accept') === 'application/json'
                ? json(csrfError.body, { status: csrfError.status })
                : text(csrfError.body.message, { status: csrfError.status });
        }

        return resolve(event);
    };

function isContentType(request: Request, ...types: string[]) {
    const type = request.headers.get('content-type')?.split(';', 1)[0].trim() ?? '';
    return types.includes(type);
}

function isFormContentType(request: Request) {
    return isContentType(request, 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain');
}

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    'Access-Control-Allow-Origin': 'https://bakkarevydocker-o869w.ondigitalocean.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin'
};

const csrfProtection = csrf(['/']);

export const handle: Handle = async ({ event, resolve }) => {
    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                ...securityHeaders,
                'Content-Length': '0'
            }
        });
    }

    // Apply CSRF protection
    const csrfResult = await csrfProtection({ 
        event, 
        resolve: async (event) => {
            const response = await resolve(event);
            // Apply security headers
            Object.entries(securityHeaders).forEach(
                ([header, value]) => response.headers.set(header, value)
            );
            return response;
        }
    });

    if (csrfResult !== undefined) {
        Object.entries(securityHeaders).forEach(
            ([header, value]) => csrfResult.headers.set(header, value)
        );
        return csrfResult;
    }

    return csrfResult;
}
