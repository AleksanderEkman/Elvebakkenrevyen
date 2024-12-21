import { fail, error } from "@sveltejs/kit";
import { RateLimiter } from "sveltekit-rate-limiter/server";
import { message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import { PRIVATE_GOOGLE_EMAIL, PRIVATE_RECIPIENT } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";
import type { SendMailOptions } from "nodemailer";
import { contactSchema } from "$lib/schemas";
import sanitizeHtml from 'sanitize-html';
import type { RequestEvent } from "./$types.js";
import hbs from 'nodemailer-express-handlebars';

const limiter = new RateLimiter({
    IP: [1, 'h'], // 1 requests per hour per IP
    IPUA: [1, 'd'] // 1 requests per day per IP and User Agent 
});

export const load = async () => {
    const form = await superValidate(zod(contactSchema));
    return { form };
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (await limiter.isLimited(event)) error(429);
        
        const form = await superValidate(event.request, zod(contactSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { name, email, body, phone } = form.data;

        const sanitizedBody = sanitizeHtml(body, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
            allowedAttributes: {
                'a': ['href']
            }
        });
        const trimmedBody = sanitizedBody
            .replace(/^\s*<br\s*\/?>|^\s*\n/, '')
            .replace(/<br\s*\/?>\s*$|\n\s*$/, '');

        const phoneLink = phone ? `<br>Telefon: <a href="tel:+47${phone}">+47${phone}</a>` : "";
        const mail: SendMailOptions = {
            from:`Elvebakkenrevyen Kontaktskjema <${PRIVATE_GOOGLE_EMAIL}>`,
            to: PRIVATE_RECIPIENT,
            subject: `Ny melding fra kontaktskjema: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; font-size: 0.95rem;">
                    <h2 style="color: #022549;">Ny melding fra ${name}</h2>
                    <p><strong>Uverifisert kontaktinformasjon:</strong></p>
                    <p>Email: ${email}${phoneLink}</p>
                    <hr style="border-top: 1px solid #ddd;">
                    <p><strong>Melding:</strong></p>
                    <p>${trimmedBody.replace(/\n/g, '<br>')}</p>
                </div>

            `
        }
        

        const sendEmail = async (mail: SendMailOptions) => {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mail, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });
        };

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await sendEmail(mail);
            return message(form, 'Melding sendt!');
        } catch (error) {
            console.error('Failed to send email:', error);
            return fail(500, { form, message: 'Failed to send email' });
        }
    }
};
