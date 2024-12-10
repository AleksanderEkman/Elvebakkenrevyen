import { fail } from "@sveltejs/kit";
import { message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const schema = z.object({
    firstName: z.string().min(2).max(40),
    lastName: z.string().min(2).max(40),
    email: z.string().email(),
    message: z.string().min(10).max(500)
});

export const load = async () => {
    const form = await superValidate(zod(schema));

    return { form };
}

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));
        console.log(form);

        if (!form.valid) {
            return fail(400, { form });
        }

        return message(form, 'Melding sendt!');
    }
}