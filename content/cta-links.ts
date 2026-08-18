export type CtaLink = {
  label: string;
  href: string | null;
};

export const ctaLinks = {
  whatsapp: {
    label: "Grupo do WhatsApp",
    href: "https://chat.whatsapp.com/E37S9PNOadYCo0CmB9MrKz?s=cl&p=i&mlu=4&amv=0",
  },
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/thenperson/",
  },
} satisfies Record<string, CtaLink>;

export type CtaChannel = keyof typeof ctaLinks;
