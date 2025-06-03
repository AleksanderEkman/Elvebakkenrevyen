// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { PrismaClient } from '@prisma/client';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: User;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
    
    var prisma: PrismaClient | undefined;
}

export {};
