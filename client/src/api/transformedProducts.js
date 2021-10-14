const transformedProducts = (productArr) => {
  return productArr.map((productObj) => {
    const outputObj = {}

    outputObj.name = productObj['name'] || productObj['product_name'] || productObj['nameClean']
    outputObj.image = (
      productObj["image"]
      || productObj["image_front_small_url"]
      || productObj["image_front_thumb_url"]
      || productObj["image_front_url"]
      || productObj["image_ingredients_small_url"]
      || productObj["image_ingredients_thumb_url"]
      || productObj["image_ingredients_url"]
      || productObj["image_nutrition_small_url"]
      || productObj["image_nutrition_thumb_url"]
      || productObj["image_nutrition_url"]
      || productObj["image_small_url"]
      || productObj["image_thumb_url"]
      || productObj["image_url"]
      || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQ6VZJ1R8AS1AYRE8TYHv1xvyaD2sE0Wk4g&usqp=CAU'
    );
    outputObj.nutrition_image = (
      productObj["nutrition_image"]
      || productObj["image_nutrition_url"]
      || productObj["image_nutrition_thumb_url"]
      || productObj["image_nutrition_small_url"]
    )
    outputObj.brand = productObj['brand'] || 'unknown';
    outputObj.id = productObj['id'];
    outputObj._id = productObj['_id'] || productObj['id'];
    outputObj.lang = productObj['lang'] || 'en';
    outputObj.ingredients_text = productObj['ingredients_text'];
    outputObj.ingredients_n = productObj['ingredients_n'] || 1;
    outputObj.categories = productObj['aisle'];
    outputObj.nutriscore_data = productObj['nutriscore_data'] || {};

    return outputObj;
  })
}

export default transformedProducts;

/*
{
  "id": 20081,
  "aisle": "Baking",
  "image": "flour.png",
  "consistency": "solid",
  "name": "all purpose flour",
  "nameClean": "wheat flour",
  "original": "2 1/2 cups all purpose flour",
  "originalString": "2 1/2 cups all purpose flour",
  "originalName": "all purpose flour",
  "amount": 2.5,
  "unit": "cups",
  "meta": [],
  "metaInformation": [],
  "measures": {
    "us": {
      "amount": 2.5,
      "unitShort": "cups",
      "unitLong": "cups"
    },
    "metric": {
      "amount": 591.47,
      "unitShort": "ml",
      "unitLong": "milliliters"
    }
  }
}
*/