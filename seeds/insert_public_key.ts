import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("public_keys").del();
    await knex("public_keys").insert({
        pk: 'pk_test_LsRBKejzCOEEWOsw',
    });
};
