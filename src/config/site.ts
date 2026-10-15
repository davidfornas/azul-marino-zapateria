export interface NavItem {
  label: string;
  path: string;
}

export interface WhatsAppConfig {
  phone: string;
  message: string;
}

export interface InstagramConfig {
  profileUrl: string;
  dmUrl: string;
  handle: string;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  locationLabel: string;
}

export interface GoogleConfig {
  reviewsUrl: string;
  leaveReviewUrl: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  nav: NavItem[];
  whatsapp: WhatsAppConfig;
  instagram: InstagramConfig;
  google: GoogleConfig;
  contact: { address: string; postalAddress: string; mapsUrl: string; phone: string; phoneLabel: string };
  presentationUrl: string;
}

// Official brand and contact details supplied by Azul Marino Zapatería.
export const site: SiteConfig = {
  brand: {
    name: 'Azul Marino Zapatería',
    tagline: 'Más de 30 años de calidad, confianza y estilo.',
    locationLabel: 'Castellón de la Plana',
  },
  nav: [{ label: 'Inicio', path: '/' }],
  whatsapp: {
    phone: '+34 641 60 62 10',
    message: 'Hola, he visto vuestra página web y me gustaría recibir información sobre vuestro calzado.',
  },
  instagram: { profileUrl: 'https://www.instagram.com/azulmarinozapateria/', dmUrl: '', handle: '@azulmarinozapateria' },
  google: { reviewsUrl: '', leaveReviewUrl: '' },
  contact: {
    address: 'Calle Maestro Ripollés, 16',
    postalAddress: '12003 Castellón de la Plana, Spain',
    mapsUrl: 'https://maps.app.goo.gl/QNKenuSytVNHQoxv5?g_st=aw',
    phone: '+34964039447',
    phoneLabel: '964 03 94 47',
  },
  presentationUrl: 'https://www.instagram.com/p/DR4ISenigcE/?mdxt=OWo2bG91b3FrZ2Ez',
};
