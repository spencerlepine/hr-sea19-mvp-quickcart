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

  outputObj.name = productObj['product_name']
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
    || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHyskKDQsJCY3Jx8lMT0tMTU3Ojo6Iys/OD9EQzRCRTcBCgoKDg0OGxAQGjclICAtLS0tLS8rLTcrLSstLS0tLS03KzctLTcvLS0tLS0tLTItLTctLS0tLS0uLS0zLTUtLf/AABEIADIAMgMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAAIDBAUBB//EAC4QAAIBAwIEAwcFAAAAAAAAAAECAwAEEQUhEjFBURNhoRQiI0JxgcEGUpHR8P/EABoBAAEFAQAAAAAAAAAAAAAAAAABAgMEBQb/xAAqEQACAgEEAAUCBwAAAAAAAAAAAQIDEQQSITEFEyIyQVFhFEJicYGh4f/aAAwDAQACEQMRAD8A9woAjlnjhAMrBcnAzUc7Yw9zwOjFy6QknicZWRT96I2wl0wcWu0PLAAkkbc6e2NM661eCLaP4h8uVZ9/iNdbxHks16WUvsWrG5F3biUDHQgVbpt82Ckvkhshslgs1MMOUgGJ+okRxEwuRHKmcJw54s/Tl9ayvElBpZlhr4wW9K2n1kH0up0x4mM9lbNYE7pR/wANFRix3t7NxBiw33zTPxj/ADZBVofFEszBnncx/MqABvtmpK4xk8zk8fxn+wlJpYSCjSo7aOzVbRmaPJOWO+fOup0XlKpeU8oyLt+97+y/VsiKeo3gtLfjAy7HCjzqtqr/ACoZXZJVXvlhgpcyMzM7MWdtyTXKam59t5ZqwhjhGagZ3aQHCZ4V88cz/u1UnFqPLJuDkSyNLMeaZ2/imRrco8ZY7KJrBmjBDn5jjHbNTxe1IbI29Ouza3SsTiN8Bx+a0NDqXRd+llW+pTh9wprrE8mUDeu3HiXZjVh8IY+53P4rC8Tty9v0L2mjxkw5yRhAcM54RXPJZZoLrI5kiRQFjBA2yadY4PqI1ZyQWjKIOPhJLMW9dvSl3RUehWnknsvDMYYheJstyGRvU1exRXWRss54J5NwRnpSJZmDfHAaqPdG55V2sfajFfYJaoGGrXSY7SDbmCOfoa5vxNNTkzR0zW0o2XhzTSPkN4fu4zyPWs3S1rDbLNja9JJcRpKwjRiGPMjt1p8qq7JYXA2Lklk5cRqkfDGiHoAdsUlsFnCSFhLLyNhSOBVWMnIG7DakzCHtF9UuyxaR+1XcUP723+g3PpVnSVeZakR3T2wyGldauEZBl6xodhrBtzfxOzW8gkjZJGQg9jwkZHlTJ1QsXqWR9dkoe1mfqmhXT3FkujtaWtoiSLccasXPIrw4OOeck9+tUtR4fC2KUeMfQmq1DjndyZN1pesabdwSC3bUYJuITmAhPZgORAJy+Seg2xVCfhUqo7ovP7FmOqjN4lwUhc30usx2iaRqLjwyxmNuRGh6Ak4GcZqotFfNb0uV8Psm82tcNl8Wl/I3CunzA+YCiiOgvbxsGPUQXTCPRtL9iBlmIa4cYOOSDsP7rd0mjVKy+yjdc5vjo1avEAqAFQAqAFQAqAFQAqAP/9k='
  );
  return outputObj;
};

export default extractProductData;