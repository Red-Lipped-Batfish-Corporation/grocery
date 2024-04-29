
// const recipeController = {
//     async getRecipes (req, res, next) {
//       try {
//         const {ingredients} = req.query
//         console.log('i consoled')
//         console.log(`https://api.spoonacular.com/recipes/random?apiKey=96de5f8d876b4599a17a24264d8ba2f9&include-tags=${ingredients}`)
//         const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=96de5f8d876b4599a17a24264d8ba2f9&include-tags=${ingredients}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data from API with status: ' + response.status);
//         }
//         const recipe = await response.json(); 
  
//         if (!recipe) { 
//           return next({
//             log: 'Message: Item names not found in DB',
//             status: 404,
//             message: { error: 'Could not find items in DB!'},
//           });
//         }
        
//         // contains a sanitized object
//         res.locals.doc = recipe.recipes[0];
//         console.log( res.locals.doc)
    
//         // ***PATHS TO SEARCH RECIPE OBJECT***
//         // Summary of Recipe: .summary
//         // Instructions: .instructions
//         // Recipe Card: .analyzedInstructions

//         // console.log(res.locals.doc.summary); 
//         return next();
//       } catch (err) {
//         return next({
//           log: 'Error in recipeController.getRecipes: ' + err,
//           status: 500,
//           message: { error: 'Message: ' + err},
//         });
//       }
//     }
//   };
  
//   module.exports = recipeController;

const recipeController = {
  async getRecipes (req, res, next) {
    try {
      const { ingredients } = req.query; 
      if (!ingredients) {
        return res.status(400).send({ error: 'Ingredients parameter is required' });
      }

      const lowerCaseIngredients = ingredients.toLowerCase();

      const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=96de5f8d876b4599a17a24264d8ba2f9&tags=${lowerCaseIngredients}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Spoonacular API with status: ' + response.status);
      }
      const data = await response.json();

      if (!data || !data.recipes || data.recipes.length === 0) { 
        return next({
          log: 'No recipes found for the given ingredients',
          status: 404,
          message: { error: 'No recipes found' },
        });
      }
      
      res.locals.doc = data.recipes[0]; 
      console.log(res.locals.doc)
      return next();
    } catch (err) {
      return next({
        log: 'Error in recipeController.getRecipes: ' + err,
        status: 500,
        message: { error: 'Internal server error: ' + err },
      });
    }
  }
};

module.exports = recipeController;


/*
 * @Author: Christie Laferriere & Abel xabelpenguin@gmail.com
 * @Date: 2024-04-27 5:40 pm
 * @Last Modified by: christie.laferriere@gmail.com 
 * @Last Modified time: 2024-04-29 1:30 AM 
 */