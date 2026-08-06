'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import TimelineCard, { type TimelineItem } from '@/components/TimelineCard';
import HistoryModal from '@/components/HistoryModal';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function NuestraHistoriaPage() {
  const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);

  const timeline: TimelineItem[] = [
    {
      year: '2009',
      title: 'El valor de un regalo',
      excerpt: 'Un detalle inesperado despertó la curiosidad por una tradición y sembró la semilla de Productos TAJIRI.',
      description: `En un domingo del año 2009 ocurrió un hecho que cambió el rumbo de mi vida. Mi gran amigo Fernando Navarro Ferro, quien para ese entonces era presidente del sindicato de la USO, me invitó a compartir un momento de amistad en su apartamento. Al despedirme, me entregó como obsequio una botella de mamajuana, sin imaginar que ese regalo se convertiría en el punto de partida de lo que, años después, sería Productos TAJIRI.

La mamajuana es una preparación tradicional de la República Dominicana elaborada con diferentes raíces. Al agregarles licor y miel, estos ingredientes extraen lentamente sus sabores y aromas, dando origen a una bebida ampliamente reconocida en ese país.

Ese obsequio despertó en mí una enorme curiosidad. Durante muchas noches investigué el origen de la mamajuana y comprendí dos enseñanzas que marcaron mi vida. La primera fue descubrir el enorme valor de la sabiduría ancestral y cómo ese conocimiento había permanecido vivo durante generaciones. La segunda fue entender que una tradición también podía convertirse en una oportunidad empresarial cuando se le agregaba valor.

En esa investigación conocí la historia de dos jóvenes estadounidenses que, después de descubrir la mamajuana durante un viaje a la República Dominicana, regresaron varias veces para aprender directamente de quienes conservaban esa tradición. Lo que más me impactó fue que no se conformaron con vender botellas llenas de raíces. Decidieron desarrollar un producto listo para consumir, agregando valor a aquello que habían aprendido.

Esa historia despertó en mí una idea que cambió mi manera de pensar. Yo no quería traer las raíces de la República Dominicana ni fabricar mamajuana en Colombia. Quería aplicar el mismo principio, pero con nuestra propia riqueza natural. Me pregunté si era posible desarrollar productos innovadores a partir de las hierbas aromáticas colombianas, utilizando su sabor y su aroma como base para crear algo completamente diferente.

A partir de ese momento comenzó una etapa de estudio, observación y aprendizaje. Pasaba horas leyendo e investigando sobre las hierbas aromáticas y sus posibles aplicaciones. Poco a poco fui comprendiendo que las grandes oportunidades no siempre consisten en inventar algo nuevo, sino en observar lo que ya existe y descubrir una forma diferente de agregarle valor. Esa fue la verdadera semilla de Productos TAJIRI.

Hoy, al mirar hacia atrás, sigo agradeciendo profundamente a mi amigo Fernando Navarro Ferro. Aquel regalo, hecho con la sencillez de una amistad, fue la chispa que despertó una idea que terminaría convirtiéndose en el proyecto más importante de mi vida.`,
      image: '/2009.jpg',
      caption: 'Origen y curiosidad',
    },
    {
      year: '2014',
      title: 'Las primeras victorias de Productos TAJIRI',
      excerpt: 'En 2014 la marca comenzó a organizarse de forma profesional, construyendo identidad, diseño y presencia comercial.',
      description: `En 2014, Productos TAJIRI comenzó a tomar forma como una marca organizada y profesional. No se trataba solamente de tener una identidad, una imagen, una presentación comercial y una presencia que permitiera mostrarle al mercado que detrás de la marca había seriedad, trabajo y visión empresarial.

La empresa BANTOO Diseño participó en la construcción de la primera identidad gráfica de Productos TAJIRI. Bajo la dirección de proyectos de Laura Juliana Rozo y con el trabajo de diseño de Julio Iván Rodríguez, nació el primer logotipo oficial de la empresa, acompañado del eslogan: “¡Mmm... qué bien me sabe!”. Ese fue uno de los primeros pasos para transformar una idea familiar en una marca con identidad propia.

Ese mismo año, BANTOO Diseño también desarrolló la primera página web de Productos TAJIRI y los primeros diseños profesionales de etiquetas, piezas gráficas y material publicitario. Con ello, la marca empezó a proyectarse de una manera más organizada, coherente y cercana al mercado.

En esa etapa también se trabajó en la presentación comercial del producto. Empresas como Bolten Ltda., con el acompañamiento de Óscar Duque, aportaron en el desarrollo del sistema de empaque y termoencogido que permitió presentar los productos de una forma más profesional. También se realizaron consultas técnicas con Casa de la Licuadora Industrial, buscando equipos y soluciones que ayudaran a fortalecer la capacidad de producción.

Cada uno de esos pasos fue una victoria. Registrar una marca, construir una imagen, desarrollar etiquetas, buscar proveedores, diseñar empaques y salir al mercado son logros que hacen parte de la memoria de Productos TAJIRI. Aunque esa primera etapa dejó grandes aprendizajes, también dejó algo muy valioso: la certeza de que una idea puede convertirse en empresa cuando se trabaja con disciplina, visión y el apoyo de personas que creen en el proyecto.`,
      image: '/2014.JPG',
      caption: 'Primeras victorias',
    },
    {
      year: '2024',
      title: 'Nunca abandoné mi propósito',
      excerpt: 'Tras una etapa de pausa, la marca retoma su camino con un suero costeño artesanal, la leche de búfala y una nueva visión.',
      description: `Cuando cerré la primera etapa de Productos TAJIRI ya había cumplido uno de los grandes objetivos de mi vida laboral: después de 31 años de trabajo continuo en Ecopetrol, obtuve mi jubilación. Había comenzado a trabajar desde los once años y, sin darme cuenta, sentí que también me había ganado el derecho a hacer una pausa.

Durante varios años disminuí el ritmo de mis investigaciones. Me dediqué a otros proyectos familiares, a la finca El Mirador y, posteriormente, a organizar nuestro regreso definitivo a Bucaramanga. Sin embargo, hubo algo que nunca desapareció: el deseo de dejar un legado para mi familia. Ese propósito permaneció intacto.

Con el paso del tiempo volvió a despertarse en mí el espíritu emprendedor. Recordé el suero costeño que tantas veces había disfrutado en mi tierra, Barrancabermeja, y decidí asumir un nuevo reto: desarrollar un suero costeño completamente artesanal, elaborado sin preservantes ni componentes químicos artificiales.

Las pruebas fueron muchas. Hubo aciertos, errores y momentos de frustración. Incluso llegué a ensayar alternativas que se alejaban de mis principios. Pero comprendí que ese no era el camino. Si Productos TAJIRI iba a renacer, debía hacerlo respetando la filosofía que siempre había querido defender: alimentos artesanales, honestos y elaborados de la forma más natural posible.

Después de innumerables ensayos llegó el día en que encontré el resultado que estaba buscando. Había logrado desarrollar un suero costeño artesanal que cumplía con mis expectativas de calidad y también con la posibilidad de convertirse en un negocio sostenible.

Mi primera cliente fue una señora que trabajaba realizando labores de aseo en el edificio donde vivía. Todavía conservo la fotografía de ese momento y del billete de cinco mil pesos con el que me pagó. Más que una venta, fue la confirmación de que Productos TAJIRI volvía a ponerse en marcha.

Posteriormente dediqué un tiempo a otros proyectos personales y empresariales, entre ellos el desarrollo de una cocina oculta de comida KETO. Aquella experiencia también me dejó grandes aprendizajes, pero comprendí que ese no era el camino que quería recorrer.

Entonces regresé al punto donde realmente estaba mi pasión: el desarrollo de alimentos artesanales. A comienzos de 2024 retomé la producción de suero costeño, inicialmente con apenas cuatro litros semanales de leche de vaca. Poco después descubrí las extraordinarias cualidades de la leche de búfala y tomé una decisión que cambiaría nuevamente el rumbo de Productos TAJIRI.

Sin saberlo, ese sería el comienzo de una nueva etapa de innovación que daría origen a los productos que hoy representan la esencia de nuestra marca.`,
      image: '/2024.png',
      caption: 'Renacimiento',
    },
  ];

  const archiveItems = [
    {
      title: 'Fotografías de la familia',
      description: 'Imágenes que muestran los orígenes, el trabajo diario y la vida alrededor de la leche de búfala.',
    },
    {
      title: 'Documentos históricos',
      description: 'Registros, actas y materiales que narran la evolución de la marca a lo largo del tiempo.',
    },
    {
      title: 'Acontecimientos importantes',
      description: 'Momentos clave de crecimiento, reconocimiento y renovación que han marcado la trayectoria de TAJIRI.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeUp}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-center text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Nuestra Historia</p>
                <h1 className="text-center mt-4 text-5xl font-semibold tracking-tight text-[#4a2b22] sm:text-6xl">
                  Donde observar antes que ver y escuchar antes que oír se convirtieron en innovación.
                </h1>
              </div>
            </div>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-justify text-lg leading-8 text-[#4a2b22]/80"
          >
            Productos TAJIRI nació mucho antes de fabricar su primer producto. Nació el día en que entendí que la innovación no siempre consiste en inventar algo completamente nuevo, 
            sino en observar con atención aquello que hace parte de nuestra cultura y descubrir el valor que otros pasan por alto. La inspiración llegó al conocer la mamajuana de República Dominicana. Comprendí que un pueblo había logrado convertir su tradición en un producto con identidad propia.
            Entonces me hice una pregunta que cambiaría mi vida: ¿por qué Colombia no podía hacer lo mismo con su riqueza gastronómica, sus hierbas aromáticas y sus alimentos tradicionales?<br></br><br></br>

            Esa pregunta dio origen a una forma de pensar que hoy guía cada desarrollo de Productos TAJIRI. No buscamos copiar. Buscamos observar, investigar, experimentar y crear productos
            artesanales que respeten las materias primas, honren nuestras tradiciones y aporten valor a quienes los disfrutan. Esa manera de pensar nació mucho antes de la empresa. Crecí viendo a mis padres trabajar con honestidad, creatividad y esfuerzo. De ellos aprendí que las oportunidades no siempre
            aparecen: muchas veces hay que descubrirlas observando aquello que los demás simplemente ven.<br></br><br></br>

            Después de dedicar gran parte de mi vida a la industria del petróleo y de formarme profesionalmente, decidí cumplir el sueño que me acompañaba desde muy joven: construir una
            empresa que dejara un legado para mi familia y, si Dios lo permite, también para Colombia. Hoy, cada marca, cada producto y cada desarrollo de Productos TAJIRI forman parte de esa misma historia. La línea de tiempo que encontrarás a continuación no solo cuenta cuándo nació 
            cada proyecto; cuenta cómo una idea, una pregunta y una manera diferente de observar el mundo fueron dando vida a un propósito que sigue creciendo.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="text-center text-lg font-semibold text-[#4a2b22]"
          >
            <br></br><br></br>
            <strong>Bienvenido a nuestra historia, bienvenido a Productos TAJIRI</strong>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute left-10 top-12 hidden h-[calc(100%-4rem)] w-px bg-[#e4b45f]/15 md:block" />

          <motion.div variants={fadeUp} className="mb-12 w-full max-w-3xl text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Línea de tiempo</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">De donde venimos y hacia donde vamos</h2>
          </motion.div>

          <div className="mx-auto w-full max-w-[92vw] space-y-20 md:pl-16 lg:pl-20 xl:pl-24">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative md:flex md:items-start md:gap-10">
                <div className="absolute left-2 top-8 hidden h-5 w-5 rounded-full border border-[#e4b45f]/40 bg-white shadow-sm md:block">
                  <span className="mx-auto h-2.5 w-2.5 rounded-full bg-[#e4b45f]" />
                </div>
                <TimelineCard key={item.year} item={item} onOpen={() => setActiveItem(item)} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <HistoryModal item={activeItem} open={Boolean(activeItem)} onClose={() => setActiveItem(null)} />

      {/* Founder Bio Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <SectionTitle
            eyebrow="Fundador"
            title="Isnel Useda Díaz"
          />
          <motion.div
            variants={fadeUp}
            className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center"
          >
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8f1111]/80">Sobre Isnel</p>
              <p className="mt-6 text-lg leading-8 text-[#4a2b22]/80">
                Nací en Barrancabermeja dentro de una familia trabajadora y emprendedora. Desde niño ayudaba a mi madre a vender sus dulces de arroz y cocadas, y participaba en la crianza de pollos y cerdos; además, vendía limones, chance, pan y criaba chivos. Mi padre también trabajaba de manera independiente, distribuyendo cerveza en su propio camión. De ellos aprendí que el trabajo, la iniciativa y la constancia eran parte natural de la vida.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4a2b22]/80">
                Me casé a los 17 años y llevo 48 años compartiendo mi vida con mi esposa. Soy padre de tres hijos (Zuley, Nini y Alberto), y Zuley es la creadora de los videos para las redes sociales de TAJIRI. Soy abuelo de tres nietos (Sarah, Héctor y Álvaro); Sarah es diseñadora gráfica y responsable de las etiquetas de nuestros productos, y Héctor es ingeniero de sistemas y encargado del desarrollo de la página web y del software de suscripciones.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4a2b22]/80">
                Ingresé a Ecopetrol con estudios de primaria y, mientras trabajaba, me formé como administrador de empresas y realicé dos especializaciones. Después de 31 años de servicio, terminé mi carrera como coordinador de mantenimiento de edificios en Bogotá, con 150 personas bajo mi responsabilidad.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4a2b22]/80">

                Durante cerca de 14 años tuvimos la finca El Mirador, en Nimaima, Cundinamarca, donde sembramos alrededor de 2.000 árboles frutales. Allí fortalecí mi interés por el campo, los alimentos y el aprovechamiento de los recursos.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4a2b22]/80">
                Me considero trabajador, creativo, perseverante, práctico, exigente, soñador y visionario. Disfruto caminar, leer, investigar y compartir con los míos. Me duele que los alimentos se desperdicien, por eso creo en la economía circular. Mi mayor pasión es imaginar y desarrollar productos originales desde cero, dejando un legado para mi familia.
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#f3d48a]/25 bg-[#f3d48a]/5">
              <img
                src="/Isnel Useda.jpg"
                alt="Isnel Useda Díaz"
                className="h-full w-full max-h-[560px] object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Family Section */}
      

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <SectionTitle
            eyebrow="Nuestros Pilares"
            title="Valores que Nos Definen"
          />
          <motion.div variants={staggerContainer} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 'Autenticidad', icon: '🌾' },
              { value: 'Sostenibilidad', icon: '🌍' },
              { value: 'Calidad', icon: '✨' },
              { value: 'Familia', icon: '❤️' },
            ].map((item) => (
              <motion.div
                key={item.value}
                variants={fadeUp}
                className="rounded-[1.5rem] border border-[#f3d48a]/25 bg-[#fff8f0]/95 p-6 text-center"
              >
                <p className="text-3xl">{item.icon}</p>
                <h4 className="mt-4 font-semibold text-[#4a2b22]">{item.value}</h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
