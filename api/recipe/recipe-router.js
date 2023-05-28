const router = require("express").Router();
const middleware = require("./recipe-middleware");

router.get("/:tarif_id", middleware.checkRecipeId, (req, res, next) => {
  try {
    res.json(req.currentRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
