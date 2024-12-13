import { fail, error } from "@sveltejs/kit";
import { RateLimiter } from "sveltekit-rate-limiter/server";
import { message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import { PRIVATE_GOOGLE_EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";
import type { SendMailOptions } from "nodemailer";
import { contactSchema } from "$lib/schemas";
import sanitizeHtml from 'sanitize-html';
import type { RequestEvent } from "./$types.js";

const limiter = new RateLimiter({
    IP: [3, 'h'],
    IPUA: [5, 'd']
});

export const load = async () => {
    const form = await superValidate(zod(contactSchema));
    return { form };
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (await limiter.isLimited(event)) {
            throw error(429, 'Too many requests');
        }
        
        const form = await superValidate(event.request, zod(contactSchema));

        if (!form.valid) {
            return fail(400, { form });
        } else {
            const { firstName, lastName, email, body } = form.data;

            const sanitizedBody = sanitizeHtml(body, {
                allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
                allowedAttributes: {
                    'a': ['href']
                }
            });

            const mail: SendMailOptions = {
                from: PRIVATE_GOOGLE_EMAIL,
                to: "aleksander.ekman1@gmail.com",
                subject: `Mail fra kontaktskjema: ${firstName} ${lastName}`,
                html: `<p>(Uverifisert e-postadresse: ${email})</p>
                       <p><strong>Mail fra ${firstName} ${lastName}</strong></p>
                       <p>${sanitizedBody.replace(/\n/g, '<br>')}</p>`
            };

            const sendEmail = async (mail: SendMailOptions) => {
                await new Promise((resolve, reject) => {
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

            await new Promise((resolve) => {
                setTimeout(async () => {
                    await sendEmail(mail);
                    resolve(message(form, 'Melding sendt!'));
                },1000);
            });

            return message(form, 'Melding sendt!');
        }
    }
};
