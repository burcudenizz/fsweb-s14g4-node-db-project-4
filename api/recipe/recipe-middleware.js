const recipeModel = require("./recipe-model");

async function checkRecipeId(req, res, next) {
  try {
    const isExistRecipe = await recipeModel.getById(req.params.tarif_id);
    if (isExistRecipe.length==0) {
      res.status(400).json({ message: "Recipe not found" });
    } else {
      //çektiğimiz datayı request içine atarız.
      req.currentRecipe = isExistRecipe;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkRecipeId };
