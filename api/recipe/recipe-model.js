const db = require("../../data/db-config");

async function icindekileriGetir(adim_id) {
  const icindekiler = await db("icindekiler_adimlar as ia")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .select("i.*", "ia.miktar")
    .where("id.adim_id", adim_id);
  return icindekiler;
}

async function getById(tarif_id) {
  /*
    select * from recipes as r
left join adimlar as a on r.tarif_id=a.tarif_id
left join icindekiler_adimlar as ia on ia.adim_id=a.adim_id
left join icindekiler as i on i.icindekiler_id=ia.icindekiler_id
const allRecipes= await db("recipes as r")

*/

  //1-model oluştururken öncelikle istenen veri türünün nasıl olduğuna,nelerin istendiğine bakarız.Hangi tablolar nasıl birleşecek vs. karar verdikten sonra istediğimiz datayı ,istediğimiz formatta getiririz.
  //2-Burada tarif_id'ye göre tariflerin gelmesi istendiği için tarif_id'yi parametre olarak alırız.
  //3-gelen allRecipes datası array olarak gelir. 1 elemanlıdır.
  //4-Bizden istenen formatta adimlar bir array içinde.
  const allRecipes = await db("recipes as r")
    .leftJoin("adimlar as a", "r.tarif_id", "a.tarif_id")
    .leftJoin("icindekiler_adimlar as ia", "ia.adim_id", "a.adim_id")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .select(
      "r.*",
      "a.adim_id",
      "a.adim_sirasi",
      "a.adim_talimati",
      "i.*",
      "ia.miktar"
    )
    .where("r.tarif_id", tarif_id);

  if (!allRecipes || allRecipes.length === 0) {
    return [];
  }

  //5-istenen formatı bir model olarak tanımladık.

  let recipeModel = {
    tarif_id: tarif_id,
    tarif_adi: allRecipes[0].tarif_adi,
    kayit_tarihi: allRecipes[0].tarif_tarihi,
    adimlar: [],
  };

  //6-İstenen formatta adimlar bir array olarak verilmiş. Bu nedenle for ile tüm tarifleri gezip adimlar için istenen formatı bir modele atadık.
  for (let i = 0; i < allRecipes.length; i++) {
    let adimModel = {
      adim_id: allRecipes[i][adim_id],
      adim_sirasi: allRecipes[i][adim_sirasi],
      adim_talimati: allRecipes[i][adim_talimati],
      icindekiler: [],
    };

    //7-icindekiler başka bir fonskiyon ile çekildi. Ve for döngüsü içinde o fonksiyon kullanılarak icindekiler datası alındı. Ve ilk başta tanımladığım tarifin modeline pushladık.
    let isInsertedBefore = recipeModel.adimlar.filter(
      (x) => x.adim_adi === allRecipes[i][adim_id]
    );
    if (isInsertedBefore.length == 0) {
      let icindekiler = await icindekileriGetir(allRecipes[i][adim_id]);
      adimModel.icindekiler = icindekiler;
      recipeModel.adimlar.push(adimModel);
    }
    return recipeModel;
  }
}
module.exports = { getById };
