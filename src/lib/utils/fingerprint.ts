import { createHash, randomUUID } from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';

export function generateDeviceFingerprint(event: RequestEvent): string {
    let deviceCookie = event.cookies.get('deviceUUID') || '';
    if (!deviceCookie) {
        deviceCookie = randomUUID();
        event.cookies.set('deviceUUID', deviceCookie, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            priority: 'high',
            partitioned: true
        });
    };
    
    const headers = event.request.headers;
    let elements = [
        deviceCookie,
        headers.get('user-agent') || 'unknown',
        headers.get('accept-encoding') || 'unknown',
        headers.get('sec-ch-ua-mobile') || 'unknown',
        headers.get('sec-ch-ua-platform') || 'unknown',
        headers.get('accept-language') || 'unknown',
        headers.get('device-memory') || 'unknown',
        headers.get('viewport-width') || '0',
        headers.get('viewport-height') || '0',
        headers.get('dpr') || '0',
        headers.get('color-gamut') || 'unknown',
        headers.get('color-depth') || '0',
        headers.get('sec-ch-ua') || 'unknown',
      ]
      .map(value => (value ? value.trim().toLowerCase() : 'unknown')) 
      .join('|');

    return createHash('sha256')
        .update(elements)
        .digest('hex');
}
