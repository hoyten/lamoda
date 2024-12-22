const getRandomString = () => Math.random().toString(36).substring(2);

const getRandomNum = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

export default function generateGoods(count = 100) {
  const goods = [];
  for (let i = 0; i < count; i++) {
    goods.push(generateGood());
  }
  return goods;
}

const COLORS = ["Черный", "Белый", "Бежевый", "Серый", "Синий", "Розовый"];
const TYPES = ["Рубашка", "Платье", "Шорты", "Брюки", "Куртка", "Свитер"];
const GENDERS = ["Мужское", "Женское", "Детское"];
const BRANDS = ["Nike", "Adidas", "Zara", "Uniqlo", "H&M", "Levi's"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// Генерация случайного цвета
const generateColor = () => COLORS[getRandomNum(0, COLORS.length - 1)];
// Генерация случайного типа одежды
const generateType = () => TYPES[getRandomNum(0, TYPES.length - 1)];
// Генерация случайного пола
const generateGender = () => GENDERS[getRandomNum(0, GENDERS.length - 1)];
// Генерация случайного бренда
const generateBrand = () => BRANDS[getRandomNum(0, BRANDS.length - 1)];
// Генерация случайного размера
const generateSizes = () => {
  const selectedSizesCount = getRandomNum(1, SIZES.length); // Случайное количество размеров
  const shuffledSizes = SIZES.sort(() => Math.random() - 0.5); // Перемешиваем массив размеров
  return shuffledSizes.slice(0, selectedSizesCount); // Возвращаем случайное количество размеров
};

// Генерация названия товара
const generateName = () => `${generateBrand()} ${generateType()}`;
// Генерация уникального описания
const DESCRIPTION_WORDS = [
  "Унисекс",
  "Поло",
  "Футболка",
  "Лонгслив",
  "Брендовое",
  "Комфортное",
  "Легкое",
  "Повседневное",
];
const generateUniqueDescription = (length = 4) => {
  const shuffledWords = DESCRIPTION_WORDS.sort(() => Math.random() - 0.5);
  return shuffledWords.slice(0, length).join(" ");
};

// Генерация скидки
const generateDiscount = () => getRandomNum(0, 30); // Процент скидки (0–30%)

// Генерация товара
const generateGood = () => {
  const price = getRandomNum(500, 90000);
  const discount = generateDiscount();
  const discountedPrice = discount
    ? Math.round(price * (1 - discount / 100))
    : price;

  return {
    id: Date.now() + getRandomString(),
    name: generateName(),
    description: generateUniqueDescription(),
    color: generateColor(),
    gender: generateGender(),
    brand: generateBrand(),
    sizes: generateSizes(), // Генерация размеров
    rating: generateRating(),
    price,
    discount,
    discountedPrice,
    dateAdded: new Date(
      Date.now() - getRandomNum(0, 31556952000)
    ).toISOString(), // Случайная дата в прошлом году
    image: generateImage(),
  };
};

const IMAGES = [
  "https://a.lmcdn.ru/img600x866/R/T/RTLADV020701_24827473_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADS866101_24450930_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADP980801_24936079_1_v2_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADV020501_24827460_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADS222201_24636595_1_v1_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADQ627701_24092544_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADP980901_24882061_1_v2_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADW907401_25321390_1_v1_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADS311201_24822679_1_v3_2x.jpg",
  "https://a.lmcdn.ru/product/R/T/RTLADP102001_24926810_1_v3_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADN937401_24776653_1_v2_2x.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADU871801_24817244_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADV961701_25053018_1_v1.jpg",
  "https://a.lmcdn.ru/img600x866/R/T/RTLADN214901_24233311_4_v1_2x.jpg",
];

const generateRating = () => getRandomNum(1, 100);
const generateImage = () => IMAGES[getRandomNum(0, IMAGES.length - 1)];
