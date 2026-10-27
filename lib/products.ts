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
    subtitle: 'Suavidad costera en cada cucharada',
    description: 'Textura fresca y una tradición auténtica de la costa colombiana.',
    details:
      'Nuestro suero costeño es ligero, ligeramente salado y perfecto para complementar arepas, sopas o para marinar. Se consume con cuchara o sobre alimentos, y está disponible en dos formatos para llegar a la mesa con la dosis justa de frescura.',
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
    features: ['Cremoso', 'Elaborado artesanalmente', 'Leche de búfala', 'Conservación refrigerada'],
    images: [],
    color: 'from-[#8f1111] to-[#4a2b22]',
  },
  {
    title: 'Yogur Griego',
    subtitle: 'Cuerpo cremoso, estilo sereno',
    description: 'Crema espesa y nutritiva para tus recetas o momentos especiales.',
    details:
      'Yogur griego artesanal con cuerpo cremoso y textura firme. Ideal para acompañar frutas, granola o recetas saladas que necesitan un frescor concentrado. Se consume a cuchara.',
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
    features: ['Elaborado con leche de búfala', 'Textura consistente', 'Ideal en bowls', 'Artesanal'],
    images: [],
    color: 'from-[#4a2b22] to-[#8f1111]',
  },
  {
    title: 'Yogurt Griego Bebible',
    subtitle: 'Ligereza lista para llevar',
    description: 'Listo para llevar, suave y delicado con cuerpo natural.',
    details:
      'Fresco y práctico, este yogurt griego bebible es perfecto para la mañana o merienda. Combina la riqueza de la leche búfala con una sensación ligera y nutritiva. Es un producto líquido que se bebe.',
    size: '250 ml',
    imageLabel: 'Botella de plástico 250 ml',
    features: ['Fresco y ligero', 'Producto fermentado', 'Ideal para la mañana', 'Conveniente'],
    images: [],
    color: 'from-[#e4b45f] to-[#f3d48a]',
  },
  {
    title: 'Su-Kukayo',
    subtitle: 'Crujiente artesanal con carácter',
    description: 'Un snack artesanal con un sabor que reconforta.',
    details:
      'Crujiente y sabroso, el Su-Kukayo es una opción tradicional para compartir o disfrutar como snack. Su preparación artesanal garantiza textura y sabor auténtico.',
    size: '250 g',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Crujiente', 'Hecho a mano', 'Textura noble', 'Sabor reconfortante'],
    images: [],
    color: 'from-[#8f1111] to-[#e4b45f]',
  },
  {
    title: 'Masa para Arepas',
    subtitle: 'Tradición y bienestar en cada arepa',
    description: 'Una opción artesanal para preparar arepas con un perfil nutritivo y auténtico.',
    details:
      'Elaborada con harina de maíz amarillo y linaza, esta masa está pensada para quienes buscan una opción amable para la digestión sin perder el sabor tradicional.',
    size: '1 libra',
    imageLabel: 'Empaque de masa para arepas',
    features: ['Harina de maíz amarillo', 'Con linaza', 'Buena para la digestión', 'Preparación sencilla'],
    images: [],
    color: 'from-[#caa65d] to-[#7a4a20]',
  },
  {
    title: 'SARA Dulce',
    subtitle: 'Maíz tostado con un toque dulce',
    description: 'Una golosina artesanal con el sabor del maíz tostado, el azúcar y el limón.',
    details:
      'SARA Dulce combina maíz tostado y molido con azúcar y limón para ofrecer una golosina tradicional, crujiente y con un perfil dulce muy característico.',
    size: '250 g',
    imageLabel: 'Empaque de SARA Dulce',
    features: ['Maíz tostado y molido', 'Con azúcar y limón', 'Golosina artesanal', 'Sabor dulce característico'],
    images: [],
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
