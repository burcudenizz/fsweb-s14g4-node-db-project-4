/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("icindekiler_adimlar").truncate();
  await knex("icindekiler").truncate();
  await knex("adimlar").truncate();
  await knex("recipes").truncate();

  const recipeData = {
    tarif_adi: "Spagetti Bolonez",
  };

  const adimlarData = [
    {
      adim_sirasi: 1,
      adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
      tarif_id: 1,
    },
    {
      adim_sirasi: 2,
      adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin",
      tarif_id: 1,
    },
  ];

  const icindekilerData = [
    { icindekiler_adi: "zeytinyağı" },
    { icindekiler_adi: "tuz" },
  ];

  const icindekilerAdimlarData = [
    { icindekiler_id: 1, adim_id: 1, miktar: 0.1 },
    { icindekiler_id: 2, adim_id: 1, miktar: 1 },
    { icindekiler_id: 2, adim_id: 2, miktar: 0.5 },
  ];

  await knex("recipes").insert(recipeData);
  await knex("adimlar").insert(adimlarData);
  await knex("icindekiler").insert(icindekilerData);
  await knex("icindekiler_adimlar").insert(icindekilerAdimlarData);
};
