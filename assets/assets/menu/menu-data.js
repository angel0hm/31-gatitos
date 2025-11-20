// menu-data.js

const menuData = [
  {
    col: 1,
    title: "Michi comida",
  },
  {
    col: 2,
    title: "Michi bebidas",
  },
  {
    col: 3,
    title: "Michi postres",
  },
  {
    col: 1,
    title: null,
    subtitle: "Hot miaus",
    description: "Hot dogs hechos por y para l@s Karen",
    image: "assets/assets/menu/hotmiau.png",
    items: [
      {
        name: "Hot miau",
        desc: "Salchicha a la parrilla, queso tipo mozarella, jitomate, cebolla, hummus y mayonesa",
        price: "$95"
      },
      {
        name: "Hot miau norteño",
        desc: "Salchicha a la parrilla, queso tipo mozarella, hummus y mayonesa. Cubierto de delicioso chilli",
        price: "$140"
      }
    ]
  },
  {
    col: 1,
    title: null, 
    subtitle: "Purrritos",
    description: "Acompañados de ensalada",
    image: "assets/assets/menu/purrito.png",
    items: [
      {
        name: "Chavela (Chorizo con papas)",
        desc: "Chorizo de soya con papas, queso mozarella, arroz y frijol",
        price: "$95"
      },
      {
        name: "Titina (Chilorio)",
        desc: "Carne de soya deshebrada, chiles, jitomate, cebolla, queso, arroz y frijol",
        price: "$120"
      },
      {
        name: "Sugerencia del chefcito",
        desc: "Pregunta por el purrrito del día",
        price: "$110"
      }
    ]
  },
  {
    col: 1,
    title: null,
    subtitle: "Anvorguesas",
    description: "Incluye guarnición de papas",
    image: "assets/assets/menu/anvorguesa.png",
    items: [
      {
        name: "Gatifer",
        desc: "Anvorguesa con queso, lechuga, jitomate, cebolla, mostaza, catsup, hummus y mayonesa",
        price: "$165"
      },
      {
        name: "Toro",
        desc: "Anvorguesa con doble queso, jamón, lechuga, jitomate, cebolla, mostaza, catsup, hummus y mayonesa",
        price: "$180"
      },
      {
        name: "Michi chickin",
        desc: "Anvorguesa sabor pollo, queso, lechuga, jitomate, cebolla, mostaza, catsup, hummus y mayonesa",
        price: "$175"
      }
    ]
  },

  {
    col: 1,
    title: null, 
    subtitle: "Pizzetas",
    description: "Pan pita tamaño personal",
    image: "assets/assets/menu/pizzeta.png",
    items: [
      {
        name: "Rauuuul",
        desc: "Queso, meat balls, jitomate y albahaca",
        price: "$115"
      },
      {
        name: "Karen macho",
        desc: "Queso, jamón y piña",
        price: "$105"
      },
      {
        name: "Karen",
        desc: "Queso, champiñón y espinaca",
        price: "$105"
      },
      {
        name: "Muchaha",
        desc: "Mezcla de 3 quesos",
        price: "$115"
      }
    ]
  },  

  {
    col: 2,
    title: null,
    subtitle: "Bebidas calientes",
    description: "Nuestro café es orgánico y de comercio justo",
    image: "assets/assets/menu/cafe.png",
    items: [
      { name: "Americano", desc: "200 ml", price: "$50" },
      { name: "Latte", desc: "200 ml", price: "$60" },
      { name: "Exprrresso", desc: "30 ml", price: "$45" },
      { name: "Exprrresso cortado", desc: "40 ml", price: "$55" },
      { name: "Exprrresso doble", desc: "50 ml", price: "$65" },
      { name: "Cat-puccino", desc: "250 ml", price: "$65" },
      { name: "Té", desc: "250 ml", price: "$45" }
    ]
  },

  {
    col: 2,
    title: null,
    subtitle: "Bebidas frías",
    description: "Perfectas para refrescarte",
    image: "assets/assets/menu/te.png",
    items: [
      { name: "Frrrappuccino", desc: "500 ml", price: "$85" },
      { name: "Frrrappuccino Chai", desc: "500 ml", price: "$95" },
      { name: "Frappuccino Matcha", desc: "500 ml", price: "$95" },
      { name: "Gateada", desc: "350 ml. Malteada", price: "$95" },
      { name: "Smothie", desc: "350 ml. Mango, mora azul, frutos rojos, taro o guanábana", price: "$75" },
      { name: "Smothie verde", desc: "350 ml. Hojas verdes, apio, nopal, piña, limón y miel de agave", price: "$85" },
      { name: "Cat-fé frío", desc: "500 ml. El frapuccion arteanal 'Shakeado con hielo'", price: "$70" },
      { name: "Fulanito", desc: "80 ml. Café infusionado en frío servido con agua tónica y un toque de naranja", price: "$85" },
      { name: "Soda italiana", desc: "500 ml. Mango, maracuyá lichi, mora azul, limón, menta o vainilla", price: "$55" },
      { name: "Kombucha", desc: "355 ml. 100% natural, probiótica y ligeramente gasificada, hecha de la fermentación de té verde y té negro", price: "$75" },
      { name: "Gatillo carajillo", desc: "60 ml", price: "$120" },
      { name: "Refresco", desc: "355 ml. Coca-cola, manzana, orange crush o Dr. Pepper", price: "$45" },
      { name: "Agua mineral", desc: "325 ml", price: "$45" }
    ]
  },
  {
    col: 3,
    title: null,
    subtitle: "Postres con helado",
    description: "Para ronronear",
    image: "assets/assets/menu/postreCH.png",
    items: [
      { name: "Pastel helado", desc: "Pastel de galleta casera con helado", price: "$95" },
      { name: "Sandwich helado", desc: "Deliciosa galleta casera rellena de helado", price: "$89" },
      { name: "Helado flotante", desc: "Helado de vainilla flotando en refresco Dr. Pepper", price: "$85" },
      { name: "Afo-gatto", desc: "Helado ahogado en expresso", price: "$85" },
      { name: "Michihelado", desc: "2 bolas: Maple, chocolate, cookies & cream, chocomenta, vainilla o pumpkin", price: "$85" }
    ]
  },
  {
    col: 3,
    title: null,
    subtitle: "Postres sin helado",
    description: "Para ronronear",
    image: "assets/assets/menu/postreSH.png",
    items: [
      { name: "Tira-michú", desc: "Sabor café o chocolate", price: "$85" },
      { name: "Pastel gatilda", desc: "Rebanada de pastel de chocolate ¡Tú puedes Bruce!", price: "$85" },
      { name: "Paleta Miau-gnum", desc: "Sabor vainilla", price: "$75" },
    ]
  },
  {
    col: 3,
    title: null,
    subtitle: "Michi pan",
    description: "Pastelillos caseros hechos con mucho chocolate y ronroneos",
    image: "assets/assets/menu/pan.png",
    items: [
      { name: "Michiconcha", desc: "Vainilla o chocolate", price: "$42" },
      { name: "Michi gansito", desc: "Sabor chocolate", price: "$42" },
      { name: "Michi chocorrol", desc: "Sabor chocolate", price: "$42" },
      { name: "Michi pingüino", desc: "Pingüinito de chocolate", price: "$42" }
    ]
  }
];
