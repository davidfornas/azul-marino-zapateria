// Illustrative categories only: replace with the shop's confirmed collections.
export const collections = [
  {
    id: 'cotidiano',
    number: '01',
    title: 'A diario',
    subtitle: 'La sencillez de cada paso.',
    description:
      'Un espacio para descubrir calzado que acompañe el ritmo de cada día. Categoría de ejemplo, pendiente de selección real.',
    image: '/images/placeholders/calzado-cotidiano.svg',
    alt: 'Composición abstracta en tonos arena; imagen provisional de la categoría A diario.',
  },
  {
    id: 'ocasiones',
    number: '02',
    title: 'Momentos especiales',
    subtitle: 'Un detalle que lo cambia todo.',
    description:
      'Una mirada a esas ocasiones en las que apetece elegir algo diferente. Categoría de ejemplo, sin modelos ni disponibilidad confirmados.',
    image: '/images/placeholders/calzado-ocasiones.svg',
    alt: 'Composición abstracta en tonos marfil y azul; imagen provisional de Momentos especiales.',
  },
  {
    id: 'esenciales',
    number: '03',
    title: 'Esenciales',
    subtitle: 'Tu estilo, a tu manera.',
    description:
      'Un lugar para reunir las piezas que definen tu forma de vestir. Propuesta editorial de ejemplo, pendiente de fotografías y colecciones reales.',
    image: '/images/placeholders/calzado-esenciales.svg',
    alt: 'Composición abstracta en tonos azul y arena; imagen provisional de Esenciales.',
  },
];
export type Collection = (typeof collections)[number];
