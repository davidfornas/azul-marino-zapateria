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
}

// Contact details remain empty until supplied by Azul Marino Zapatería.
export const site: SiteConfig = {
  brand: {
    name: 'Azul Marino Zapatería',
    tagline: 'Tu zapatería',
    locationLabel: '',
  },
  nav: [{ label: 'Inicio', path: '/' }],
  whatsapp: { phone: '', message: '' },
  instagram: { profileUrl: '', dmUrl: '', handle: '' },
  google: { reviewsUrl: '', leaveReviewUrl: '' },
};
