export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'zh', label: 'Chinese' },
  { code: 'it', label: 'Italian' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'ha', label: 'Hausa' }
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
    header: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mobileNavigation: 'Mobile navigation',
      installAppTitle: 'Install app',
      iosInstallTitle: 'Use your browser Share menu and choose Add to Home Screen.',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      lightMode: 'Light mode',
      darkMode: 'Dark mode'
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
      },
      radar: {
        badge: 'Market radar',
        title: 'Where serious buyers are focusing this week',
        subtitle:
          'Lagos and Abuja still lead conversion, but regional demand is spreading into value markets with faster response times and stronger price-per-sqm opportunities.',
        cards: {
          lagosTitle: 'Lagos demand',
          lagosText: 'Best for fast-moving premium and mid-market inventory.',
          lagosValue: '8 focus areas',
          abujaTitle: 'Abuja inventory',
          abujaText: 'Strong executive, diplomatic, and family housing interest.',
          abujaValue: '7 focus areas',
          coverageTitle: 'State coverage',
          coverageText: 'Balanced national catalog with every state represented.',
          coverageValue: '37 regions'
        }
      },
      spotlight: {
        badge: 'City Spotlight',
        title: 'Move faster in Lagos and Abuja',
        subtitle:
          'These are the two markets where demand, agent response speed, and premium inventory are strongest right now.',
        viewCatalog: 'View full catalog',
        lagosTitle: 'Lagos picks',
        lagosText: 'High-intent neighborhoods with strong close rates.',
        lagosBadge: 'Top market',
        abujaTitle: 'Abuja picks',
        abujaText: 'Executive homes and steady value markets across the capital.',
        abujaBadge: 'High trust'
      }
    },
    servicesPage: {
      badge: 'Our Services',
      title: 'End-to-end real estate support for modern clients.',
      subtitle:
        'Profind delivers a full real estate stack for buyers, sellers, investors, and property owners. Every service is backed by verified data, trusted agents, and local expertise.',
      pills: {
        verifiedAgents: 'Verified agents',
        pricingInsights: 'Pricing insights',
        secureTransactions: 'Secure transactions'
      },
      grid: {
        buyTitle: 'Buy Property',
        buyText: 'Search verified listings with neighborhood insights and pricing guidance.',
        sellTitle: 'Sell Property',
        sellText: 'Premium listing exposure, professional media, and closing support.',
        rentTitle: 'Rent Property',
        rentText: 'Match with rentals that fit your lifestyle, budget, and timeline.',
        managementTitle: 'Property Management',
        managementText: 'Tenant screening, maintenance, and rent collection handled end-to-end.',
        advisoryTitle: 'Investment Advisory',
        advisoryText: 'Market trend analysis, ROI modeling, and portfolio strategy.',
        legalTitle: 'Legal & Compliance',
        legalText: 'Document verification, title checks, and transaction compliance.',
        relocationTitle: 'Relocation Support',
        relocationText: 'Move-in coordination, inspections, and area onboarding.',
        matchingTitle: 'Client Matching',
        matchingText: 'Qualified buyer and tenant matching for faster conversions.',
        secureTitle: 'Secure Transactions',
        secureText: 'Verified agents, secure escrow options, and fraud safeguards.'
      },
      highlights: {
        title: 'Why Our Services Stand Out',
        items: [
          'Verified listings with consistent quality checks',
          'Local market intelligence across major Nigerian cities',
          'Transparent pricing benchmarks and valuation guidance',
          'Dedicated support throughout negotiation and closing',
          'Digital scheduling, virtual tours, and comparison tools',
          'Trusted partner network for legal and mortgage support'
        ]
      },
      cta: {
        title: 'Ready to work with Profind?',
        text: 'Speak with an advisor to plan your next move.',
        contact: 'Contact Us',
        browse: 'Browse Listings'
      }
    },
    contactPage: {
      badge: 'Contact Profind',
      title: "Let's talk about your next move.",
      subtitle:
        'Reach out for property advice, listing support, or partnership inquiries. Our team is ready to help.'
    },
    registrationSuccessPage: {
      title: 'Registration Successful!',
      subtitle: 'Your account has been created successfully. Welcome to PROFIND!',
      signIn: 'Sign In Now',
      home: 'Go to Homepage',
      note: 'You can now browse properties, save favorites, and contact agents.'
    },
    propertiesMapPage: {
      yourLocation: 'Your location',
      yourLocationText: 'Nearby properties are ranked from here.',
      clusterTitle: '{count} properties in this area',
      clusterText: 'Zoom in to view individual listings.',
      viewDetails: 'View Details',
      panelTitle: 'Properties on Map',
      panelCount: '{visible} of {total} listings',
      findingLocation: 'Finding your location...',
      showClosest: 'Show closest to me',
      sortedByDistance: 'Listings are sorted by distance from your current location.',
      locationHelp:
        'Allow location access to rank properties by distance. If permission is denied, you can still filter by city, price, and type.',
      allCities: 'All Cities',
      allTypes: 'All Types',
      allStatus: 'All Status',
      clear: 'Clear',
      minPrice: 'Min price',
      maxPrice: 'Max price',
      searchWithinBounds: 'Search within map bounds'
    },
    propertiesPage: {
      title: 'Properties',
      mapView: 'Map View',
      useMyLocation: 'Use my location',
      findingNearby: 'Finding nearby properties...',
      showingClosest: 'Showing the closest properties first.',
      nearMe: 'Near Me',
      locating: 'Locating...',
      advancedFilters: 'Advanced Filters',
      listView: 'List View',
      gridView: 'Grid View',
      sort: {
        relevance: 'Sort by: Relevance',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        dateNew: 'Date: Newest First',
        dateOld: 'Date: Oldest First',
        nearest: 'Distance: Nearest First',
        popularity: 'Most Popular'
      },
      errors: {
        geoUnsupported: 'Geolocation is not supported in this browser.',
        geoUnavailable: 'Unable to access your location.'
      },
      cards: {
        savedSearchesTitle: 'Saved searches',
        savedSearchesText: 'Use the search bar to save high-intent filters and revisit them later.',
        mapListTitle: 'Map + list',
        mapListText: 'Switch between list and map views without losing your search context.',
        nearMeTitle: 'Near me',
        nearMeText: 'Allow browser location to sort by distance and highlight nearby opportunities.'
      },
      search: {
        rangeError: 'Min price cannot be higher than max price.',
        savedMessage: 'Search saved for later.',
        locationPlaceholder: 'City or area (e.g. Lekki)',
        allTypes: 'All Types',
        house: 'House',
        apartment: 'Apartment',
        land: 'Land',
        commercial: 'Commercial',
        any: 'Any',
        forSale: 'For Sale',
        forRent: 'For Rent',
        search: 'Search',
        clear: 'Clear',
        quickFilters: 'Quick filters:',
        saveThisSearch: 'Save this search',
        activeFilters: 'Active filters:',
        recentSearches: 'Recent searches',
        savedSearches: 'Saved searches'
      }
    },
    propertyDetailsPage: {
      notFoundTitle: 'Property Not Found',
      backToProperties: 'Back to Properties',
      description: 'Description',
      features: 'Features & Amenities',
      neighborhoodInsights: 'Neighborhood Insights',
      marketPulse: 'Market Pulse',
      marketPulseText: 'Demand, price momentum, and listing velocity for this area.',
      nearbyEssentials: 'Nearby Essentials',
      quickActions: 'Quick Actions',
      requestMoreInfo: 'Request More Info',
      whatsappDesk: 'WhatsApp Agent Desk',
      listedBy: 'Listed by',
      licensedAgent: 'Licensed Agent',
      verified: 'Verified',
      trustScore: 'Trust score',
      lastUpdated: 'Last updated',
      recently: 'Recently',
      responseTime: 'Typical response time',
      responseTimeValue: 'under 2 hours',
      highIntentZone: 'High-intent zone',
      similarProperties: 'Similar Properties',
      labels: {
        beds: 'Beds',
        baths: 'Baths',
        built: 'Built',
        propertyPrice: 'Property Price'
      },
      cards: {
        buyerInterest: 'Buyer interest',
        buyerInterestText: 'Lead quality and inquiry volume remain strong around this listing.',
        viewMomentum: 'View momentum',
        viewMomentumText: 'Recent shortlist and detail-page engagement estimate.',
        expectedCloseBand: 'Expected close band',
        expectedCloseBandText: 'Estimated negotiation zone based on nearby pricing patterns.',
        askAgent: 'Ask agent'
      },
      nextStep: {
        title: 'Plan Your Next Step',
        subtitle: 'Open only what you need instead of scrolling through every form.',
        mortgage: 'Mortgage',
        schedule: 'Schedule Viewing',
        reviews: 'Agent Reviews'
      },
      mortgage: {
        title: 'Mortgage Calculator',
        propertyPrice: 'Property Price',
        downPayment: 'Down Payment (%)',
        downPaymentAmount: 'Down Payment',
        loanAmount: 'Loan Amount (NGN)',
        interestRate: 'Interest Rate (%)',
        loanTerm: 'Loan Term (Years)',
        years: 'Years',
        monthlyPayment: 'Monthly Payment',
        totalPayment: 'Total Payment',
        totalInterest: 'Total Interest'
      },
      schedule: {
        title: 'Schedule a Viewing',
        subtitle: 'Book a time to visit this property in person.',
        preferredDate: 'Preferred Date',
        preferredTime: 'Preferred Time',
        selectTime: 'Select time',
        notes: 'Additional Notes',
        notesPlaceholder: 'Any special requests or questions...',
        submit: 'Schedule Viewing',
        toastSuccess: 'Viewing scheduled! The agent will confirm the appointment.',
        toastError: 'Failed to schedule viewing. Please try again.'
      },
      form: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'Your name',
        email: 'Email Address',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone Number',
        phonePlaceholder: '0803 123 4567'
      },
      contact: {
        title: 'Contact Agent',
        subtitle: 'Interested in this property? Contact the agent for more information.',
        message: 'Message',
        messagePlaceholder: "I'm interested in this property. Please contact me...",
        preferredMethod: 'Preferred Contact Method',
        methodEmail: 'Email',
        methodPhone: 'Phone',
        methodWhatsapp: 'WhatsApp',
        submit: 'Send Inquiry',
        startChat: 'Start a chat conversation',
        toastError: 'Failed to send inquiry. Please try again.',
        toastMessageSent: 'Message sent! Opening conversation...',
        toastInquirySent: 'Your inquiry has been sent! The agent will contact you soon.',
        successMessage: 'Your message was sent successfully.',
        successInquiry: 'Your inquiry was sent successfully.',
        loginRequired: 'Please log in to start a chat',
        agentUnavailable: 'Agent information not available'
      },
      reviews: {
        title: 'Agent Reviews',
        count: 'reviews',
        write: 'Write Review',
        rating: 'Rating',
        comment: 'Comment',
        commentPlaceholder: 'Share your experience with this agent...',
        submit: 'Submit Review',
        cancel: 'Cancel',
        empty: 'No reviews yet. Be the first to review!',
        loginRequired: 'Please log in to submit a review',
        alreadyReviewed: 'You have already reviewed this agent',
        toastSuccess: 'Review submitted successfully!'
      },
      report: {
        button: 'Report listing',
        title: 'Report this listing',
        subtitle: 'Flag inaccurate, unavailable, duplicate, or suspicious listings for review.',
        placeholder: 'Why are you reporting this listing?',
        submit: 'Submit report',
        reasonRequired: 'Add a short reason for the report.',
        success: 'Listing report received.'
      }
    },
    messagesPage: {
      title: 'Messages',
      subtitle: 'Chat with agents and property owners',
      loginRequired: 'Please log in to view messages',
      goToLogin: 'Go to Login',
      searchPlaceholder: 'Search conversations...',
      noConversations: 'No conversations yet',
      startFromProperty: 'Start a conversation from a property page',
      youPrefix: 'You: ',
      noMessages: 'No messages yet. Start the conversation!',
      typeMessage: 'Type a message...',
      send: 'Send',
      selectConversation: 'Select a conversation to start messaging',
      toastSent: 'Message sent!'
    },
    comparePage: {
      title: 'Compare Properties',
      subtitle: 'Select up to 4 properties to compare side by side',
      addTitle: 'Add Properties to Compare',
      comparison: 'Comparison',
      saveComparison: 'Save Comparison',
      feature: 'Feature',
      empty: 'No properties selected for comparison. Add properties above to start comparing.',
      maxFour: 'Maximum 4 properties can be compared at once',
      saved: 'Comparison saved!',
      fields: {
        price: 'Price',
        location: 'Location',
        bedrooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        area: 'Area'
      }
    },
    upgradePage: {
      title: 'Upgrade and Promote',
      subtitle: 'Buy your monthly subscription or boost your listings with Paystack.',
      backToDashboard: 'Back to dashboard',
      activeSubscription: 'Active subscription',
      plan: 'Plan',
      ends: 'Ends',
      agentBadgeActive: 'Your agent verified badge is active.',
      ownerSubscriptionActive: 'Your owner subscription is active.',
      loadingPlans: 'Loading plans...',
      agentSubscription: 'Agent Subscription',
      ownerSubscription: 'Owner Subscription',
      featuredBoost: 'Featured Boost',
      dayAccess: 'day access',
      selectListingToBoost: 'Select listing to boost',
      chooseListing: 'Choose a listing',
      needListing: 'You need at least one listing before using a featured boost.',
      agentsOnly: 'Agents only',
      ownersOnly: 'Owners only',
      ownersAgentsOnly: 'Owners/agents only',
      createListingFirst: 'Create a listing first',
      redirecting: 'Redirecting...',
      payWithPaystack: 'Pay with Paystack',
      noPlans: 'No plans available right now.',
      noPlansText: 'Please check back shortly or contact support.',
      loadError: 'Failed to load pricing',
      paymentVerified: 'Payment verified successfully.',
      verifyError: 'Could not verify payment yet.',
      roleError: 'Only agents and property owners can purchase plans.',
      selectListing: 'Select a listing before continuing.',
      checkoutError: 'Could not start checkout',
      paymentInitFailed: 'Payment initialization failed'
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
    propertiesPage: {
      title: 'Proprietes',
      mapView: 'Vue carte',
      useMyLocation: 'Utiliser ma position',
      findingNearby: 'Recherche des biens proches...',
      showingClosest: 'Les biens les plus proches sont affiches en premier.',
      nearMe: 'Pres de moi',
      locating: 'Localisation...',
      advancedFilters: 'Filtres avances',
      listView: 'Vue liste',
      gridView: 'Vue grille'
    },
    propertyDetailsPage: {
      notFoundTitle: 'Bien introuvable',
      backToProperties: 'Retour aux proprietes',
      description: 'Description',
      features: 'Caracteristiques et commodites',
      neighborhoodInsights: 'Apercu du quartier',
      marketPulse: 'Tendance du marche',
      nearbyEssentials: 'Services a proximite',
      quickActions: 'Actions rapides',
      requestMoreInfo: 'Demander plus d informations',
      whatsappDesk: 'WhatsApp agent',
      listedBy: 'Publie par',
      licensedAgent: 'Agent agree',
      verified: 'Verifie',
      similarProperties: 'Biens similaires',
      labels: {
        beds: 'Chambres',
        baths: 'Salles de bain',
        built: 'Construit',
        propertyPrice: 'Prix du bien'
      },
      nextStep: {
        title: 'Planifiez la suite',
        subtitle: 'Ouvrez seulement ce dont vous avez besoin.',
        mortgage: 'Pret',
        schedule: 'Planifier une visite',
        reviews: 'Avis agent'
      },
      mortgage: {
        title: 'Calculateur de pret',
        propertyPrice: 'Prix du bien',
        downPayment: 'Acompte (%)',
        downPaymentAmount: 'Acompte',
        loanAmount: 'Montant du pret (NGN)',
        interestRate: 'Taux d interet (%)',
        loanTerm: 'Duree du pret (annees)',
        years: 'ans',
        monthlyPayment: 'Paiement mensuel',
        totalPayment: 'Paiement total',
        totalInterest: 'Interet total'
      },
      schedule: {
        title: 'Planifier une visite',
        subtitle: 'Choisissez un moment pour visiter ce bien.',
        preferredDate: 'Date preferee',
        preferredTime: 'Heure preferee',
        selectTime: 'Choisir une heure',
        notes: 'Notes complementaires',
        notesPlaceholder: 'Demandes ou questions...',
        submit: 'Planifier la visite'
      },
      form: {
        fullName: 'Nom complet',
        fullNamePlaceholder: 'Votre nom',
        email: 'Adresse e-mail',
        emailPlaceholder: 'votre@email.com',
        phone: 'Numero de telephone',
        phonePlaceholder: '0803 123 4567'
      },
      contact: {
        title: 'Contacter l agent',
        subtitle: 'Interesse par ce bien ? Contactez l agent pour plus d informations.',
        message: 'Message',
        messagePlaceholder: 'Je suis interesse par ce bien. Merci de me contacter...',
        preferredMethod: 'Methode de contact preferee',
        methodEmail: 'E-mail',
        methodPhone: 'Telephone',
        methodWhatsapp: 'WhatsApp',
        submit: 'Envoyer la demande',
        startChat: 'Demarrer une discussion'
      },
      reviews: {
        title: 'Avis agent',
        count: 'avis',
        write: 'Ecrire un avis',
        rating: 'Note',
        comment: 'Commentaire',
        commentPlaceholder: 'Partagez votre experience avec cet agent...',
        submit: 'Envoyer l avis',
        cancel: 'Annuler',
        empty: 'Aucun avis pour le moment.'
      },
      report: {
        button: 'Signaler l annonce',
        title: 'Signaler cette annonce',
        subtitle: 'Signalez une annonce inexacte, indisponible, dupliquee ou suspecte.',
        placeholder: 'Pourquoi signalez-vous cette annonce ?',
        submit: 'Envoyer le signalement'
      }
    },
    messagesPage: {
      title: 'Messages',
      subtitle: 'Discutez avec les agents et les proprietaires',
      loginRequired: 'Veuillez vous connecter pour voir les messages',
      goToLogin: 'Aller a la connexion',
      searchPlaceholder: 'Rechercher des conversations...',
      noConversations: 'Aucune conversation pour le moment',
      startFromProperty: 'Commencez une conversation depuis une page de bien',
      youPrefix: 'Vous : ',
      noMessages: 'Aucun message pour le moment. Lancez la conversation !',
      typeMessage: 'Tapez un message...',
      send: 'Envoyer',
      selectConversation: 'Selectionnez une conversation pour commencer',
      toastSent: 'Message envoye !'
    },
    comparePage: {
      title: 'Comparer les proprietes',
      subtitle: 'Selectionnez jusqu a 4 biens pour les comparer',
      addTitle: 'Ajouter des biens a comparer',
      comparison: 'Comparaison',
      saveComparison: 'Enregistrer la comparaison',
      feature: 'Caracteristique',
      empty: 'Aucune propriete selectionnee pour la comparaison.',
      maxFour: 'Maximum 4 proprietes a la fois',
      saved: 'Comparaison enregistree !',
      fields: {
        price: 'Prix',
        location: 'Emplacement',
        bedrooms: 'Chambres',
        bathrooms: 'Salles de bain',
        area: 'Surface'
      }
    },
    upgradePage: {
      title: 'Mettre a niveau et promouvoir',
      subtitle: 'Achetez votre abonnement mensuel ou boostez vos annonces avec Paystack.',
      backToDashboard: 'Retour au tableau de bord',
      activeSubscription: 'Abonnement actif',
      plan: 'Plan',
      ends: 'Fin',
      loadingPlans: 'Chargement des offres...',
      agentSubscription: 'Abonnement agent',
      ownerSubscription: 'Abonnement proprietaire',
      featuredBoost: 'Boost en vedette',
      dayAccess: 'jours d acces',
      selectListingToBoost: 'Selectionnez une annonce a booster',
      chooseListing: 'Choisir une annonce',
      agentsOnly: 'Agents uniquement',
      ownersOnly: 'Proprietaires uniquement',
      ownersAgentsOnly: 'Proprietaires/agents uniquement',
      createListingFirst: 'Creez d abord une annonce',
      redirecting: 'Redirection...',
      payWithPaystack: 'Payer avec Paystack',
      noPlans: 'Aucune offre disponible pour le moment.',
      noPlansText: 'Veuillez reessayer plus tard ou contacter le support.'
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
    propertiesPage: {
      title: 'Propiedades',
      mapView: 'Vista de mapa',
      useMyLocation: 'Usar mi ubicacion',
      findingNearby: 'Buscando propiedades cercanas...',
      showingClosest: 'Mostrando primero las propiedades mas cercanas.',
      nearMe: 'Cerca de mi',
      locating: 'Ubicando...',
      advancedFilters: 'Filtros avanzados',
      listView: 'Vista de lista',
      gridView: 'Vista de cuadrilla'
    },
    propertyDetailsPage: {
      notFoundTitle: 'Propiedad no encontrada',
      backToProperties: 'Volver a propiedades',
      description: 'Descripcion',
      features: 'Caracteristicas y comodidades',
      neighborhoodInsights: 'Informacion del vecindario',
      marketPulse: 'Pulso del mercado',
      nearbyEssentials: 'Servicios cercanos',
      quickActions: 'Acciones rapidas',
      requestMoreInfo: 'Solicitar mas informacion',
      whatsappDesk: 'WhatsApp del agente',
      listedBy: 'Publicado por',
      licensedAgent: 'Agente autorizado',
      verified: 'Verificado',
      similarProperties: 'Propiedades similares',
      labels: {
        beds: 'Habitaciones',
        baths: 'Banos',
        built: 'Construido',
        propertyPrice: 'Precio de la propiedad'
      },
      nextStep: {
        title: 'Planifica tu siguiente paso',
        subtitle: 'Abre solo lo que necesitas.',
        mortgage: 'Hipoteca',
        schedule: 'Programar visita',
        reviews: 'Resenas del agente'
      },
      mortgage: {
        title: 'Calculadora hipotecaria',
        propertyPrice: 'Precio de la propiedad',
        downPayment: 'Pago inicial (%)',
        downPaymentAmount: 'Pago inicial',
        loanAmount: 'Monto del prestamo (NGN)',
        interestRate: 'Tasa de interes (%)',
        loanTerm: 'Plazo del prestamo (anos)',
        years: 'anos',
        monthlyPayment: 'Pago mensual',
        totalPayment: 'Pago total',
        totalInterest: 'Interes total'
      },
      schedule: {
        title: 'Programar una visita',
        subtitle: 'Reserva un momento para visitar esta propiedad.',
        preferredDate: 'Fecha preferida',
        preferredTime: 'Hora preferida',
        selectTime: 'Seleccionar hora',
        notes: 'Notas adicionales',
        notesPlaceholder: 'Solicitudes o preguntas...',
        submit: 'Programar visita'
      },
      form: {
        fullName: 'Nombre completo',
        fullNamePlaceholder: 'Tu nombre',
        email: 'Correo electronico',
        emailPlaceholder: 'tu@email.com',
        phone: 'Numero de telefono',
        phonePlaceholder: '0803 123 4567'
      },
      contact: {
        title: 'Contactar agente',
        subtitle: 'Interesado en esta propiedad? Contacta al agente para mas informacion.',
        message: 'Mensaje',
        messagePlaceholder: 'Estoy interesado en esta propiedad. Por favor contactame...',
        preferredMethod: 'Metodo de contacto preferido',
        methodEmail: 'Correo',
        methodPhone: 'Telefono',
        methodWhatsapp: 'WhatsApp',
        submit: 'Enviar consulta',
        startChat: 'Iniciar chat'
      },
      reviews: {
        title: 'Resenas del agente',
        count: 'resenas',
        write: 'Escribir resena',
        rating: 'Calificacion',
        comment: 'Comentario',
        commentPlaceholder: 'Comparte tu experiencia con este agente...',
        submit: 'Enviar resena',
        cancel: 'Cancelar',
        empty: 'Aun no hay resenas.'
      },
      report: {
        button: 'Reportar anuncio',
        title: 'Reportar este anuncio',
        subtitle: 'Marca anuncios inexactos, no disponibles, duplicados o sospechosos.',
        placeholder: 'Por que estas reportando este anuncio?',
        submit: 'Enviar reporte'
      }
    },
    messagesPage: {
      title: 'Mensajes',
      subtitle: 'Chatea con agentes y propietarios',
      loginRequired: 'Inicia sesion para ver mensajes',
      goToLogin: 'Ir a iniciar sesion',
      searchPlaceholder: 'Buscar conversaciones...',
      noConversations: 'Aun no hay conversaciones',
      startFromProperty: 'Inicia una conversacion desde una propiedad',
      youPrefix: 'Tu: ',
      noMessages: 'Aun no hay mensajes. Empieza la conversacion.',
      typeMessage: 'Escribe un mensaje...',
      send: 'Enviar',
      selectConversation: 'Selecciona una conversacion para comenzar',
      toastSent: 'Mensaje enviado'
    },
    comparePage: {
      title: 'Comparar propiedades',
      subtitle: 'Selecciona hasta 4 propiedades para compararlas',
      addTitle: 'Agregar propiedades para comparar',
      comparison: 'Comparacion',
      saveComparison: 'Guardar comparacion',
      feature: 'Caracteristica',
      empty: 'No hay propiedades seleccionadas para comparar.',
      maxFour: 'Solo puedes comparar 4 propiedades a la vez',
      saved: 'Comparacion guardada',
      fields: {
        price: 'Precio',
        location: 'Ubicacion',
        bedrooms: 'Habitaciones',
        bathrooms: 'Banos',
        area: 'Area'
      }
    },
    upgradePage: {
      title: 'Mejorar y promocionar',
      subtitle: 'Compra tu suscripcion mensual o impulsa tus anuncios con Paystack.',
      backToDashboard: 'Volver al panel',
      activeSubscription: 'Suscripcion activa',
      plan: 'Plan',
      ends: 'Finaliza',
      loadingPlans: 'Cargando planes...',
      agentSubscription: 'Suscripcion de agente',
      ownerSubscription: 'Suscripcion de propietario',
      featuredBoost: 'Impulso destacado',
      dayAccess: 'dias de acceso',
      selectListingToBoost: 'Selecciona un anuncio para impulsar',
      chooseListing: 'Elige un anuncio',
      agentsOnly: 'Solo agentes',
      ownersOnly: 'Solo propietarios',
      ownersAgentsOnly: 'Solo propietarios/agentes',
      createListingFirst: 'Crea un anuncio primero',
      redirecting: 'Redirigiendo...',
      payWithPaystack: 'Pagar con Paystack',
      noPlans: 'No hay planes disponibles ahora.',
      noPlansText: 'Vuelve pronto o contacta soporte.'
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
    propertiesPage: {
      title: 'Immobili',
      mapView: 'Vista mappa',
      useMyLocation: 'Usa la mia posizione',
      findingNearby: 'Ricerca immobili vicini...',
      showingClosest: 'Mostra prima gli immobili piu vicini.',
      nearMe: 'Vicino a me',
      locating: 'Localizzazione...',
      advancedFilters: 'Filtri avanzati',
      listView: 'Vista elenco',
      gridView: 'Vista griglia'
    },
    propertyDetailsPage: {
      notFoundTitle: 'Immobile non trovato',
      backToProperties: 'Torna agli immobili',
      description: 'Descrizione',
      features: 'Caratteristiche e servizi',
      neighborhoodInsights: 'Informazioni sul quartiere',
      marketPulse: 'Andamento del mercato',
      nearbyEssentials: 'Servizi vicini',
      quickActions: 'Azioni rapide',
      requestMoreInfo: 'Richiedi piu informazioni',
      whatsappDesk: 'WhatsApp agente',
      listedBy: 'Pubblicato da',
      licensedAgent: 'Agente autorizzato',
      verified: 'Verificato',
      similarProperties: 'Immobili simili',
      labels: {
        beds: 'Camere',
        baths: 'Bagni',
        built: 'Costruito',
        propertyPrice: 'Prezzo immobile'
      },
      nextStep: {
        title: 'Pianifica il prossimo passo',
        subtitle: 'Apri solo cio che ti serve.',
        mortgage: 'Mutuo',
        schedule: 'Prenota visita',
        reviews: 'Recensioni agente'
      },
      mortgage: {
        title: 'Calcolatore mutuo',
        propertyPrice: 'Prezzo immobile',
        downPayment: 'Anticipo (%)',
        downPaymentAmount: 'Anticipo',
        loanAmount: 'Importo del prestito (NGN)',
        interestRate: 'Tasso di interesse (%)',
        loanTerm: 'Durata del prestito (anni)',
        years: 'anni',
        monthlyPayment: 'Pagamento mensile',
        totalPayment: 'Pagamento totale',
        totalInterest: 'Interesse totale'
      },
      schedule: {
        title: 'Prenota una visita',
        subtitle: 'Prenota un momento per visitare questo immobile.',
        preferredDate: 'Data preferita',
        preferredTime: 'Ora preferita',
        selectTime: 'Seleziona ora',
        notes: 'Note aggiuntive',
        notesPlaceholder: 'Richieste o domande...',
        submit: 'Prenota visita'
      },
      form: {
        fullName: 'Nome completo',
        fullNamePlaceholder: 'Il tuo nome',
        email: 'Email',
        emailPlaceholder: 'tuo@email.com',
        phone: 'Numero di telefono',
        phonePlaceholder: '0803 123 4567'
      },
      contact: {
        title: 'Contatta agente',
        subtitle: 'Interessato a questo immobile? Contatta l agente per maggiori informazioni.',
        message: 'Messaggio',
        messagePlaceholder: 'Sono interessato a questo immobile. Per favore contattami...',
        preferredMethod: 'Metodo di contatto preferito',
        methodEmail: 'Email',
        methodPhone: 'Telefono',
        methodWhatsapp: 'WhatsApp',
        submit: 'Invia richiesta',
        startChat: 'Avvia chat'
      },
      reviews: {
        title: 'Recensioni agente',
        count: 'recensioni',
        write: 'Scrivi recensione',
        rating: 'Valutazione',
        comment: 'Commento',
        commentPlaceholder: 'Condividi la tua esperienza con questo agente...',
        submit: 'Invia recensione',
        cancel: 'Annulla',
        empty: 'Nessuna recensione al momento.'
      },
      report: {
        button: 'Segnala annuncio',
        title: 'Segnala questo annuncio',
        subtitle: 'Segnala annunci inesatti, non disponibili, duplicati o sospetti.',
        placeholder: 'Perche stai segnalando questo annuncio?',
        submit: 'Invia segnalazione'
      }
    },
    messagesPage: {
      title: 'Messaggi',
      subtitle: 'Chatta con agenti e proprietari',
      loginRequired: 'Accedi per vedere i messaggi',
      goToLogin: 'Vai al login',
      searchPlaceholder: 'Cerca conversazioni...',
      noConversations: 'Nessuna conversazione',
      startFromProperty: 'Avvia una conversazione dalla pagina immobile',
      youPrefix: 'Tu: ',
      noMessages: 'Nessun messaggio. Inizia la conversazione.',
      typeMessage: 'Scrivi un messaggio...',
      send: 'Invia',
      selectConversation: 'Seleziona una conversazione per iniziare',
      toastSent: 'Messaggio inviato'
    },
    comparePage: {
      title: 'Confronta immobili',
      subtitle: 'Seleziona fino a 4 immobili da confrontare',
      addTitle: 'Aggiungi immobili da confrontare',
      comparison: 'Confronto',
      saveComparison: 'Salva confronto',
      feature: 'Caratteristica',
      empty: 'Nessun immobile selezionato per il confronto.',
      maxFour: 'Massimo 4 immobili alla volta',
      saved: 'Confronto salvato',
      fields: {
        price: 'Prezzo',
        location: 'Posizione',
        bedrooms: 'Camere',
        bathrooms: 'Bagni',
        area: 'Area'
      }
    },
    upgradePage: {
      title: 'Aggiorna e promuovi',
      subtitle: 'Acquista l abbonamento mensile o promuovi i tuoi annunci con Paystack.',
      backToDashboard: 'Torna alla dashboard',
      activeSubscription: 'Abbonamento attivo',
      plan: 'Piano',
      ends: 'Scade',
      loadingPlans: 'Caricamento piani...',
      agentSubscription: 'Abbonamento agente',
      ownerSubscription: 'Abbonamento proprietario',
      featuredBoost: 'Promozione in evidenza',
      dayAccess: 'giorni di accesso',
      selectListingToBoost: 'Seleziona annuncio da promuovere',
      chooseListing: 'Scegli un annuncio',
      agentsOnly: 'Solo agenti',
      ownersOnly: 'Solo proprietari',
      ownersAgentsOnly: 'Solo proprietari/agenti',
      createListingFirst: 'Crea prima un annuncio',
      redirecting: 'Reindirizzamento...',
      payWithPaystack: 'Paga con Paystack',
      noPlans: 'Nessun piano disponibile al momento.',
      noPlansText: 'Riprova piu tardi o contatta il supporto.'
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
