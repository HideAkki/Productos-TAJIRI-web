export type ProductImage = {
  src: string;
  alt: string;
  label: string;
};

export type Product = {
  title: string;
  subtitle: string;
  description: string;
  details: string;
  variants?: string[];
  variantDetails?: Record<string, string>;
  variantImages?: Record<string, ProductImage[]>;
  coverImage?: string;
  size?: string;
  imageLabel: string;
  features: string[];
  images: ProductImage[];
  color: string;
};

export const products: Product[] = [
  {
    title: 'Suero Costeño',
    subtitle: 'El sabor de nuestra tradición, con una cremosidad excepcional.',
    description: 'Nuestro suero costeño artesanal reúne el carácter auténtico de la cocina colombiana con la riqueza de la leche de búfala.',
    details:
      'Su textura cremosa y su característico toque ligeramente ácido lo convierten en el acompañante perfecto para arepas, yuca, patacones, carnes y muchas otras delicias. TAJIRI®: tradición colombiana que se disfruta en cada bocado.',
    variants: ['16 oz', '9 oz'],
    variantDetails: {
      '16 oz': 'Formato de 16 oz con mayor rendimiento, ideal para compartir y conservar en refrigeración.',
      '9 oz': 'Formato de 9 oz, práctico para disfrutar al momento o llevar en la nevera de la casa.',
    },
    variantImages: {
      '16 oz': [
        { src: '/Suero 16oz - 1.webp', alt: 'Botella de suero costeño 16 oz sobre tela natural', label: 'Etiqueta frontal 16 oz' },
        { src: '/Suero 16oz - 2.webp', alt: 'Detalle de botella de suero costeño 16 oz', label: 'Detalle del envase 16 oz' },
        { src: '/Suero 16oz - 3.webp', alt: 'Suero costeño 16 oz servido en vaso', label: 'Servido en vaso 16 oz' },
      ],
      '9 oz': [
        { src: '/Suero 9oz - 1.webp', alt: 'Botella de suero costeño 9 oz sobre tela natural', label: 'Etiqueta frontal 9 oz' },
        { src: '/Suero 9oz - 2.webp', alt: 'Detalle de botella de suero costeño 9 oz', label: 'Detalle del envase 9 oz' },
        { src: '/Suero 9oz - 3.webp', alt: 'Suero costeño 9 oz servido en vaso', label: 'Servido en vaso 9 oz' },
      ],
    },
    coverImage: '/Portada Suero.webp',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Textura cremosa', 'Toque ligeramente ácido', 'Leche de búfala', 'Elaboración artesanal'],
    images: [],
    color: 'from-[#8f1111] to-[#4a2b22]',
  },
  {
    title: 'Yogur Griego',
    subtitle: 'Una cremosidad que conquista desde la primera cucharada.',
    description: 'Descubre el auténtico placer de nuestro yogur griego artesanal, elaborado con leche de búfala cuidadosamente seleccionada.',
    details:
      'Su textura espesa, suave y aterciopelada, junto con su delicado sabor, lo convierten en una experiencia irresistible. Perfecto para disfrutar solo, acompañar con frutas, granola o crear desayunos y recetas especiales. TAJIRI®: cremosidad extraordinaria, sabor auténtico.',
    variants: ['16 oz', '9 oz'],
    variantDetails: {
      '16 oz': 'Formato de 16 oz, perfecto para bowls y desayunos con suficiente porción.',
      '9 oz': 'Formato de 9 oz, práctico para llevar o consumir en una sola porción.',
    },
    variantImages: {
      '16 oz': [
        { src: '/Yogurt griego 16oz - 1.webp', alt: 'Tarrina de yogur griego 16 oz con tapa', label: 'Tarrina elegante 16 oz' },
        { src: '/Yogurt griego 16oz - 2.webp', alt: 'Yogur griego 16 oz servido con fruta', label: 'Detalle servido 16 oz' },
      ],
      '9 oz': [
        { src: '/Yogurt griego 9oz- 1.webp', alt: 'Tarrina de yogur griego 9 oz con tapa', label: 'Tarrina elegante 9 oz' },
        { src: '/Yogurt griego 9oz- 2.webp', alt: 'Yogur griego 9 oz servido con fruta', label: 'Detalle servido 9 oz' },
      ],
    },
    coverImage: '/Portada Yogurt Griego.webp',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Leche de búfala', 'Textura espesa y suave', 'Para frutas y granola', 'Elaboración artesanal'],
    images: [],
    color: 'from-[#4a2b22] to-[#8f1111]',
  },
  {
    title: 'Yogurt Griego Bebible',
    subtitle: 'Toda la cremosidad de la búfala, ahora para llevar.',
    description: 'Disfruta una experiencia diferente con nuestro yogur griego bebible, elaborado artesanalmente con leche de búfala.',
    details:
      'Su textura suave y fluida y su agradable sabor hacen de cada sorbo un pequeño placer. Ideal para acompañar tus mañanas, disfrutar entre comidas o llevar contigo a cualquier lugar. TAJIRI®: el placer de lo artesanal en cada sorbo.',
    size: '250 ml',
    imageLabel: 'Botella de plástico 250 ml',
    features: ['Leche de búfala', 'Textura suave y fluida', 'Listo para llevar', 'Elaboración artesanal'],
    coverImage: '/yogur griego bebible.png',
    images: [
      { src: '/yogur griego bebible.png', alt: 'Botella de yogur griego bebible de 250 ml', label: 'Presentación de 250 ml' },
    ],
    color: 'from-[#e4b45f] to-[#f3d48a]',
  },
  {
    title: 'Su-Kukayo',
    subtitle: 'Ese irresistible crocante que nos recuerda el sabor de casa.',
    description: 'Inspirado en el tradicional cucayo colombiano, SU-KUKAYO transforma el arroz en una experiencia artesanal llena de sabor y textura.',
    details:
      'Su carácter tostado y crocante despierta recuerdos de aquellas delicias que disfrutábamos en familia. Perfecto para quienes aman los sabores auténticos y buscan algo diferente para picar. SU-KUKAYO®: la tradición que cruje de felicidad.',
    size: '250 g',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Elaborado con arroz', 'Textura crocante', 'Sabor tostado', 'Elaboración artesanal'],
    coverImage: '/Vaso de su-kukayo de arroz crujiente.png',
    images: [
      { src: '/Vaso de su-kukayo de arroz crujiente.png', alt: 'Su-Kukayo de arroz crujiente en vaso con tapa', label: 'Presentación en vaso' },
    ],
    color: 'from-[#8f1111] to-[#e4b45f]',
  },
  {
    title: 'Masa para Arepas',
    subtitle: 'La arepa de siempre, reinventada con el poder de la linaza.',
    description: 'Disfruta el sabor tradicional de una buena arepa con nuestra masa artesanal elaborada a partir de maíz y linaza.',
    details:
      'Una combinación especial que incorpora la fibra propia de la linaza a uno de los alimentos más queridos de nuestra mesa. Lista para preparar arepas frescas en casa, doraditas por fuera y deliciosas por dentro. TAJIRI®: tradición e innovación en cada arepa.',
    size: '1 libra',
    imageLabel: 'Empaque de masa para arepas',
    features: ['Maíz y linaza', 'Con fibra de linaza', 'Lista para preparar', 'Elaboración artesanal'],
    coverImage: '/Barra de masa especiada envuelta en plástico.png',
    images: [
      { src: '/Barra de masa especiada envuelta en plástico.png', alt: 'Masa para arepas envuelta en plástico transparente', label: 'Presentación de masa para arepas' },
    ],
    color: 'from-[#caa65d] to-[#7a4a20]',
  },
  {
    title: 'SARA Dulce',
    subtitle: 'Maíz tostado con un toque dulce',
    description: 'Una golosina artesanal con el sabor del maíz tostado, el azúcar y el limón.',
    details:
      'SARA Dulce combina maíz tostado y molido con azúcar y limón para ofrecer una golosina tradicional con un sabor dulce muy característico.',
    size: '250 g',
    imageLabel: 'Empaque de SARA Dulce',
    features: ['Maíz tostado y molido', 'Con azúcar y limón', 'Golosina artesanal', 'Sabor dulce característico'],
    coverImage: '/Bolsas transparentes con polvo beige.png',
    images: [
      { src: '/Bolsas transparentes con polvo beige.png', alt: 'SARA Dulce en bolsas transparentes con cierre', label: 'Presentación en bolsa' },
    ],
    color: 'from-[#d68f2a] to-[#f8d27d]',
  },
  {
    title: 'Chakula Premium Café',
    subtitle: 'Malteada de café con funcionalidad',
    description: 'Bebida tipo malteada elaborada con extracto de café, fibra soluble y aceite Omega 3.',
    details:
      'Chakula Premium Café combina el sabor del extracto de café con fibra soluble y aceite Omega 3, creando una bebida funcional con identidad y perfil premium.',
    imageLabel: 'Botella de plástico',
    features: ['Extracto de café', 'Fibra soluble', 'Aceite Omega 3', 'Bebida tipo malteada'],
    images: [],
    color: 'from-[#6b3f1d] to-[#b96a2b]',
  },
  {
    title: 'Chakula Premium Cacao',
    subtitle: 'Malteada de cacao con aporte funcional',
    description: 'Bebida tipo malteada preparada con extracto de cacao, fibra soluble y aceite Omega 3.',
    details:
      'Chakula Premium Cacao reúne el sabor del cacao con fibra soluble y aceite Omega 3 para ofrecer una opción indulgente con un enfoque funcional.',
    imageLabel: 'Botella de plástico',
    features: ['Extracto de cacao', 'Fibra soluble', 'Aceite Omega 3', 'Bebida tipo malteada'],
    images: [],
    color: 'from-[#4a2a1a] to-[#8a4b2d]',
  },
  {
    title: 'Nala Peinate',
    subtitle: 'Extracto de café de origen',
    description: 'Café de origen con doble extracción para una experiencia más intensa y concentrada.',
    details:
      'Nala Peinate es un extracto de café de origen preparado con doble extracción, pensado para quienes valoran un café con cuerpo y perfil auténtico.',
    imageLabel: 'Botella de plástico',
    features: ['Extracto de café de origen', 'Doble extracción', 'Perfil intenso', 'Café concentrado'],
    images: [],
    color: 'from-[#2f241d] to-[#7a4a2d]',
  },
  {
    title: 'TURARI',
    subtitle: 'Aderezo líquido para carnes',
    description: 'Preparado a partir de extracto de hierbas para aportar sabor a carnes y platos.',
    details:
      'TURARI es un aderezo líquido para carnes elaborado con extracto de hierbas, ideal para realzar sabores en preparaciones tradicionales y contemporáneas.',
    imageLabel: 'Botella de plástico',
    features: ['Aderezo líquido', 'Para carnes', 'Extracto de hierbas', 'Sabor auténtico'],
    images: [],
    color: 'from-[#2e6b3f] to-[#6e9d4f]',
  },
];
