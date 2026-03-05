export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'zh', label: 'Chinese' },
  { code: 'it', label: 'Italian' }
]

export const defaultLanguage = 'en'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      properties: 'Properties',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      upgrade: 'Upgrade',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      installApp: 'Install App'
    },
    language: {
      label: 'Language'
    },
    hero: {
      badge: "Nigeria's verified property network",
      titleBefore: 'Find your next',
      titleHighlight: 'dream home',
      titleAfter: 'with confidence.',
      description:
        'Browse trusted listings, compare neighborhoods, and connect with verified agents across Nigeria - all from one intelligent marketplace.',
      explore: 'Explore Listings',
      advisor: 'Talk to an Advisor',
      stats: {
        verifiedListings: 'Verified Listings',
        activeBuyers: 'Active Buyers',
        trustedAgents: 'Trusted Agents'
      },
      aiMatch: 'AI Match',
      aiTitle: 'Personalized listings in seconds',
      aiBullets: [
        'Verified agents and transparent pricing data.',
        'Neighborhood insights and commute scoring.',
        'Market pulse with real-time demand trends.',
        'Secure scheduling and vetted property tours.'
      ],
      popularSearches: 'Popular Searches'
    },
    home: {
      market: {
        title: 'Market Snapshot',
        subtitle: 'Real-time visibility into listings, demand, and agent activity across key cities.',
        stats: {
          activeListings: 'Active Listings',
          avgDays: 'Avg. Days on Market',
          verifiedAgents: 'Verified Agents',
          viewingRequests: 'Viewing Requests / Week'
        }
      },
      works: {
        title: 'How Profind Works',
        subtitle: 'A streamlined process built for serious buyers, sellers, and investors.',
        discoverTitle: 'Discover',
        discoverText: 'Use advanced filters and neighborhood insights to shortlist confidently.',
        validateTitle: 'Validate',
        validateText: 'Verified agents, detailed listings, and transparent pricing data.',
        closeTitle: 'Close',
        closeText: 'Schedule viewings, compare options, and move with clarity.'
      },
      pro: {
        title: 'Built for Professionals',
        subtitle:
          'Manage portfolios, monitor performance, and deliver faster decisions with data-first tools and verified listing intelligence.',
        features: {
          portfolio: 'Portfolio Tracking',
          heatmaps: 'Market Heatmaps',
          matching: 'Client Matching',
          compliance: 'Compliance Checks'
        },
        listProperty: 'List a Property',
        advisor: 'Talk to an Advisor',
        cards: {
          verified: 'Verified Listings',
          support: 'Dedicated Support',
          pricing: 'Data-Led Pricing',
          closings: 'Faster Closings'
        },
        values: {
          verified: '100% checks before publish',
          support: 'Fast, local response team',
          pricing: 'Comparable sales & trends',
          closings: 'Digital scheduling & reviews'
        }
      },
      faq: {
        title: 'Q&A Section',
        subtitle: 'Quick answers to common questions from buyers, renters, owners, and agents.',
        items: [
          {
            question: 'How do I contact an agent about a property?',
            answer:
              'Open any listing and use the inquiry form or call button. Your request is sent instantly to the listing agent.'
          },
          {
            question: 'Can I list my property as an owner?',
            answer:
              'Yes. Create an account, switch to owner mode on your dashboard, then use "Create Listing" to publish your property.'
          },
          {
            question: 'Are listings verified before going live?',
            answer:
              'Yes. Listings pass moderation checks before approval to help reduce duplicate, fake, or incomplete property posts.'
          },
          {
            question: 'Can I save searches and get updates later?',
            answer: 'Yes. Save your search filters and receive updates when matching properties are added or updated.'
          },
          {
            question: 'Can I schedule a physical inspection or virtual tour?',
            answer:
              'Yes. Use the listing inquiry form to request your preferred date and time for either an in-person inspection or virtual viewing.'
          },
          {
            question: 'Do I need an account to browse properties?',
            answer:
              'No. You can browse publicly, but creating an account unlocks saved searches, favorites, alerts, and faster inquiries.'
          }
        ]
      }
    },
    featured: {
      badge: 'Featured',
      title: 'Discover standout listings',
      subtitle: 'Curated homes and apartments with verified agents and transparent pricing.',
      adjustFilters: 'Try adjusting your filters to see more properties',
      matchingPreferences: 'Explore properties matching your preferences',
      showingRange: 'Discover your perfect home - viewing {start}-{end} of {total} properties',
      noneTitle: 'No properties found matching your criteria',
      noneText: 'Try adjusting your filters or search terms',
      card: {
        beds: 'Beds',
        baths: 'Baths',
        agentVerified: 'Agent verified',
        responseTime: 'Response under 2h',
        viewDetails: 'View Details',
        compare: 'Compare'
      }
    },
    servicesSection: {
      title: 'Our Services',
      subtitle: 'Comprehensive real estate solutions tailored to your needs',
      cards: {
        buy: {
          title: 'Buy a Home',
          desc: 'Find your perfect home from our extensive collection of premium properties.'
        },
        sell: {
          title: 'Sell Property',
          desc: 'Get the best value for your property with our expert marketing and sales team.'
        },
        rent: {
          title: 'Rent a Property',
          desc: 'Discover rental properties that suit your lifestyle and budget perfectly.'
        },
        manage: {
          title: 'Property Management',
          desc: 'Professional property management services to maximize your investment returns.'
        }
      }
    },
    whyChoose: {
      title: 'Why Choose Profind?',
      descriptionOne:
        "Profind is your trusted partner in finding the perfect property. With over 15 years of experience in the real estate industry, we've helped thousands of families find their dream homes.",
      descriptionTwo:
        'Our team of expert agents provides personalized service, comprehensive market knowledge, and dedicated support throughout your property journey.',
      imageAlt: 'Why Choose Profind',
      stats: {
        propertiesSold: 'Properties Sold',
        happyClients: 'Happy Clients',
        yearsExperience: 'Years Experience',
        successRate: 'Success Rate'
      }
    },
    testimonialsSection: {
      title: 'What People Say About Us',
      items: [
        {
          text: 'Profind made my house search so easy! I found the perfect home for my family in Lagos. Highly recommended!',
          location: 'Lagos, Nigeria'
        },
        {
          text: 'The agents on Profind are very professional and trustworthy. I felt safe throughout the process.',
          location: 'Abuja, Nigeria'
        },
        {
          text: 'I was able to compare properties and get the best deal. Profind is the best property platform in Nigeria!',
          location: 'Port Harcourt, Nigeria'
        }
      ]
    },
    contactSection: {
      badge: 'Contact',
      title: 'Get In Touch',
      subtitle: 'Have questions? We would love to hear from you. Send us a message and we will respond quickly.',
      generalContact: 'General Contact',
      toastSuccess: 'Message sent successfully!',
      successMessage: 'Thanks! Your message was sent successfully.',
      toastError: 'Failed to send message. Please try again.',
      form: {
        firstName: 'First Name',
        firstNamePlaceholder: 'John',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Doe',
        email: 'Email',
        emailPlaceholder: 'john@example.com',
        phone: 'Phone',
        message: 'Message',
        messagePlaceholder: 'Tell us about your property needs...',
        sending: 'Sending...',
        send: 'Send Message'
      },
      info: {
        title: 'Contact Information',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        social: 'Social'
      },
      hours: {
        title: 'Office Hours',
        weekdays: 'Monday - Friday',
        weekdaysTime: '9:00 AM - 6:00 PM',
        saturday: 'Saturday',
        saturdayTime: '10:00 AM - 4:00 PM',
        sunday: 'Sunday',
        closed: 'Closed'
      }
    },
    footer: {
      tagline: 'Your trusted partner in finding the perfect property. Making dreams come true since 2009.',
      quickLinks: {
        title: 'Quick Links',
        home: 'Home',
        properties: 'Properties',
        about: 'About Us',
        services: 'Services',
        contact: 'Contact'
      },
      services: {
        title: 'Services',
        buy: 'Buy Property',
        sell: 'Sell Property',
        rent: 'Rent Property',
        management: 'Property Management',
        consulting: 'Consulting'
      },
      newsletter: {
        title: 'Newsletter',
        subtitle: 'Subscribe to get the latest property updates',
        placeholder: 'Your email',
        button: 'Subscribe',
        loading: 'Subscribing...',
        required: 'Please enter your email to subscribe.',
        success: 'Thanks for subscribing!',
        error: 'Unable to subscribe right now.'
      },
      legal: '© 2026 Profind. All rights reserved. | Privacy Policy | Terms of Service'
    },
    app: {
      loading: 'Loading...',
      notFoundTitle: 'Page Not Found',
      notFoundText: 'The page you requested does not exist.',
      goHome: 'Go Home'
    },
    install: {
      iosHint: 'To install on iPhone: tap Share in Safari, then "Add to Home Screen".',
      unavailable: 'Open browser menu and choose Install app / Add to Home screen.',
      dismissed: 'Install prompt was closed. You can try again anytime.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      properties: 'Proprietes',
      about: 'A propos',
      services: 'Services',
      contact: 'Contact',
      upgrade: 'Mise a niveau',
      dashboard: 'Tableau de bord',
      getStarted: 'Commencer',
      installApp: "Installer l'application"
    },
    language: {
      label: 'Langue'
    },
    hero: {
      badge: "Le reseau immobilier verifie du Nigeria",
      titleBefore: 'Trouvez votre prochaine',
      titleHighlight: 'maison de reve',
      titleAfter: 'en toute confiance.',
      description:
        "Parcourez des annonces fiables, comparez les quartiers et contactez des agents verifies dans tout le Nigeria depuis une plateforme intelligente.",
      explore: 'Explorer les annonces',
      advisor: 'Parler a un conseiller',
      stats: {
        verifiedListings: 'Annonces verifiees',
        activeBuyers: 'Acheteurs actifs',
        trustedAgents: 'Agents de confiance'
      },
      aiMatch: 'IA Match',
      aiTitle: 'Annonces personnalisees en quelques secondes',
      aiBullets: [
        'Agents verifies et donnees de prix transparentes.',
        'Informations de quartier et estimation des trajets.',
        'Tendance du marche en temps reel.',
        'Planification securisee et visites verifiees.'
      ],
      popularSearches: 'Recherches populaires'
    },
    home: {
      market: {
        title: 'Apercu du marche',
        subtitle: "Visibilite en temps reel sur les annonces, la demande et l'activite des agents dans les grandes villes.",
        stats: {
          activeListings: 'Annonces actives',
          avgDays: 'Moy. jours sur le marche',
          verifiedAgents: 'Agents verifies',
          viewingRequests: 'Demandes de visite / Semaine'
        }
      },
      works: {
        title: 'Comment Profind fonctionne',
        subtitle: 'Un processus fluide pour acheteurs, vendeurs et investisseurs serieux.',
        discoverTitle: 'Decouvrir',
        discoverText: 'Utilisez des filtres avances et des informations de quartier pour mieux choisir.',
        validateTitle: 'Verifier',
        validateText: 'Agents verifies, annonces detaillees et prix transparents.',
        closeTitle: 'Conclure',
        closeText: 'Planifiez des visites, comparez les options et avancez clairement.'
      },
      pro: {
        title: 'Concu pour les professionnels',
        subtitle:
          "Gerez vos portefeuilles, suivez vos performances et prenez de meilleures decisions avec des outils bases sur les donnees.",
        features: {
          portfolio: 'Suivi du portefeuille',
          heatmaps: 'Cartes de chaleur du marche',
          matching: 'Matching client',
          compliance: 'Controles de conformite'
        },
        listProperty: 'Publier un bien',
        advisor: 'Parler a un conseiller',
        cards: {
          verified: 'Annonces verifiees',
          support: 'Support dedie',
          pricing: 'Tarification guidee par les donnees',
          closings: 'Conclusions plus rapides'
        },
        values: {
          verified: '100% de controles avant publication',
          support: 'Equipe locale et reactive',
          pricing: 'Ventes comparables et tendances',
          closings: 'Planification et avis numeriques'
        }
      },
      faq: {
        title: 'Section Questions/Reponses',
        subtitle: 'Reponses rapides aux questions courantes des acheteurs, locataires, proprietaires et agents.',
        items: [
          {
            question: 'Comment contacter un agent pour un bien ?',
            answer:
              "Ouvrez une annonce et utilisez le formulaire de demande ou le bouton d'appel. Votre demande est envoyee immediatement a l'agent."
          },
          {
            question: 'Puis-je publier mon bien en tant que proprietaire ?',
            answer:
              'Oui. Creez un compte, passez en mode proprietaire depuis votre tableau de bord, puis utilisez "Create Listing".'
          },
          {
            question: 'Les annonces sont-elles verifiees avant publication ?',
            answer:
              'Oui. Les annonces passent une moderation avant approbation pour reduire les doublons, faux contenus et informations incompletes.'
          },
          {
            question: 'Puis-je enregistrer mes recherches et recevoir des mises a jour ?',
            answer: 'Oui. Enregistrez vos filtres de recherche et recevez des mises a jour quand des biens correspondants apparaissent.'
          },
          {
            question: 'Puis-je planifier une visite physique ou virtuelle ?',
            answer:
              'Oui. Utilisez le formulaire de demande pour proposer la date et l heure qui vous conviennent pour une visite sur place ou virtuelle.'
          },
          {
            question: 'Dois-je avoir un compte pour parcourir les biens ?',
            answer:
              'Non. Vous pouvez naviguer librement, mais un compte debloque les recherches enregistrees, favoris, alertes et demandes plus rapides.'
          }
        ]
      }
    },
    app: {
      loading: 'Chargement...',
      notFoundTitle: 'Page introuvable',
      notFoundText: "La page demandee n'existe pas.",
      goHome: "Retour a l'accueil"
    },
    install: {
      iosHint: 'Pour installer sur iPhone : touchez Share dans Safari, puis "Add to Home Screen".',
      unavailable: "Ouvrez le menu du navigateur et choisissez Install app / Add to Home screen.",
      dismissed: "La fenetre d'installation a ete fermee. Vous pouvez reessayer a tout moment."
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      properties: 'Propiedades',
      about: 'Acerca de',
      services: 'Servicios',
      contact: 'Contacto',
      upgrade: 'Mejorar',
      dashboard: 'Panel',
      getStarted: 'Comenzar',
      installApp: 'Instalar app'
    },
    language: {
      label: 'Idioma'
    },
    hero: {
      badge: 'La red inmobiliaria verificada de Nigeria',
      titleBefore: 'Encuentra tu proxima',
      titleHighlight: 'casa de ensueno',
      titleAfter: 'con confianza.',
      description:
        'Explora anuncios confiables, compara vecindarios y conecta con agentes verificados en toda Nigeria desde un solo mercado inteligente.',
      explore: 'Explorar anuncios',
      advisor: 'Hablar con un asesor',
      stats: {
        verifiedListings: 'Anuncios verificados',
        activeBuyers: 'Compradores activos',
        trustedAgents: 'Agentes confiables'
      },
      aiMatch: 'IA Match',
      aiTitle: 'Anuncios personalizados en segundos',
      aiBullets: [
        'Agentes verificados y datos de precios transparentes.',
        'Informacion de vecindarios y tiempos de traslado.',
        'Pulso del mercado con tendencias en tiempo real.',
        'Agenda segura y recorridos de propiedades verificados.'
      ],
      popularSearches: 'Busquedas populares'
    },
    home: {
      market: {
        title: 'Resumen del mercado',
        subtitle: 'Visibilidad en tiempo real de anuncios, demanda y actividad de agentes en ciudades clave.',
        stats: {
          activeListings: 'Anuncios activos',
          avgDays: 'Prom. dias en mercado',
          verifiedAgents: 'Agentes verificados',
          viewingRequests: 'Solicitudes de visita / Semana'
        }
      },
      works: {
        title: 'Como funciona Profind',
        subtitle: 'Un proceso agil para compradores, vendedores e inversionistas serios.',
        discoverTitle: 'Descubrir',
        discoverText: 'Usa filtros avanzados e informacion de vecindario para elegir con confianza.',
        validateTitle: 'Validar',
        validateText: 'Agentes verificados, anuncios detallados y datos de precios transparentes.',
        closeTitle: 'Cerrar',
        closeText: 'Programa visitas, compara opciones y avanza con claridad.'
      },
      pro: {
        title: 'Creado para profesionales',
        subtitle:
          'Gestiona portafolios, monitorea rendimiento y toma decisiones mas rapidas con herramientas basadas en datos.',
        features: {
          portfolio: 'Seguimiento de portafolio',
          heatmaps: 'Mapas de calor del mercado',
          matching: 'Emparejamiento de clientes',
          compliance: 'Controles de cumplimiento'
        },
        listProperty: 'Publicar propiedad',
        advisor: 'Hablar con un asesor',
        cards: {
          verified: 'Anuncios verificados',
          support: 'Soporte dedicado',
          pricing: 'Precios basados en datos',
          closings: 'Cierres mas rapidos'
        },
        values: {
          verified: '100% de verificaciones antes de publicar',
          support: 'Equipo local de respuesta rapida',
          pricing: 'Ventas comparables y tendencias',
          closings: 'Agenda y revisiones digitales'
        }
      },
      faq: {
        title: 'Seccion de preguntas y respuestas',
        subtitle: 'Respuestas rapidas a preguntas comunes de compradores, inquilinos, propietarios y agentes.',
        items: [
          {
            question: 'Como contacto a un agente sobre una propiedad?',
            answer:
              'Abre cualquier anuncio y usa el formulario de consulta o el boton de llamada. Tu solicitud se envia al instante al agente.'
          },
          {
            question: 'Puedo publicar mi propiedad como propietario?',
            answer:
              'Si. Crea una cuenta, cambia al modo propietario en tu panel y luego usa "Create Listing" para publicarla.'
          },
          {
            question: 'Se verifican los anuncios antes de salir en vivo?',
            answer:
              'Si. Los anuncios pasan controles de moderacion antes de aprobarse para reducir duplicados, fraudes o datos incompletos.'
          },
          {
            question: 'Puedo guardar busquedas y recibir actualizaciones despues?',
            answer: 'Si. Guarda tus filtros y recibe actualizaciones cuando se agreguen o actualicen propiedades coincidentes.'
          },
          {
            question: 'Puedo programar una inspeccion fisica o tour virtual?',
            answer:
              'Si. Usa el formulario de consulta para solicitar tu fecha y hora preferidas para visita presencial o virtual.'
          },
          {
            question: 'Necesito una cuenta para explorar propiedades?',
            answer:
              'No. Puedes navegar publicamente, pero crear una cuenta habilita busquedas guardadas, favoritos, alertas y consultas mas rapidas.'
          }
        ]
      }
    },
    featured: {
      badge: 'Destacados',
      title: 'Descubre anuncios destacados',
      subtitle: 'Casas y apartamentos seleccionados con agentes verificados y precios transparentes.',
      adjustFilters: 'Prueba ajustar tus filtros para ver mas propiedades',
      matchingPreferences: 'Explora propiedades que coinciden con tus preferencias',
      showingRange: 'Descubre tu hogar ideal - mostrando {start}-{end} de {total} propiedades',
      noneTitle: 'No se encontraron propiedades que coincidan con tus criterios',
      noneText: 'Prueba ajustar tus filtros o terminos de busqueda',
      card: {
        beds: 'Habitaciones',
        baths: 'Banos',
        agentVerified: 'Agente verificado',
        responseTime: 'Respuesta en menos de 2h',
        viewDetails: 'Ver detalles',
        compare: 'Comparar'
      }
    },
    servicesSection: {
      title: 'Nuestros servicios',
      subtitle: 'Soluciones inmobiliarias integrales adaptadas a tus necesidades',
      cards: {
        buy: {
          title: 'Comprar una casa',
          desc: 'Encuentra tu hogar perfecto en nuestra amplia coleccion de propiedades premium.'
        },
        sell: {
          title: 'Vender propiedad',
          desc: 'Obtiene el mejor valor por tu propiedad con nuestro equipo experto en marketing y ventas.'
        },
        rent: {
          title: 'Alquilar una propiedad',
          desc: 'Descubre propiedades en alquiler que se ajustan a tu estilo de vida y presupuesto.'
        },
        manage: {
          title: 'Gestion de propiedades',
          desc: 'Servicios profesionales de gestion para maximizar el rendimiento de tu inversion.'
        }
      }
    },
    whyChoose: {
      title: 'Por que elegir Profind?',
      descriptionOne:
        'Profind es tu socio de confianza para encontrar la propiedad perfecta. Con mas de 15 anos de experiencia, hemos ayudado a miles de familias a encontrar su hogar ideal.',
      descriptionTwo:
        'Nuestro equipo de agentes expertos ofrece servicio personalizado, conocimiento integral del mercado y acompanamiento durante todo tu proceso.',
      imageAlt: 'Por que elegir Profind',
      stats: {
        propertiesSold: 'Propiedades vendidas',
        happyClients: 'Clientes felices',
        yearsExperience: 'Anos de experiencia',
        successRate: 'Tasa de exito'
      }
    },
    testimonialsSection: {
      title: 'Lo que dice la gente sobre nosotros',
      items: [
        {
          text: 'Profind hizo muy facil mi busqueda de casa. Encontre el hogar perfecto para mi familia en Lagos. Muy recomendado.',
          location: 'Lagos, Nigeria'
        },
        {
          text: 'Los agentes en Profind son muy profesionales y confiables. Me senti segura durante todo el proceso.',
          location: 'Abuja, Nigeria'
        },
        {
          text: 'Pude comparar propiedades y obtener el mejor trato. Profind es la mejor plataforma inmobiliaria en Nigeria.',
          location: 'Port Harcourt, Nigeria'
        }
      ]
    },
    contactSection: {
      badge: 'Contacto',
      title: 'Ponte en contacto',
      subtitle: 'Tienes preguntas? Nos encantara ayudarte. Envia un mensaje y responderemos rapido.',
      generalContact: 'Contacto general',
      toastSuccess: 'Mensaje enviado correctamente!',
      successMessage: 'Gracias! Tu mensaje fue enviado correctamente.',
      toastError: 'No se pudo enviar el mensaje. Intentalo de nuevo.',
      form: {
        firstName: 'Nombre',
        firstNamePlaceholder: 'Juan',
        lastName: 'Apellido',
        lastNamePlaceholder: 'Perez',
        email: 'Correo',
        emailPlaceholder: 'juan@ejemplo.com',
        phone: 'Telefono',
        message: 'Mensaje',
        messagePlaceholder: 'Cuentanos sobre tus necesidades inmobiliarias...',
        sending: 'Enviando...',
        send: 'Enviar mensaje'
      },
      info: {
        title: 'Informacion de contacto',
        phone: 'Telefono',
        email: 'Correo',
        address: 'Direccion',
        social: 'Redes'
      },
      hours: {
        title: 'Horario de oficina',
        weekdays: 'Lunes - Viernes',
        weekdaysTime: '9:00 AM - 6:00 PM',
        saturday: 'Sabado',
        saturdayTime: '10:00 AM - 4:00 PM',
        sunday: 'Domingo',
        closed: 'Cerrado'
      }
    },
    footer: {
      tagline: 'Tu socio de confianza para encontrar la propiedad perfecta. Haciendo realidad suenos desde 2009.',
      quickLinks: {
        title: 'Enlaces rapidos',
        home: 'Inicio',
        properties: 'Propiedades',
        about: 'Acerca de',
        services: 'Servicios',
        contact: 'Contacto'
      },
      services: {
        title: 'Servicios',
        buy: 'Comprar propiedad',
        sell: 'Vender propiedad',
        rent: 'Alquilar propiedad',
        management: 'Gestion de propiedades',
        consulting: 'Consultoria'
      },
      newsletter: {
        title: 'Boletin',
        subtitle: 'Suscribete para recibir las ultimas actualizaciones inmobiliarias',
        placeholder: 'Tu correo',
        button: 'Suscribirse',
        loading: 'Suscribiendo...',
        required: 'Ingresa tu correo para suscribirte.',
        success: 'Gracias por suscribirte!',
        error: 'No se pudo suscribir en este momento.'
      },
      legal: '© 2026 Profind. Todos los derechos reservados. | Politica de privacidad | Terminos del servicio'
    },
    app: {
      loading: 'Cargando...',
      notFoundTitle: 'Pagina no encontrada',
      notFoundText: 'La pagina solicitada no existe.',
      goHome: 'Ir al inicio'
    },
    install: {
      iosHint: 'Para instalar en iPhone: toca Share en Safari y luego "Add to Home Screen".',
      unavailable: 'Abre el menu del navegador y elige Install app / Add to Home screen.',
      dismissed: 'Se cerro el aviso de instalacion. Puedes intentarlo de nuevo en cualquier momento.'
    }
  },
  zh: {
    nav: {
      home: '首页',
      properties: '房源',
      about: '关于我们',
      services: '服务',
      contact: '联系我们',
      upgrade: '升级',
      dashboard: '控制台',
      getStarted: '开始使用',
      installApp: '安装应用'
    },
    language: {
      label: '语言'
    },
    hero: {
      badge: '尼日利亚已验证房产网络',
      titleBefore: '找到你的下一套',
      titleHighlight: '理想住房',
      titleAfter: '更有把握。',
      description:
        '浏览可信房源，比较社区，联系尼日利亚各地的认证经纪人，一站式完成找房流程。',
      explore: '浏览房源',
      advisor: '联系顾问',
      stats: {
        verifiedListings: '已验证房源',
        activeBuyers: '活跃买家',
        trustedAgents: '可信经纪人'
      },
      aiMatch: 'AI 匹配',
      aiTitle: '几秒内获得个性化房源',
      aiBullets: [
        '认证经纪人和透明价格数据。',
        '社区洞察与通勤评分。',
        '实时市场趋势与需求变化。',
        '安全预约与审核通过的看房流程。'
      ],
      popularSearches: '热门搜索'
    },
    home: {
      market: {
        title: '市场概览',
        subtitle: '实时掌握重点城市的房源、需求与经纪人活跃度。',
        stats: {
          activeListings: '在售房源',
          avgDays: '平均上市天数',
          verifiedAgents: '认证经纪人',
          viewingRequests: '每周看房请求'
        }
      },
      works: {
        title: 'Profind 如何运作',
        subtitle: '为认真买家、卖家和投资者打造的高效流程。',
        discoverTitle: '发现',
        discoverText: '使用高级筛选和社区信息，快速锁定目标。',
        validateTitle: '核验',
        validateText: '认证经纪人、详细房源信息与透明价格数据。',
        closeTitle: '成交',
        closeText: '预约看房、比较选项，并清晰推进决策。'
      },
      pro: {
        title: '为专业人士打造',
        subtitle: '通过数据驱动工具管理资产组合、跟踪表现并更快做出决策。',
        features: {
          portfolio: '资产组合跟踪',
          heatmaps: '市场热力图',
          matching: '客户匹配',
          compliance: '合规检查'
        },
        listProperty: '发布房源',
        advisor: '联系顾问',
        cards: {
          verified: '已验证房源',
          support: '专属支持',
          pricing: '数据驱动定价',
          closings: '更快成交'
        },
        values: {
          verified: '发布前 100% 审核',
          support: '本地快速响应团队',
          pricing: '可比成交与趋势分析',
          closings: '数字化预约与评价'
        }
      },
      faq: {
        title: '问答专区',
        subtitle: '买家、租客、业主和经纪人的常见问题速答。',
        items: [
          {
            question: '如何联系经纪人咨询某套房源？',
            answer:
              '打开任意房源，使用咨询表单或拨打电话按钮。你的请求会立即发送给该房源经纪人。'
          },
          {
            question: '我可以以业主身份发布房源吗？',
            answer:
              '可以。创建账号后，在控制台切换到业主模式，然后使用“Create Listing”发布房源。'
          },
          {
            question: '房源上线前会被审核吗？',
            answer:
              '会。房源需通过审核后才会发布，以减少重复、虚假或信息不完整的内容。'
          },
          {
            question: '我可以保存搜索并稍后接收更新吗？',
            answer: '可以。保存筛选条件后，匹配房源新增或更新时会收到通知。'
          },
          {
            question: '我可以预约线下看房或线上看房吗？',
            answer:
              '可以。通过房源咨询表单提交你希望的日期和时间，申请线下或线上看房。'
          },
          {
            question: '浏览房源需要注册账号吗？',
            answer:
              '不需要。你可以直接浏览；但注册后可使用保存搜索、收藏、提醒和更快捷咨询等功能。'
          }
        ]
      }
    },
    app: {
      loading: '加载中...',
      notFoundTitle: '页面未找到',
      notFoundText: '你请求的页面不存在。',
      goHome: '返回首页'
    },
    install: {
      iosHint: '在 iPhone 安装：在 Safari 点击 Share，然后选择“Add to Home Screen”。',
      unavailable: '打开浏览器菜单并选择 Install app / Add to Home screen。',
      dismissed: '安装提示已关闭。你可以稍后再次尝试。'
    }
  },
  it: {
    nav: {
      home: 'Home',
      properties: 'Immobili',
      about: 'Chi siamo',
      services: 'Servizi',
      contact: 'Contatti',
      upgrade: 'Upgrade',
      dashboard: 'Dashboard',
      getStarted: 'Inizia ora',
      installApp: 'Installa app'
    },
    language: {
      label: 'Lingua'
    },
    hero: {
      badge: 'La rete immobiliare verificata della Nigeria',
      titleBefore: 'Trova la tua prossima',
      titleHighlight: 'casa dei sogni',
      titleAfter: 'con fiducia.',
      description:
        'Esplora annunci affidabili, confronta i quartieri e contatta agenti verificati in tutta la Nigeria da un unico marketplace intelligente.',
      explore: 'Esplora annunci',
      advisor: 'Parla con un consulente',
      stats: {
        verifiedListings: 'Annunci verificati',
        activeBuyers: 'Acquirenti attivi',
        trustedAgents: 'Agenti affidabili'
      },
      aiMatch: 'AI Match',
      aiTitle: 'Annunci personalizzati in pochi secondi',
      aiBullets: [
        'Agenti verificati e dati di prezzo trasparenti.',
        'Insight di quartiere e valutazione dei tragitti.',
        'Andamento del mercato in tempo reale.',
        'Pianificazione sicura e visite immobiliari verificate.'
      ],
      popularSearches: 'Ricerche popolari'
    },
    home: {
      market: {
        title: 'Panoramica del mercato',
        subtitle: 'Visibilita in tempo reale su annunci, domanda e attivita degli agenti nelle principali citta.',
        stats: {
          activeListings: 'Annunci attivi',
          avgDays: 'Media giorni sul mercato',
          verifiedAgents: 'Agenti verificati',
          viewingRequests: 'Richieste di visita / Settimana'
        }
      },
      works: {
        title: 'Come funziona Profind',
        subtitle: 'Un processo snello per acquirenti, venditori e investitori seri.',
        discoverTitle: 'Scopri',
        discoverText: 'Usa filtri avanzati e informazioni sui quartieri per selezionare con sicurezza.',
        validateTitle: 'Verifica',
        validateText: 'Agenti verificati, annunci dettagliati e dati di prezzo trasparenti.',
        closeTitle: 'Concludi',
        closeText: 'Pianifica visite, confronta opzioni e procedi con chiarezza.'
      },
      pro: {
        title: 'Pensato per i professionisti',
        subtitle:
          'Gestisci portafogli, monitora le performance e prendi decisioni piu rapide con strumenti data-first.',
        features: {
          portfolio: 'Monitoraggio portafoglio',
          heatmaps: 'Heatmap di mercato',
          matching: 'Abbinamento clienti',
          compliance: 'Controlli di conformita'
        },
        listProperty: 'Pubblica immobile',
        advisor: 'Parla con un consulente',
        cards: {
          verified: 'Annunci verificati',
          support: 'Supporto dedicato',
          pricing: 'Prezzi guidati dai dati',
          closings: 'Chiusure piu rapide'
        },
        values: {
          verified: '100% controlli prima della pubblicazione',
          support: 'Team locale con risposta rapida',
          pricing: 'Vendite comparabili e trend',
          closings: 'Programmazione e recensioni digitali'
        }
      },
      faq: {
        title: 'Sezione domande e risposte',
        subtitle: 'Risposte rapide alle domande comuni di acquirenti, affittuari, proprietari e agenti.',
        items: [
          {
            question: 'Come posso contattare un agente per un immobile?',
            answer:
              "Apri qualsiasi annuncio e usa il modulo di richiesta o il pulsante di chiamata. La richiesta viene inviata subito all'agente."
          },
          {
            question: 'Posso pubblicare il mio immobile come proprietario?',
            answer:
              'Si. Crea un account, passa alla modalita proprietario nella dashboard e usa "Create Listing" per pubblicare.'
          },
          {
            question: 'Gli annunci vengono verificati prima della pubblicazione?',
            answer:
              'Si. Gli annunci passano controlli di moderazione prima dell approvazione per ridurre duplicati, contenuti falsi o incompleti.'
          },
          {
            question: 'Posso salvare le ricerche e ricevere aggiornamenti?',
            answer: 'Si. Salva i filtri di ricerca e ricevi aggiornamenti quando vengono aggiunti o aggiornati immobili compatibili.'
          },
          {
            question: 'Posso prenotare una visita fisica o virtuale?',
            answer:
              'Si. Usa il modulo di richiesta per indicare data e ora preferite per una visita in presenza o virtuale.'
          },
          {
            question: 'Serve un account per consultare gli immobili?',
            answer:
              'No. Puoi navigare pubblicamente, ma con un account ottieni ricerche salvate, preferiti, alert e richieste piu rapide.'
          }
        ]
      }
    },
    app: {
      loading: 'Caricamento...',
      notFoundTitle: 'Pagina non trovata',
      notFoundText: 'La pagina richiesta non esiste.',
      goHome: 'Torna alla home'
    },
    install: {
      iosHint: 'Per installare su iPhone: tocca Share in Safari, poi "Add to Home Screen".',
      unavailable: 'Apri il menu del browser e scegli Install app / Add to Home screen.',
      dismissed: 'La finestra di installazione e stata chiusa. Puoi riprovare quando vuoi.'
    }
  },
  yo: {
    nav: {
      home: 'Ile',
      properties: 'Ohun-ini',
      about: 'Nipa Wa',
      services: 'Ise',
      contact: 'Kan Si Wa',
      upgrade: 'Igbega',
      dashboard: 'Dasibodu',
      getStarted: 'Bere Bayi',
      installApp: 'Fi App Sori Ero'
    },
    language: {
      label: 'Ede'
    },
    hero: {
      badge: 'Nẹtiwọọki ohun-ini ti a fidi mule ni Naijiria',
      titleBefore: 'Wa ile ala re to n bo',
      titleHighlight: 'ile ala',
      titleAfter: 'pẹlu igboya.',
      description:
        'Wo awon ohun-ini to gbagbọle, fiwewe agbegbe, ki o si ba awon aṣoju to fidi mule soro kaakiri Naijiria.',
      explore: 'Wo Awon Akole',
      advisor: 'Ba Onimoran Soro',
      stats: {
        verifiedListings: 'Akole Ti A Fidi Mule',
        activeBuyers: 'Awon Onra To N Sise',
        trustedAgents: 'Awon Asoju To Gbagbọle'
      },
      aiMatch: 'AI Match',
      aiTitle: 'Akole ti ara re ni kete',
      aiBullets: [
        'Awon aṣoju to fidi mule ati alaye owo to ye.',
        'Imo agbegbe ati irinajo ojoojumo.',
        'Iwoye oja pelu data akoko-gidi.',
        'Eto abewo ailewu ati ayewo ohun-ini to muna.'
      ],
      popularSearches: 'Awon Iwadi Gbajumo'
    },
    home: {
      market: {
        title: 'Akopọ Oja',
        subtitle: 'Ariwo akoko-gidi lori awon akole, iwulo, ati isise awon aṣoju ni awon ilu pataki.',
        stats: {
          activeListings: 'Awon Akole To Wa',
          avgDays: 'Aropin Ojo Lori Oja',
          verifiedAgents: 'Awon Asoju Ti A Fidi Mule',
          viewingRequests: 'Ibere Iwoye / Osu'
        }
      },
      works: {
        title: 'Bawo ni Profind Se N Sise',
        subtitle: 'Ilana to rorun fun awon onra, oluta ati oludokoowo to ni ife gidi.',
        discoverTitle: 'Wa',
        discoverText: 'Lo awọn asẹ to lagbara ati imo agbegbe lati yan dara.',
        validateTitle: 'Mule',
        validateText: 'Awon aṣoju to fidi mule, alaye kikun ati data owo to han.',
        closeTitle: 'Pari',
        closeText: 'Seto abewo, fiwewe awon yiyan, ki o si gbe ipinnu.'
      },
      pro: {
        title: 'A Ko O Fun Awon Amoye',
        subtitle: 'Ṣakoso portfolio, tọpinpin esi, ki o si mu ipinnu yarayara pelu irinse data-first.',
        features: {
          portfolio: 'Itele Portfolio',
          heatmaps: 'Heatmap Oja',
          matching: 'Ibamu Onibara',
          compliance: 'Ayewo Ibamu'
        },
        listProperty: 'Fi Ohun-ini Si Oja',
        advisor: 'Ba Onimoran Soro',
        cards: {
          verified: 'Akole Ti A Fidi Mule',
          support: 'Atilẹyin Pataki',
          pricing: 'Ifowopamo Data',
          closings: 'Pipari Tete'
        },
        values: {
          verified: 'Ayewo 100% ki won to gbejade',
          support: 'Egbe idahun yara ni agbegbe',
          pricing: 'Tita afiwe ati aṣa oja',
          closings: 'Iṣeto ati ayewo oni-nọmba'
        }
      },
      faq: {
        title: 'Apakan Ibeere ati Idahun',
        subtitle: 'Idahun kukuru si awon ibeere ti awon onra, ayalegbe, onile ati aṣoju maa n bi.',
        items: [
          {
            question: 'Bawo ni mo se le kan aṣoju nipa ohun-ini kan?',
            answer: 'Ṣii akole kankan, lo fọọmu ibeere tabi bọtini ipe. Ibere re yoo de ọdọ aṣoju lẹsẹkẹsẹ.'
          },
          {
            question: 'Ṣe emi gege bi onile le fi ohun-ini si oja?',
            answer: 'Bee ni. Da akanti, yi ipo re si owner lori dashboard, ki o lo "Create Listing".'
          },
          {
            question: 'Ṣe a maa n fidi awon akole mule ki won to jade?',
            answer: 'Bee ni. A n ṣe ayewo ki a dinku iro, atunyọ ati alaye ti ko pe.'
          },
          {
            question: 'Ṣe mo le fipamo iwadi ki n gba imudojuiwọn?',
            answer: 'Bee ni. Fipamo asẹ iwadi re, iwọ yoo gba imudojuiwọn nigbati awon ohun-ini ba baamu.'
          },
          {
            question: 'Ṣe mo le seto ayewo ni gidi tabi irin-ajo foju?',
            answer: 'Bee ni. Lo fọọmu ibeere lati beere ọjọ ati akoko to dara fun ọ.'
          },
          {
            question: 'Ṣe mo nilo akanti lati wo awon ohun-ini?',
            answer: 'Rara. O le wo ni gbangba, sugbon akanti n fun ọ ni favorites, alerts ati iwadi fipamo.'
          }
        ]
      }
    },
    app: {
      loading: 'N gbe sori...',
      notFoundTitle: 'A Ko Ri Oju-iwe Yi',
      notFoundText: 'Oju-iwe ti o beere ko si.',
      goHome: 'Pada Si Ile'
    },
    install: {
      iosHint: 'Lati fi sori iPhone: tẹ Share ni Safari, lẹyin naa yan "Add to Home Screen".',
      unavailable: 'Ṣii akojọ browser, yan Install app tabi Add to Home screen.',
      dismissed: 'A ti pa ferese fifi sori. O le tun gbiyanju nigbakugba.'
    }
  },
  ha: {
    nav: {
      home: 'Gida',
      properties: 'Kadarori',
      about: 'Game da Mu',
      services: 'Ayyuka',
      contact: 'Tuntuɓe Mu',
      upgrade: 'Haɓakawa',
      dashboard: 'Dashboard',
      getStarted: 'Fara Yanzu',
      installApp: 'Sanya App'
    },
    language: {
      label: 'Harshe'
    },
    hero: {
      badge: 'Ingantacciyar hanyar kadarori ta Najeriya',
      titleBefore: 'Nemo gidanka na gaba',
      titleHighlight: 'mafarkin gida',
      titleAfter: 'da kwarin gwiwa.',
      description:
        'Duba jerin kadarori masu inganci, kwatanta unguwanni, kuma ka tuntubi wakilai amintattu a fadin Najeriya.',
      explore: 'Duba Jerin Kadarori',
      advisor: 'Yi Magana da Mai Ba da Shawara',
      stats: {
        verifiedListings: 'Jerin da Aka Tabbatar',
        activeBuyers: 'Masu Siya Masu Aiki',
        trustedAgents: 'Wakilai Amintattu'
      },
      aiMatch: 'AI Match',
      aiTitle: 'Jerin da ya dace da kai cikin sauri',
      aiBullets: [
        'Wakilai da aka tabbatar da bayyanannen bayanin farashi.',
        'Bayanan unguwa da kididdigar zirga-zirga.',
        'Yanayin kasuwa da bayanan lokaci-lokaci.',
        'Tsarin ziyara mai tsaro da ingantaccen duba kadarori.'
      ],
      popularSearches: 'Shahararrun Bincike'
    },
    home: {
      market: {
        title: 'Taƙaitaccen Kasuwa',
        subtitle: 'Hangen lokaci-lokaci game da jerin kadarori, buƙata, da ayyukan wakilai.',
        stats: {
          activeListings: 'Jerin da Ke Aiki',
          avgDays: 'Matsakaicin Kwanaki a Kasuwa',
          verifiedAgents: 'Wakilan da Aka Tabbatar',
          viewingRequests: 'Buƙatar Duba / Mako'
        }
      },
      works: {
        title: 'Yadda Profind Ke Aiki',
        subtitle: 'Tsari mai sauki ga masu siya, masu sayarwa, da masu zuba jari.',
        discoverTitle: 'Nemo',
        discoverText: 'Yi amfani da tacewa mai zurfi da bayanan unguwa don zaɓi mai kyau.',
        validateTitle: 'Tabbatar',
        validateText: 'Wakilai da aka tabbatar, cikakken bayani, da farashi bayyananne.',
        closeTitle: 'Kammala',
        closeText: 'Tsara ziyara, kwatanta zaɓuɓɓuka, sannan ka yanke shawara.'
      },
      pro: {
        title: 'An Gina Don Kwararru',
        subtitle: 'Sarrafa portfolio, bibiyar aiki, da yanke shawara cikin sauri da kayan aiki na bayanai.',
        features: {
          portfolio: 'Bibiyar Portfolio',
          heatmaps: 'Taswirar Zafi ta Kasuwa',
          matching: 'Daidaita Abokin Ciniki',
          compliance: 'Duba Cika Ka’ida'
        },
        listProperty: 'Sanya Kadarori',
        advisor: 'Yi Magana da Mai Ba da Shawara',
        cards: {
          verified: 'Jerin da Aka Tabbatar',
          support: 'Tallafi Na Musamman',
          pricing: 'Farashi Bisa Bayanai',
          closings: 'Kammalawa Cikin Sauri'
        },
        values: {
          verified: 'Bincike 100% kafin wallafawa',
          support: 'Tawagar tallafi mai saurin amsawa',
          pricing: 'Kwatankwacin saye da yanayin kasuwa',
          closings: 'Tsara jadawali da bita ta dijital'
        }
      },
      faq: {
        title: 'Sashen Tambaya da Amsa',
        subtitle: 'Amsoshi masu sauri ga tambayoyin da ake yawan yi.',
        items: [
          {
            question: 'Ta yaya zan tuntubi wakili game da kadara?',
            answer: 'Buɗe kowane jerin kadara ka yi amfani da fom ɗin tambaya ko maɓallin kira.'
          },
          {
            question: 'Shin zan iya saka kadarata a matsayin mai gida?',
            answer: 'Eh. Ƙirƙiri asusu, canza matsayin ka zuwa owner, sannan ka yi "Create Listing".'
          },
          {
            question: 'Shin ana tantance jerin kafin su bayyana?',
            answer: 'Eh. Ana duba su don rage bayanan bogi da maimaituwa.'
          },
          {
            question: 'Shin zan iya ajiye bincike kuma in sami sabuntawa daga baya?',
            answer: 'Eh. Ajiye tacewar binciken ka, za ka samu sabuntawa idan an samu sabon abin da ya dace.'
          },
          {
            question: 'Shin zan iya tsara duba gida ko yawon gani ta yanar gizo?',
            answer: 'Eh. Yi amfani da fom ɗin tambaya don zaɓar ranar da lokacin da ya dace.'
          },
          {
            question: 'Shin dole ne in yi asusu kafin in duba kadarori?',
            answer: 'A’a. Za ka iya dubawa kai tsaye, amma asusu yana ba ka ƙarin fasaloli.'
          }
        ]
      }
    },
    app: {
      loading: 'Ana lodawa...',
      notFoundTitle: 'Ba a Samu Shafin Ba',
      notFoundText: 'Shafin da ka nema bai wanzu ba.',
      goHome: 'Komawa Gida'
    },
    install: {
      iosHint: 'Don shigarwa a iPhone: danna Share a Safari sannan ka zaɓi "Add to Home Screen".',
      unavailable: 'Buɗe menu na browser ka zaɓi Install app ko Add to Home screen.',
      dismissed: 'An rufe taga shigarwa. Za ka iya sake gwadawa kowane lokaci.'
    }
  }
}
