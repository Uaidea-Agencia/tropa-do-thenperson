export type CtaLink = {
  label: string;
  href: string | null;
};

export const ctaLinks = {
  whatsapp: {
    label: "Grupo do WhatsApp",
    href: "https://chat.whatsapp.com/F9W2DqZIamyKvwv50P95IQ",
  },
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/thenperson/",
  },
} satisfies Record<string, CtaLink>;

export type CtaChannel = keyof typeof ctaLinks;
