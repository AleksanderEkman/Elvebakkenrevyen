import { fail } from "@sveltejs/kit";
import { message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { PRIVATE_GOOGLE_EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";
import type { SendMailOptions } from "nodemailer";
import { contactSchema } from "$lib/schemas";

export const load = async () => {
    const form = await superValidate(zod(contactSchema));
    return { form };
}

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(contactSchema));
        console.log(form)


        if (!form.valid) {
            return fail(400, { form });
        } else {
            const { firstName, lastName, email, body } = form.data;
            const mail: SendMailOptions = {
                from: PRIVATE_GOOGLE_EMAIL,
                to: "aleksander.ekman1@gmail.com",
                subject: `Mail fra kontaktskjema: ${firstName} ${lastName}`,
                html:   `<p>(Uverifisert e-postadresse: ${email})</p>
                        <p><strong>Mail fra ${firstName} ${lastName}</strong></p>
                        <p>${body.replace(/\n/g, '<br>')}</p>`

            }

            const sendEmail = async(mail: SendMailOptions) => {
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
            await sendEmail(mail);
            return message(form, 'Melding sendt!');
        }
    }
}
