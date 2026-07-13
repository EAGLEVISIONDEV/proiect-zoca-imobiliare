export const siteConfig = {
  name: "Zoca Real Estate",
  logo: "/brand/zoca-logo-transparent.png",
  tagline: "Agenție Imobiliară Premium",
  phone: "+40 743 694 664",
  email: "stefan.meluta@zoca.ro",
  phoneHref: "tel:+40743694664",
  emailHref: "mailto:stefan.meluta@zoca.ro",
};

export const services = [
  {
    title: "Vânzare Exclusivă",
    description:
      "Strategii personalizate și vizibilitate maximă pentru proprietăți premium.",
    icon: "key" as const,
  },
  {
    title: "Achiziție Premium",
    description:
      "Acces la portofoliu off-market și selecție curată de proprietăți.",
    icon: "house" as const,
  },
  {
    title: "Consultanță Investiții",
    description:
      "Analiză de piață, evaluări și planificare de portofoliu imobiliar.",
    icon: "chart" as const,
  },
  {
    title: "Evaluare Profesională",
    description:
      "Evaluări bazate pe date reale și tranzacții comparabile din zonă.",
    icon: "scale" as const,
  },
  {
    title: "Marketing Editorial",
    description:
      "Fotografie, video cinematic și promovare pe canale premium.",
    icon: "camera" as const,
  },
  {
    title: "Management Tranzacții",
    description:
      "Negociere, due diligence și închidere fără fricțiune.",
    icon: "handshake" as const,
  },
];

export const values = [
  {
    title: "Exclusivitate",
    description:
      "Contracte de exclusivitate pentru dedicare totală fiecărei proprietăți.",
    number: "01",
  },
  {
    title: "Integritate",
    description:
      "Transparență și onestitate în fiecare etapă a tranzacției.",
    number: "02",
  },
  {
    title: "Excelență",
    description:
      "Standarde ridicate în marketing, prezentare și negociere.",
    number: "03",
  },
];

export const properties = [
  {
    id: "vila-herastrau",
    title: "Vilă Herăstrău",
    location: "București Nord",
    zone: "Herăstrău",
    price: "1.2M EUR",
    type: "Exclusivitate",
    beds: 6,
    baths: 5,
    sqm: 480,
    featured: true,
    image: "/properties/vila-herastrau.jpg",
    gradient: "from-stone-800 via-stone-700 to-stone-900",
  },
  {
    id: "penthouse-dorobanti",
    title: "Penthouse Dorobanți",
    location: "Sector 1",
    zone: "Dorobanți",
    price: "890K EUR",
    type: "Premium",
    beds: 4,
    baths: 3,
    sqm: 320,
    featured: true,
    image: "/properties/penthouse-dorobanti.jpg",
    gradient: "from-neutral-800 via-stone-800 to-zinc-900",
  },
  {
    id: "apartament-primaverii",
    title: "Apartament Primăverii",
    location: "Primăverii",
    zone: "Primăverii",
    price: "650K EUR",
    type: "Exclusivitate",
    beds: 3,
    baths: 2,
    sqm: 185,
    featured: false,
    image: "/properties/apartament-primaverii.jpg",
    gradient: "from-zinc-800 via-neutral-800 to-stone-900",
  },
  {
    id: "casa-baneasa",
    title: "Casă Băneasa",
    location: "Băneasa",
    zone: "Băneasa",
    price: "2.1M EUR",
    type: "Premium",
    beds: 7,
    baths: 6,
    sqm: 620,
    featured: true,
    image: "/properties/casa-baneasa.jpg",
    gradient: "from-stone-900 via-neutral-900 to-black",
  },
  {
    id: "loft-centrul-vechi",
    title: "Loft Centrul Vechi",
    location: "Centrul Istoric",
    zone: "Centrul Vechi",
    price: "420K EUR",
    type: "Investiție",
    beds: 2,
    baths: 2,
    sqm: 140,
    featured: false,
    image: "/properties/loft-centrul-vechi.jpg",
    gradient: "from-neutral-900 via-stone-800 to-zinc-900",
  },
];

export const neighborhoods = [
  { name: "Herăstrău", count: "12+" },
  { name: "Primăverii", count: "8+" },
  { name: "Dorobanți", count: "10+" },
  { name: "Băneasa", count: "6+" },
  { name: "Floreasca", count: "5+" },
];

export const testimonials = [
  {
    quote:
      "Abordarea bazată pe exclusivitate ne-a oferit încrederea că proprietatea primește toată atenția necesară.",
    author: "Alexandru Ionescu",
    role: "Investitor Imobiliar",
    initial: "A",
  },
  {
    quote:
      "Am vândut în timp record și la un preț peste așteptări. Marketingul și dedicarea echipei au făcut diferența.",
    author: "Maria Popescu",
    role: "Proprietar",
    initial: "M",
  },
  {
    quote:
      "Ne-a găsit casa visurilor. Proces transparent, opțiuni relevante, zero timp pierdut.",
    author: "Andrei Dumitrescu",
    role: "Cumpărător",
    initial: "A",
  },
];

export const faqs = [
  {
    question: "De ce contracte de exclusivitate?",
    answer:
      "Exclusivitatea ne permite să investim resurse complete în marketing, negociere și promovare. Rezultatul: dedicare totală și performanță superioară.",
  },
  {
    question: "Ce zone acoperiți în București?",
    answer:
      "Zone premium: Herăstrău, Primăverii, Dorobanți, Băneasa, Floreasca și Centrul Istoric, plus proprietăți de lux în împrejurimi.",
  },
  {
    question: "Cât durează procesul de vânzare?",
    answer:
      "Cu strategia noastră premium și rețeaua de cumpărători calificați, majoritatea tranzacțiilor se finalizează în 60–90 de zile.",
  },
  {
    question: "Oferiți evaluări gratuite?",
    answer:
      "Da — evaluare inițială gratuită bazată pe piața locală, tranzacții comparabile și caracteristicile unice ale imobilului.",
  },
];

export const stats = [
  { value: "150+", label: "Proprietăți Vândute" },
  { value: "98%", label: "Clienți Mulțumiți" },
  { value: "12+", label: "Ani Experiență" },
  { value: "50M", label: "EUR Tranzacții", suffix: "+" },
];
