'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

type ProductImage = {
  src: string;
  alt: string;
  label: string;
};

type Product = {
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

const products: Product[] = [
  {
    title: 'Suero Costeño',
    subtitle: 'Suavidad costera en cada sorbo',
    description: 'Textura fresca y una tradición auténtica de la costa colombiana.',
    details:
      'Nuestro suero costeño es ligero, ligeramente salado y perfecto para complementar arepas, sopas o para marinar. Disponible en dos formatos para llegar a la mesa con la dosis justa de frescura.',
    variants: ['16 oz', '9 oz'],
    variantDetails: {
      '16 oz': 'Formato de 16 oz con mayor rendimiento, ideal para compartir y conservar en refrigeración.',
      '9 oz': 'Formato de 9 oz, práctico para disfrutar al momento o llevar en la nevera de la casa.',
    },
    variantImages: {
      '16 oz': [
        { src: '/Suero 16oz - 1.png', alt: 'Botella de suero costeño 16 oz sobre tela natural', label: 'Etiqueta frontal 16 oz' },
        { src: '/Suero 16oz - 2.png', alt: 'Detalle de botella de suero costeño 16 oz', label: 'Detalle del envase 16 oz' },
        { src: '/Suero 16oz - 3.png', alt: 'Suero costeño 16 oz servido en vaso', label: 'Servido en vaso 16 oz' },
      ],
      '9 oz': [
        { src: '/Suero 9oz - 1.png', alt: 'Botella de suero costeño 9 oz sobre tela natural', label: 'Etiqueta frontal 9 oz' },
        { src: '/Suero 9oz - 2.png', alt: 'Detalle de botella de suero costeño 9 oz', label: 'Detalle del envase 9 oz' },
        { src: '/Suero 9oz - 3.png', alt: 'Suero costeño 9 oz servido en vaso', label: 'Servido en vaso 9 oz' },
      ],
    },
    coverImage: '/Portada Suero.png',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Cremoso', 'Elaborado artesanalmente', 'Leche de búfala', 'Conservación refrigerada'],
    images: [
      { src: '', alt: 'Botella de suero costeño sobre tela natural', label: 'Etiqueta frontal' },
      { src: '', alt: 'Detalle de botella con tapa', label: 'Detalle del envase' },
      { src: '', alt: 'Suero servido en vaso', label: 'Servido en vaso' },
    ],
    color: 'from-[#8f1111] to-[#4a2b22]',
  },
  {
    title: 'Yogur Griego',
    subtitle: 'Cuerpo cremoso, estilo sereno',
    description: 'Crema espesa y nutritiva para tus recetas o momentos especiales.',
    details:
      'Yogur griego artesanal con cuerpo cremoso y textura firme. Ideal para acompañar frutas, granola o recetas saladas que necesitan un frescor concentrado.',
    variants: ['16 oz', '9 oz'],
    variantDetails: {
      '16 oz': 'Formato de 16 oz, perfecto para bowls y desayunos con suficiente porción.',
      '9 oz': 'Formato de 9 oz, práctico para llevar o consumir en una sola porción.',
    },
    variantImages: {
      '16 oz': [
        { src: '/Yogurt griego 16oz - 1.png', alt: 'Tarrina de yogur griego 16 oz con tapa', label: 'Tarrina elegante 16 oz' },
        { src: '/Yogurt griego 16oz - 2.png', alt: 'Yogur griego 16 oz servido con fruta', label: 'Detalle servido 16 oz' },
      ],
      '9 oz': [
        { src: '/Yogurt griego 9oz- 1.png', alt: 'Tarrina de yogur griego 9 oz con tapa', label: 'Tarrina elegante 9 oz' },
        { src: '/Yogurt griego 9oz- 2.png', alt: 'Yogur griego 9 oz servido con fruta', label: 'Detalle servido 9 oz' },
      ],
    },
    coverImage: '/Portada Yogurt Griego.png',
    imageLabel: 'Vaso Gold de plástico',
    features: ['Elaborado con leche de búfala', 'Textura consistente', 'Ideal en bowls', 'Artesanal'],
    images: [
      { src: '', alt: 'Tarrina de yogur griego con tapa', label: 'Tarrina elegante' },
      { src: '', alt: 'Yogur griego servido con fruta', label: 'Detalle servido' },
      { src: '', alt: 'Etiqueta del yogur griego', label: 'Etiqueta minimalista' },
    ],
    color: 'from-[#4a2b22] to-[#8f1111]',
  },
  {
    title: 'Yogurt Griego Bebible',
    subtitle: 'Ligereza lista para llevar',
    description: 'Listo para llevar, suave y delicado con cuerpo natural.',
    details:
      'Fresco y práctico, este yogurt griego bebible es perfecto para la mañana o merienda. Combina la riqueza de la leche búfala con una sensación ligera y nutritiva.',
    size: '250 ml',
    imageLabel: 'Botella de plástico 250 ml',
    features: ['Fresco y ligero', 'Producto fermentado', 'Ideal para la mañana', 'Conveniente'],
    images: [
      { src: '', alt: 'Botella de yogur bebible con fondo neutro', label: 'Botella de agarre fácil' },
      { src: '', alt: 'Yogur bebible servido en vaso', label: 'Inspiración para la mañana' },
      { src: '', alt: 'Detalle del logo en botella', label: 'Etiqueta refinada' },
    ],
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
    images: [
      { src: '', alt: 'Paquete de Su-Kukayo abierto', label: 'Paquete abierto' },
      { src: '', alt: 'Bocados crujientes en plato', label: 'Bocados crujientes' },
      { src: '', alt: 'Presentación del snack en mesa', label: 'Presentación elegante' },
    ],
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
    images: [
      { src: '', alt: 'Empaque de masa para arepas', label: 'Empaque frontal' },
      { src: '', alt: 'Arepas preparadas con la masa', label: 'Arepas listas' },
      { src: '', alt: 'Detalle de la mezcla artesanal', label: 'Detalle artesanal' },
    ],
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
    images: [
      { src: '', alt: 'Empaque de SARA Dulce', label: 'Empaque frontal' },
      { src: '', alt: 'Detalle del producto en mesa', label: 'Presentación artesanal' },
      { src: '', alt: 'Golosina SARA Dulce abierta', label: 'Detalle del producto' },
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
    images: [
      { src: '', alt: 'Empaque de Chakula Premium Café', label: 'Empaque frontal' },
      { src: '', alt: 'Bebida Chakula Premium Café', label: 'Presentación de la bebida' },
      { src: '', alt: 'Detalle del producto', label: 'Detalle nutricional' },
    ],
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
    images: [
      { src: '', alt: 'Empaque de Chakula Premium Cacao', label: 'Empaque frontal' },
      { src: '', alt: 'Bebida Chakula Premium Cacao', label: 'Presentación de la bebida' },
      { src: '', alt: 'Detalle del producto', label: 'Detalle nutricional' },
    ],
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
    images: [
      { src: '', alt: 'Empaque de Nala Peinate', label: 'Empaque frontal' },
      { src: '', alt: 'Café Nala Peinate servido', label: 'Presentación del café' },
      { src: '', alt: 'Detalle del producto', label: 'Detalle del extracto' },
    ],
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
    images: [
      { src: '', alt: 'Botella de TURARI', label: 'Envase frontal' },
      { src: '', alt: 'TURARI sobre carne', label: 'Uso culinario' },
      { src: '', alt: 'Detalle del aderezo', label: 'Detalle del producto' },
    ],
    color: 'from-[#2e6b3f] to-[#6e9d4f]',
  },
];

export default function ProductosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const selectedImages = selectedProduct
    ? selectedVariant && selectedProduct.variantImages?.[selectedVariant]
      ? selectedProduct.variantImages[selectedVariant]
      : selectedProduct.images
    : [];

  const slideCount = selectedImages.length;

  const activeProductDetails = selectedProduct
    ? selectedProduct.variantDetails && selectedVariant
      ? selectedProduct.variantDetails[selectedVariant] ?? selectedProduct.details
      : selectedProduct.details
    : '';

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setSelectedVariant(null);
    setCurrentSlide(0);
  };

  const goPrevious = () => {
    if (!selectedProduct || slideCount === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const goNext = () => {
    if (!selectedProduct || slideCount === 0) return;
    setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const selectVariant = (variant: string) => {
    setSelectedVariant(variant);
    setCurrentSlide(0);
  };

  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionTitle
            eyebrow="Catálogo"
            title="Nuestros productos artesanales"
            description="Selección de alternativas artesanales que combinan sabor, tradición y detalles premium en cada presentación."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.title}
                className="group overflow-hidden rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 shadow-[0_30px_80px_-55px_rgba(74,43,34,0.12)] transition hover:-translate-y-1 hover:border-[#e4a2b5f]/30 hover:bg-[#fff8f0] opacity-100 transform-none"
              >
                <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${product.color}`}>
                  {product.coverImage ? (
                    <Image
                      src={product.coverImage}
                      alt={`${product.title} portada`}
                      fill
                      className="absolute inset-0 object-cover opacity-90"
                      sizes="100vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-[2rem] bg-white/10" />
                  <div className="relative flex h-full flex-col justify-between p-6 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/90">Producto</span>
                      {product.size ? (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
                          {product.size}
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-3xl font-semibold leading-tight text-white">{product.title}</p>
                      <p className="mt-3 text-sm text-white">{product.imageLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  <p className="text-sm leading-7 text-[#4a2b22]/85">{product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span key={feature} className="rounded-full bg-[#f3d48a]/20 px-3 py-1 text-xs font-semibold text-[#4a2b22]">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[#4a2b22]/10 pt-4">
                    <div className="mb-3 flex flex-wrap gap-2 text-xs text-[#4a2b22]/80">
                      {product.variants?.map((variant) => (
                        <span key={variant} className="rounded-full bg-[#f3d48a]/20 px-3 py-1">
                          {variant}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedVariant(product.variants?.[0] ?? null);
                        setCurrentSlide(0);
                      }}
                      className="rounded-full bg-[#8f1111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f1515]"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            key="product-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-4 sm:py-8"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative mx-auto my-2 w-full max-w-[min(90vw,1700px)] max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[2rem] bg-white/95 shadow-[0_60px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:my-4 sm:max-h-[90vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseDetails}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60"
                aria-label="Cerrar detalle"
              >
                ✕
              </button>

              <div className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
                <div className="relative flex min-h-0 flex-col bg-[#111111] p-6 sm:p-8 lg:p-10">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="relative flex-1 overflow-hidden rounded-[2rem] bg-black"
                  >
                    {selectedImages[currentSlide]?.src ? (
                      <Image
                        src={selectedImages[currentSlide].src}
                        alt={selectedImages[currentSlide].alt}
                        fill
                        className="h-full w-full object-contain"
                        sizes="90vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-white/5" />
                    )}
                  </motion.div>

                  <div className="mt-5">
                    <p className="max-w-2xl text-sm leading-7 text-white/70">{selectedProduct.imageLabel}</p>
                  </div>

                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                    {selectedImages.map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`relative h-20 min-w-[5.5rem] overflow-hidden rounded-[1.5rem] border transition duration-300 ${
                          currentSlide === index
                            ? 'border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.25)]'
                            : 'border-white/15'
                        }`}
                      >
                        {image?.src ? (
                          <>
                            <Image src={image.src} alt={image.alt} fill className="object-cover" />
                            <div
                              className={`absolute inset-0 transition ${
                                currentSlide === index ? 'bg-black/10' : 'bg-black/20'
                              }`}
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-white/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-0 flex-col justify-between overflow-y-auto bg-white p-6 sm:p-8 lg:p-10">
                  <div className="space-y-8 overflow-y-auto pr-1 sm:pr-2">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#4a2b22]/60">Producto exclusivo</p>
                      <div className="space-y-2">
                        <h2 className="text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">{selectedProduct.title}</h2>
                        <p className="max-w-xl text-lg font-medium leading-8 text-[#4a2b22]/70">{selectedProduct.subtitle}</p>
                      </div>
                      <p className="max-w-xl text-base leading-8 text-[#4a2b22]/75">{selectedProduct.description}</p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">
                        <span className="inline-block h-px flex-1 bg-[#4a2b22]/10" />
                        Detalles
                        <span className="inline-block h-px flex-1 bg-[#4a2b22]/10" />
                      </div>
                      <p className="text-sm leading-7 text-[#4a2b22]/80">{activeProductDetails}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">Características</p>
                      <div className="space-y-3">
                        {selectedProduct.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 text-sm leading-7 text-[#4a2b22]/85">
                            <span className="inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#4a2b22]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProduct.variants ? (
                      <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">Presentaciones</p>
                        <div className="flex flex-wrap gap-3">
                          {selectedProduct.variants.map((variant) => (
                            <motion.button
                              key={variant}
                              type="button"
                              onClick={() => selectVariant(variant)}
                              whileHover={{ scale: 1.02 }}
                              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                selectedVariant === variant
                                  ? 'border-[#4a2b22] bg-[#4a2b22] text-white'
                                  : 'border-[#4a2b22]/15 bg-white text-[#4a2b22]'
                              }`}
                            >
                              {variant}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-[#4a2b22]/10 pt-6">
                    {selectedVariant ? (
                      <p className="text-sm text-[#4a2b22]/75">Presentación seleccionada: {selectedVariant}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
