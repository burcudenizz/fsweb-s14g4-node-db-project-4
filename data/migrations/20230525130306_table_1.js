/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema.createTable("recipes", (tbl) => {
    tbl.increments("tarif_id");
    tbl.string("tarif_adi").notNullable().unique();
    tbl.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
  })
  .createTable("adimlar",tbl=>{
    tbl.increments("adim_id")
    tbl.string("adim_sirasi").notNullable().unsigned()
    tbl.string("adim_talimati").notNullable()
    tbl.integer("tarif_id").notNullable()
    .references("tarif_id").inTable("recipes")
})
.createTable("icindekiler",tbl=>{
    tbl.increments("icindekiler_id")
    tbl.string("icindekiler_adi")
})
.createTable("icindekiler_adimlar",tbl=>{
    tbl.increments("icindekiler_adimlar_id")
    tbl.integer("adim_id")
    .references("adim_id").inTable("adimlar")
    tbl.integer("icindekiler_id")
    .references("icindekiler_id").inTable("icindekiler")
    tbl.decimal("miktar").notNullable()
})
return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

return knex.schema
.dropTableIfExists("icindekiler_adimlar")
.dropTableIfExists("icindekiler")
.dropTableIfExists("adimlar")
.dropTableIfExists("recipes")
};
