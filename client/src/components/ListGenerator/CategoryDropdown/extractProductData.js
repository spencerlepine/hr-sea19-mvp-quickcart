// {
//   "meats": [
//     {
//       "_id": "4000789418634",
//       "brands": "Grillsaison - Iss immer!,Geflügelschlachterei Steinfeld",
//       "categories": "de:Hähnchenflügel, en:chickens",
//       "categories_lc": "en",
//       "code": "4000789418634",
//       "countries_lc": "de",
//       "ecoscore_grade": "c",
//       "image_front_small_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.200.jpg",
//       "image_front_thumb_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.100.jpg",
//       "image_front_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.400.jpg",
//       "image_ingredients_small_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/ingredients_de.7.200.jpg",
//       "image_ingredients_thumb_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/ingredients_de.7.100.jpg",
//       "image_ingredients_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/ingredients_de.7.400.jpg",
//       "image_nutrition_small_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/nutrition_de.10.200.jpg",
//       "image_nutrition_thumb_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/nutrition_de.10.100.jpg",
//       "image_nutrition_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/nutrition_de.10.400.jpg",
//       "image_small_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.200.jpg",
//       "image_thumb_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.100.jpg",
//       "image_url": "https://images.openfoodfacts.org/images/products/400/078/941/8634/front_de.4.400.jpg",
//       "ingredients": [
//         {
//           "id": "de:Hähnchenflügel",
//           "percent_estimate": 57.1428571428571,
//           "percent_max": 100,
//           "percent_min": 14.2857142857143,
//           "text": "Hähnchenflügel"
//         },
//         {
//           "id": "en:salt",
//           "percent_estimate": 21.4285714285714,
//           "percent_max": 50,
//           "percent_min": 0,
//           "text": "Speisesalz",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         },
//         {
//           "id": "en:spice",
//           "percent_estimate": 10.7142857142857,
//           "percent_max": 33.3333333333333,
//           "percent_min": 0,
//           "text": "Gewürze",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         },
//         {
//           "id": "en:herb",
//           "percent_estimate": 5.35714285714286,
//           "percent_max": 25,
//           "percent_min": 0,
//           "text": "Kräuter",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         },
//         {
//           "id": "en:rice-flour",
//           "percent_estimate": 2.67857142857143,
//           "percent_max": 20,
//           "percent_min": 0,
//           "text": "Reismehl",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         },
//         {
//           "id": "en:sugar",
//           "percent_estimate": 1.33928571428572,
//           "percent_max": 16.6666666666667,
//           "percent_min": 0,
//           "text": "Zucker",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         },
//         {
//           "id": "en:spice-extract",
//           "percent_estimate": 1.33928571428572,
//           "percent_max": 14.2857142857143,
//           "percent_min": 0,
//           "text": "Gewürzextrakte",
//           "vegan": "yes",
//           "vegetarian": "yes"
//         }
//       ],
//       "ingredients_n": 7,
//       "ingredients_text": "Hähnchenflügel, Speisesalz, Gewürze, Kräuter, Reismehl, Zucker, Gewürzextrakte.",
//       "lang": "de",

const extractProductData = (productObj) => {
  const outputObj = { ...productObj }

  outputObj.name = productObj['name'] || productObj['product_name']
  outputObj.image = (
    productObj["image_front_small_url"]
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
    productObj["image_nutrition_url"]
    || productObj["image_nutrition_thumb_url"]
    || productObj["image_nutrition_small_url"]
  )
  return outputObj;
};

export default extractProductData;