// Export the properties array for use in multiple places
const houseImagePool = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop'
].map((url) => url.replace('w=800&h=600', 'w=600&h=600'));

const apartmentImagePool = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1505693314127-7a7104b06cd1?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522156373667-4c7234bbd804?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1521782462922-9318be1cfd04?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop'
].map((url) => url.replace('w=800&h=600', 'w=600&h=600'));

const landImagePool = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1454982523318-4b6396f39d3a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&h=600&fit=crop'
].map((url) => url.replace('w=800&h=600', 'w=600&h=600'));

const commercialImagePool = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&h=600&fit=crop'
].map((url) => url.replace('w=800&h=600', 'w=600&h=600'));

const toCoverImage = (url) => url;
const normalizePropertyImageUrl = (url) =>
  url
    .replace('w=800&h=600', 'w=600&h=600')
    .replace('w=600&h=400', 'w=600&h=600');

const virtualTourByLocation = {
  'Lekki, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/nA2RuVbf9Rg',
    title: 'Lekki Phase 1 Area Tour'
  },
  'Lekki Phase 1, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/nA2RuVbf9Rg',
    title: 'Lekki Phase 1 Area Tour'
  },
  'Ikoyi, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/irbPwmGhlqg',
    title: 'Ikoyi Apartment Tour'
  },
  'Victoria Island, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/irbPwmGhlqg',
    title: 'Victoria Island Apartment Tour'
  },
  'Ikeja, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/6MitkTKbWFw',
    title: 'Lagos Apartment Tour'
  },
  'Yaba, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/6MitkTKbWFw',
    title: 'Lagos Apartment Tour'
  },
  'Surulere, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/6MitkTKbWFw',
    title: 'Lagos Apartment Tour'
  },
  'Ajah, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/6MitkTKbWFw',
    title: 'Lagos Apartment Tour'
  },
  'Wuse 2, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/CxLnhYyk6Y4',
    title: 'Abuja Luxury Home Tour'
  },
  'Gwarinpa, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/kzWpC_9FuIE',
    title: 'Gwarinpa Estate Tour'
  },
  'Abuja, FCT': {
    tourUrl: 'https://www.youtube.com/embed/n3gGxEReer8',
    title: 'Abuja Luxury Estate Tour'
  },
  'Maitama, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/zKM_Us25C1M',
    title: 'Maitama Home Tour'
  },
  'Asokoro, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/OVAMwWkNifs',
    title: 'Asokoro Neighborhood Tour'
  },
  'Wuse, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/_x-qHqhoC2g',
    title: 'Wuse 2 Area Walk Tour'
  },
  'Garki, Abuja': {
    tourUrl: 'https://www.youtube.com/embed/qlXXoPab7BU',
    title: 'Garki Area Tour'
  },
  'Port Harcourt, Rivers': {
    tourUrl: 'https://www.youtube.com/embed/MAlQZuXivq4',
    title: 'Port Harcourt Home Tour'
  },
  'GRA, Port Harcourt': {
    tourUrl: 'https://www.youtube.com/embed/Kf-UXpeKSfA',
    title: 'Port Harcourt Old GRA Tour'
  },
  'New GRA, Port Harcourt, Rivers': {
    tourUrl: 'https://www.youtube.com/embed/Kf-UXpeKSfA',
    title: 'Port Harcourt New GRA Tour'
  },
  'Aba Road, Port Harcourt, Rivers': {
    tourUrl: 'https://www.youtube.com/embed/MAlQZuXivq4',
    title: 'Port Harcourt Home Tour'
  },
  'Kano, Kano': {
    tourUrl: 'https://www.youtube.com/embed/b2YX_5_WKlo',
    title: 'Kano City Tour'
  },
  'Lagos, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/dh-nGLsL3Yg',
    title: 'Lagos City Tour'
  },
  'Lekki Peninsula, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/dh-nGLsL3Yg',
    title: 'Lagos City Tour'
  },
  'Magodo, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/ye9KwjzD23Y',
    title: 'Magodo Estate Tour'
  },
  'Amuwo Odofin, Lagos': {
    tourUrl: 'https://www.youtube.com/embed/0oQ5-M2Cp6I',
    title: 'Amuwo Odofin Walking Tour'
  },
  'Ibadan, Oyo': {
    tourUrl: 'https://www.youtube.com/embed/Y8sDpXLf4oA',
    title: 'Ibadan City Tour'
  },
  'Abeokuta, Ogun': {
    tourUrl: 'https://www.youtube.com/embed/7exycL9x_00',
    title: 'Abeokuta City Tour'
  },
  'Ilorin, Kwara': {
    tourUrl: 'https://www.youtube.com/embed/reHR8qEm4HA',
    title: 'Ilorin City Tour'
  },
  'Kaduna, Kaduna': {
    tourUrl: 'https://www.youtube.com/embed/zVrLZXtSD28',
    title: 'Kaduna Central Market Walk'
  },
  'Jos, Plateau': {
    tourUrl: 'https://www.youtube.com/embed/PAsTymtOOPw',
    title: 'Jos City Tour'
  },
  'Akure, Ondo': {
    tourUrl: 'https://www.youtube.com/embed/AE67IinF3Y8',
    title: 'Akure City Tour'
  },
  'Owerri, Imo': {
    tourUrl: 'https://www.youtube.com/embed/20rBvHCGy4c',
    title: 'Owerri City Tour'
  },
  'Umuahia, Abia': {
    tourUrl: 'https://www.youtube.com/embed/f3g14OiwWsc',
    title: 'Umuahia City Tour'
  },
  'Aba, Abia': {
    tourUrl: 'https://www.youtube.com/embed/b8ac6lQ76nc',
    title: 'Aba City Tour'
  },
  'Nnewi, Anambra': {
    tourUrl: 'https://www.youtube.com/embed/3cqjz9tQ6eE',
    title: 'Nnewi Town Tour'
  },
  'Asaba, Delta': {
    tourUrl: 'https://www.youtube.com/embed/1Azsg6VnXnQ',
    title: 'Asaba City Tour'
  },
  'Warri, Delta': {
    tourUrl: 'https://www.youtube.com/embed/0xG9Bex7z1o',
    title: 'Warri City Tour'
  },
  'Sapele, Delta': {
    tourUrl: 'https://www.youtube.com/embed/pSbC02BoOeA',
    title: 'Sapele City Tour'
  },
  'Yenagoa, Bayelsa': {
    tourUrl: 'https://www.youtube.com/embed/LpCyfF_7uS4',
    title: 'Yenagoa City Tour'
  },
  'Minna, Niger': {
    tourUrl: 'https://www.youtube.com/embed/3P9J0_6y4yk',
    title: 'Minna City Tour'
  },
  'Lokoja, Kogi': {
    tourUrl: 'https://www.youtube.com/embed/6GgKc2mErzI',
    title: 'Lokoja City Tour'
  },
  'GRA, Kano': {
    tourUrl: 'https://www.youtube.com/embed/b2YX_5_WKlo',
    title: 'Kano City Tour'
  },
  'Katsina, Katsina': {
    tourUrl: 'https://www.youtube.com/embed/r3kT46Y6kO8',
    title: 'Katsina City Tour'
  },
  'Sokoto, Sokoto': {
    tourUrl: 'https://www.youtube.com/embed/7brp6sXkuBI',
    title: 'Sokoto City Tour'
  },
  'Bauchi, Bauchi': {
    tourUrl: 'https://www.youtube.com/embed/9yBmuIkfRZs',
    title: 'Bauchi City Tour'
  },
  'Gombe, Gombe': {
    tourUrl: 'https://www.youtube.com/embed/1tLTYzJqR9g',
    title: 'Gombe City Tour'
  },
  'Yola, Adamawa': {
    tourUrl: 'https://www.youtube.com/embed/1se2nRyQK0g',
    title: 'Yola City Tour'
  },
  'Jalingo, Taraba': {
    tourUrl: 'https://www.youtube.com/embed/WC14P1sMGlo',
    title: 'Jalingo City Tour'
  },
  'Maiduguri, Borno': {
    tourUrl: 'https://www.youtube.com/embed/z70oPVcV0Fg',
    title: 'Maiduguri City Tour'
  },
  'Damaturu, Yobe': {
    tourUrl: 'https://www.youtube.com/embed/BAc5aQJmZq4',
    title: 'Damaturu City Tour'
  },
  'Makurdi, Benue': {
    tourUrl: 'https://www.youtube.com/embed/2aqFwhkyfMI',
    title: 'Makurdi City Tour'
  },
  'Enugu, Enugu': {
    tourUrl: 'https://www.youtube.com/embed/xZRxSTqzlrM',
    title: 'Enugu City Tour'
  },
  'GRA, Enugu': {
    tourUrl: 'https://www.youtube.com/embed/uCoe__yjAxI',
    title: 'GRA Enugu Neighborhood Tour'
  },
  'Independence Layout, Enugu': {
    tourUrl: 'https://www.youtube.com/embed/79et1A9jHtA',
    title: 'Independence Layout Enugu Tour'
  },
  'Bodija, Ibadan, Oyo': {
    tourUrl: 'https://www.youtube.com/embed/YDDn5wbuVJA',
    title: 'Bodija Ibadan Area Tour'
  },
  'Awka, Anambra': {
    tourUrl: 'https://www.youtube.com/embed/tYvXymYlJog',
    title: 'Awka City Tour'
  },
  'Benin City, Edo': {
    tourUrl: 'https://www.youtube.com/embed/57ytEefldQE',
    title: 'Benin City Tour'
  },
  'GRA, Benin City, Edo': {
    tourUrl: 'https://www.youtube.com/embed/kenkhfdzgv4',
    title: 'Benin City Visual Tour'
  },
  'Onitsha, Anambra': {
    tourUrl: 'https://www.youtube.com/embed/qKz_8cLovlg',
    title: 'Onitsha Festival Tour'
  },
  'Uyo, Akwa Ibom': {
    tourUrl: 'https://www.youtube.com/embed/DIUEh1uiDIQ',
    title: 'Uyo City Walking Tour'
  },
  'Calabar, Cross River': {
    tourUrl: 'https://www.youtube.com/embed/EvVY5E0kGKM',
    title: 'Calabar City Tour'
  }
};

const properties = [
  // HOUSES
  {
    id: 1,
    title: 'Luxury 5-Bedroom Detached House',
    location: 'Lekki, Lagos',
    price: '₦450,000,000',
    beds: 5,
    baths: 4,
    area: '850 sqm',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This stunning 5-bedroom detached house in Lekki offers luxury living with modern amenities. Features include a spacious living area, gourmet kitchen, master suite with walk-in closet, and a beautiful garden. Perfect for families seeking comfort and style.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 1,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'YouTube Short Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 2,
    title: 'Modern 4-Bedroom Family Home',
    location: 'Ikoyi, Lagos',
    price: '₦320,000,000',
    beds: 4,
    baths: 3,
    area: '650 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This modern 4-bedroom family home in Ikoyi offers contemporary design with spacious rooms and modern amenities. Ideal for growing families.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2018,
    parking: '2-car garage',
    agentId: 2,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 3,
    title: '3-Bedroom Bungalow',
    location: 'Gwarinpa, Abuja',
    price: '₦180,000,000',
    beds: 3,
    baths: 2,
    area: '450 sqm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This charming 3-bedroom bungalow in Gwarinpa offers cozy living with a beautiful garden and modern finishes. Perfect for small families.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 3,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 4,
    title: 'Spacious 4-Bedroom Villa',
    location: 'Victoria Island, Lagos',
    price: '₦380,000,000',
    beds: 4,
    baths: 4,
    area: '720 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This spacious 4-bedroom villa in Victoria Island offers luxurious living with high ceilings and premium finishes. Great for entertaining.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '2-car garage',
    agentId: 4,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 5,
    title: '5-Bedroom Executive Home',
    location: 'Maitama, Abuja',
    price: '₦420,000,000',
    beds: 5,
    baths: 5,
    area: '900 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This executive 5-bedroom home in Maitama offers premium living with spacious rooms and top-notch amenities. Ideal for executives.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2021,
    parking: '2-car garage',
    agentId: 5,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },

  // APARTMENTS
  {
    id: 6,
    title: '2-Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦85,000,000',
    beds: 2,
    baths: 2,
    area: '120 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This modern 2-bedroom apartment in Lekki Phase 1 offers contemporary living with excellent amenities. Perfect for young professionals or small families.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '1-car parking',
    agentId: 6,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 7,
    title: '3-Bedroom Luxury Apartment',
    location: 'Banana Island, Lagos',
    price: '₦150,000,000',
    beds: 3,
    baths: 3,
    area: '180 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This luxury 3-bedroom apartment in Banana Island offers premium living with stunning views and high-end finishes. Ideal for those seeking exclusivity.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '1-car parking',
    agentId: 7,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 8,
    title: '1-Bedroom Cozy Apartment',
    location: 'Yaba, Lagos',
    price: '₦45,000,000',
    beds: 1,
    baths: 1,
    area: '80 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy 1-bedroom apartment in Yaba offers comfortable living in a vibrant neighborhood. Perfect for singles or couples.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 8,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 9,
    title: '2-Bedroom Modern Apartment',
    location: 'Wuse 2, Abuja',
    price: '₦75,000,000',
    beds: 2,
    baths: 2,
    area: '110 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This modern 2-bedroom apartment in Wuse 2 offers contemporary design and convenient location. Great for professionals working in Abuja.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '1-car parking',
    agentId: 9,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 10,
    title: '3-Bedroom Penthouse Apartment',
    location: 'Victoria Island, Lagos',
    price: '₦280,000,000',
    beds: 3,
    baths: 3,
    area: '250 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This luxurious 3-bedroom penthouse in Victoria Island offers panoramic views and premium amenities. The ultimate in urban luxury living.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2022,
    parking: '2-car parking',
    agentId: 10,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },

  // RENTALS
  {
    id: 83,
    title: '2-Bedroom Serviced Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦4,200,000 / year',
    beds: 2,
    baths: 2,
    area: '120 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'A modern 2-bedroom serviced apartment with backup power, elevator access, and 24/7 security. Ideal for professionals.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '1-car parking',
    agentId: 6,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Living Room Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Apartment Layout' }
    ]
  },
  {
    id: 84,
    title: '1-Bedroom City Loft',
    location: 'Yaba, Lagos',
    price: '₦2,100,000 / year',
    beds: 1,
    baths: 1,
    area: '75 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'A compact, stylish loft near tech hubs with great access to transit and nightlife.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 8,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Loft Walkthrough' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Loft Layout' }
    ]
  },
  {
    id: 85,
    title: '3-Bedroom Family Apartment',
    location: 'Wuse 2, Abuja',
    price: '₦3,800,000 / year',
    beds: 3,
    baths: 3,
    area: '160 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Spacious 3-bedroom apartment with modern finishes, excellent security, and reliable power.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '2-car parking',
    agentId: 9,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 86,
    title: '2-Bedroom Balcony Apartment',
    location: 'Gwarinpa, Abuja',
    price: '₦2,900,000 / year',
    beds: 2,
    baths: 2,
    area: '115 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Bright 2-bedroom apartment with private balcony and close proximity to local amenities.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '1-car parking',
    agentId: 3,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Balcony Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Apartment Layout' }
    ]
  },
  {
    id: 87,
    title: '3-Bedroom Executive Apartment',
    location: 'Port Harcourt, Rivers',
    price: '₦3,500,000 / year',
    beds: 3,
    baths: 3,
    area: '155 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Executive apartment with premium finishes, quiet estate, and dedicated parking.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '2-car parking',
    agentId: 72,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Executive Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 88,
    title: '2-Bedroom Garden Apartment',
    location: 'Ibadan, Oyo',
    price: '₦1,800,000 / year',
    beds: 2,
    baths: 2,
    area: '105 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Comfortable 2-bedroom apartment with green views and easy access to major roads.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '1-car parking',
    agentId: 78,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 89,
    title: '1-Bedroom Riverside Apartment',
    location: 'Calabar, Cross River',
    price: '₦1,500,000 / year',
    beds: 1,
    baths: 1,
    area: '70 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Cozy riverside apartment with calm surroundings and reliable utilities.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '1-car parking',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Riverside Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 90,
    title: '2-Bedroom City Apartment',
    location: 'Enugu, Enugu',
    price: '₦1,900,000 / year',
    beds: 2,
    baths: 2,
    area: '110 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Conveniently located apartment with good road access and reliable power.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '1-car parking',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'City Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 91,
    title: '3-Bedroom Terrace House',
    location: 'Ikoyi, Lagos',
    price: '₦9,500,000 / year',
    beds: 3,
    baths: 3,
    area: '320 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Modern terrace in a secure estate with smart finishes and a private backyard.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Garden', 'CCTV'],
    yearBuilt: 2021,
    parking: '2-car garage',
    agentId: 2,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Terrace Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 92,
    title: '4-Bedroom Detached House',
    location: 'Asokoro, Abuja',
    price: '₦12,000,000 / year',
    beds: 4,
    baths: 4,
    area: '680 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Spacious detached house in a premium neighborhood with excellent security and power backup.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 5,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'House Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 93,
    title: '3-Bedroom Semi-Detached House',
    location: 'Abeokuta, Ogun',
    price: '₦3,200,000 / year',
    beds: 3,
    baths: 3,
    area: '360 sqm',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Comfortable semi-detached home with modern fittings and easy access to the city center.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '2-car garage',
    agentId: 78,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Home Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 94,
    title: '4-Bedroom Executive Home',
    location: 'Port Harcourt, Rivers',
    price: '₦8,500,000 / year',
    beds: 4,
    baths: 4,
    area: '620 sqm',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Executive rental home with ample space, premium fittings, and dedicated staff quarters.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Staff Quarters'],
    yearBuilt: 2019,
    parking: '3-car garage',
    agentId: 72,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Executive Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 95,
    title: '3-Bedroom Bungalow',
    location: 'Ilorin, Kwara',
    price: '₦2,400,000 / year',
    beds: 3,
    baths: 2,
    area: '420 sqm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Single-level bungalow with secure compound and well-lit living spaces.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '2-car garage',
    agentId: 79,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Bungalow Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 96,
    title: '4-Bedroom Duplex',
    location: 'Benin City, Edo',
    price: '₦3,900,000 / year',
    beds: 4,
    baths: 4,
    area: '520 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Modern duplex with ensuite rooms, generous living area, and secure parking.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 74,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Duplex Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 97,
    title: '3-Bedroom Townhouse',
    location: 'Uyo, Akwa Ibom',
    price: '₦2,700,000 / year',
    beds: 3,
    baths: 3,
    area: '380 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'A neat townhouse with good road access and steady power supply.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Garden'],
    yearBuilt: 2018,
    parking: '2-car garage',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Townhouse Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 98,
    title: '2-Bedroom Cottage',
    location: 'Jos, Plateau',
    price: '₦1,600,000 / year',
    beds: 2,
    baths: 2,
    area: '260 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Quiet cottage rental in a serene neighborhood with cool climate.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '1-car garage',
    agentId: 73,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Cottage Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 99,
    title: '4-Bedroom Family House',
    location: 'Kaduna, Kaduna',
    price: '₦3,300,000 / year',
    beds: 4,
    baths: 4,
    area: '520 sqm',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Spacious family rental with ensuite rooms and secure compound.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Garden'],
    yearBuilt: 2018,
    parking: '2-car garage',
    agentId: 73,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Family Home Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 100,
    title: '3-Bedroom Duplex',
    location: 'Owerri, Imo',
    price: '₦2,800,000 / year',
    beds: 3,
    baths: 3,
    area: '410 sqm',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Well-finished duplex in a secure estate with modern kitchen and lounge.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Duplex Walkthrough' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 101,
    title: '4-Bedroom Duplex',
    location: 'Kano, Kano',
    price: '₦3,600,000 / year',
    beds: 4,
    baths: 4,
    area: '560 sqm',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Spacious duplex with ample parking, reliable power, and secure estate access.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Garden'],
    yearBuilt: 2018,
    parking: '2-car garage',
    agentId: 81,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Duplex Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 102,
    title: '3-Bedroom Bungalow',
    location: 'Minna, Niger',
    price: '₦2,200,000 / year',
    beds: 3,
    baths: 2,
    area: '390 sqm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Neat bungalow with good ventilation and a secure compound.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '2-car garage',
    agentId: 76,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Bungalow Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },

  {
    id: 103,
    title: '2-Bedroom Smart Apartment',
    location: 'Ikeja, Lagos',
    price: '₦4,800,000 / year',
    beds: 2,
    baths: 2,
    area: '125 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Smart 2-bedroom apartment with modern finishes, reliable power backup, and excellent access to business hubs.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Smart Home', 'CCTV'],
    yearBuilt: 2022,
    parking: '1-car parking',
    agentId: 1,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 104,
    title: '3-Bedroom Terrace',
    location: 'Ajah, Lagos',
    price: '₦4,200,000 / year',
    beds: 3,
    baths: 3,
    area: '300 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Well-finished 3-bedroom terrace in a gated estate with private backyard and steady utilities.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Garden', 'CCTV'],
    yearBuilt: 2020,
    parking: '2-car garage',
    agentId: 2,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Terrace Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 105,
    title: '1-Bedroom Studio Apartment',
    location: 'Aba, Abia',
    price: '₦900,000 / year',
    beds: 1,
    baths: 1,
    area: '55 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Affordable studio apartment with good ventilation and easy access to local markets.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '1-car parking',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Studio Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 106,
    title: '3-Bedroom Executive Apartment',
    location: 'GRA, Enugu',
    price: '₦2,800,000 / year',
    beds: 3,
    baths: 3,
    area: '150 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Executive 3-bedroom apartment in a quiet GRA estate with 24/7 security and stable power.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Water Treatment'],
    yearBuilt: 2019,
    parking: '2-car parking',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Executive Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 107,
    title: '2-Bedroom Apartment',
    location: 'Aba Road, Port Harcourt, Rivers',
    price: '₦2,600,000 / year',
    beds: 2,
    baths: 2,
    area: '110 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Neat 2-bedroom apartment close to major routes with backup power and secure parking.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '1-car parking',
    agentId: 72,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 108,
    title: '4-Bedroom Detached House',
    location: 'Maitama, Abuja',
    price: '₦15,000,000 / year',
    beds: 4,
    baths: 5,
    area: '760 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Premium detached house with swimming pool, staff quarters, and high-end security.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Staff Quarters', 'CCTV'],
    yearBuilt: 2021,
    parking: '3-car garage',
    agentId: 5,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'House Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' }
    ]
  },
  {
    id: 109,
    title: '2-Bedroom Apartment',
    location: 'Garki, Abuja',
    price: '₦2,300,000 / year',
    beds: 2,
    baths: 2,
    area: '105 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Practical 2-bedroom apartment with good road access and stable utilities.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '1-car parking',
    agentId: 3,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 110,
    title: '3-Bedroom Apartment',
    location: 'New GRA, Port Harcourt, Rivers',
    price: '₦4,000,000 / year',
    beds: 3,
    baths: 3,
    area: '170 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Well-appointed 3-bedroom apartment in a quiet estate with premium finishes.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'CCTV'],
    yearBuilt: 2020,
    parking: '2-car parking',
    agentId: 72,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 111,
    title: '3-Bedroom Apartment',
    location: 'GRA, Benin City, Edo',
    price: '₦2,500,000 / year',
    beds: 3,
    baths: 3,
    area: '155 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Spacious apartment in a serene estate with good security and parking.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '2-car parking',
    agentId: 74,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 112,
    title: '2-Bedroom Apartment',
    location: 'Asaba, Delta',
    price: '₦2,100,000 / year',
    beds: 2,
    baths: 2,
    area: '110 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Modern 2-bedroom apartment with reliable utilities and secure access.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2018,
    parking: '1-car parking',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 113,
    title: '4-Bedroom Duplex',
    location: 'GRA, Kano',
    price: '₦4,500,000 / year',
    beds: 4,
    baths: 4,
    area: '600 sqm',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'House',
    description: 'Large duplex with ample parking, staff quarters, and improved security systems.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Staff Quarters', 'CCTV'],
    yearBuilt: 2019,
    parking: '3-car garage',
    agentId: 81,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Duplex Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 114,
    title: '3-Bedroom Apartment',
    location: 'Bodija, Ibadan, Oyo',
    price: '₦2,300,000 / year',
    beds: 3,
    baths: 3,
    area: '145 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Comfortable apartment in a central neighborhood with good access to schools and malls.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '2-car parking',
    agentId: 78,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 115,
    title: '2-Bedroom Apartment',
    location: 'Kaduna, Kaduna',
    price: '₦1,800,000 / year',
    beds: 2,
    baths: 2,
    area: '100 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Affordable 2-bedroom apartment with steady utilities and secure parking.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '1-car parking',
    agentId: 73,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 116,
    title: '3-Bedroom Apartment',
    location: 'Uyo, Akwa Ibom',
    price: '₦2,400,000 / year',
    beds: 3,
    baths: 3,
    area: '150 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Spacious apartment in a quiet estate with reliable power and water supply.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Water Treatment'],
    yearBuilt: 2018,
    parking: '2-car parking',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 117,
    title: '2-Bedroom Apartment',
    location: 'Calabar, Cross River',
    price: '₦1,700,000 / year',
    beds: 2,
    baths: 2,
    area: '95 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Compact apartment with secure access and reliable utilities.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '1-car parking',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 118,
    title: '3-Bedroom Apartment',
    location: 'Owerri, Imo',
    price: '₦2,200,000 / year',
    beds: 3,
    baths: 3,
    area: '145 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Well-ventilated apartment in a quiet neighborhood with good road access.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '2-car parking',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 119,
    title: '3-Bedroom Apartment',
    location: 'Onitsha, Anambra',
    price: '₦2,100,000 / year',
    beds: 3,
    baths: 3,
    area: '140 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Central apartment with stable utilities and secure entry.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '2-car parking',
    agentId: 79,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 120,
    title: '3-Bedroom Apartment',
    location: 'Sokoto, Sokoto',
    price: '₦2,000,000 / year',
    beds: 3,
    baths: 3,
    area: '140 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Comfortable apartment with steady power backup and secure parking.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '2-car parking',
    agentId: 76,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 121,
    title: '3-Bedroom Apartment',
    location: 'Maiduguri, Borno',
    price: '₦2,100,000 / year',
    beds: 3,
    baths: 3,
    area: '145 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Secure apartment with reliable utilities and good road access.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2017,
    parking: '2-car parking',
    agentId: 76,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },
  {
    id: 122,
    title: '2-Bedroom Apartment',
    location: 'Akure, Ondo',
    price: '₦1,700,000 / year',
    beds: 2,
    baths: 2,
    area: '95 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Rent',
    propertyType: 'Apartment',
    description: 'Affordable apartment with secure access and reliable utilities.',
    features: ['Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2016,
    parking: '1-car parking',
    agentId: 78,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/FXwr42CbKW4', title: 'Apartment Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Layout' }
    ]
  },

  // LANDS
  {
    id: 11,
    title: 'Prime Land in Lekki',
    location: 'Lekki, Lagos',
    price: '₦120,000,000',
    beds: 0,
    baths: 0,
    area: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This prime land in Lekki offers excellent development potential with good accessibility and infrastructure. Perfect for residential or commercial projects.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 11,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 12,
    title: 'Developable Land in Maitama',
    location: 'Maitama, Abuja',
    price: '₦250,000,000',
    beds: 0,
    baths: 0,
    area: '1500 sqm',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This developable land in Maitama is located in a prime area with excellent infrastructure. Ideal for high-end residential development.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 12,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 13,
    title: 'Commercial Land in Ikeja',
    location: 'Ikeja, Lagos',
    price: '₦180,000,000',
    beds: 0,
    baths: 0,
    area: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This commercial land in Ikeja is strategically located for business development with high traffic and visibility.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 13,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 14,
    title: 'Residential Land in GRA Port Harcourt',
    location: 'GRA, Port Harcourt',
    price: '₦80,000,000',
    beds: 0,
    baths: 0,
    area: '900 sqm',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This residential land in GRA Port Harcourt offers a serene environment with excellent amenities nearby. Perfect for building your dream home.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 14,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 15,
    title: 'Land Parcel in Independence Layout',
    location: 'Independence Layout, Enugu',
    price: '₦60,000,000',
    beds: 0,
    baths: 0,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This land parcel in Independence Layout, Enugu, is in a developing area with good potential for appreciation.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 15,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },

  // COMMERCIAL
  {
    id: 16,
    title: 'Office Space in Victoria Island',
    location: 'Victoria Island, Lagos',
    price: '₦180,000,000',
    beds: 0,
    baths: 0,
    area: '500 sqm',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This office space in Victoria Island offers prime location for businesses with modern facilities and excellent connectivity.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'High-Speed Internet'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 16,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Office Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Office Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 17,
    title: 'Retail Shop Space',
    location: 'Ikeja, Lagos',
    price: '₦45,000,000',
    beds: 0,
    baths: 0,
    area: '150 sqm',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This retail shop space in Ikeja is perfect for retail businesses with high foot traffic and visibility.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Storage Space'],
    yearBuilt: 2019,
    parking: 'Multiple parking spaces',
    agentId: 17,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Shop Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Location Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Shop Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 18,
    title: 'Warehouse Facility',
    location: 'Amuwo Odofin, Lagos',
    price: '₦220,000,000',
    beds: 0,
    baths: 0,
    area: '2000 sqm',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This warehouse facility in Amuwo Odofin offers ample space for storage and logistics operations.',
    features: ['Security System', 'Generator', 'Loading Dock', 'High Ceiling'],
    yearBuilt: 2020,
    parking: 'Multiple parking spaces',
    agentId: 18,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Warehouse Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Warehouse Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 19,
    title: 'Business Complex',
    location: 'Wuse 2, Abuja',
    price: '₦350,000,000',
    beds: 0,
    baths: 0,
    area: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This business complex in Wuse 2 offers multiple office spaces and commercial units in a prime location.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Conference Rooms'],
    yearBuilt: 2021,
    parking: 'Multiple parking spaces',
    agentId: 19,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Complex Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Office Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Complex Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 20,
    title: 'Shopping Mall Unit',
    location: 'Lekki, Lagos',
    price: '₦95,000,000',
    beds: 0,
    baths: 0,
    area: '300 sqm',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This shopping mall unit in Lekki offers excellent retail space with high customer traffic.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Central Location'],
    yearBuilt: 2022,
    parking: 'Multiple parking spaces',
    agentId: 20,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Mall Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Unit Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Unit Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },

  // More Houses
  {
    id: 21,
    title: '6-Bedroom Mansion',
    location: 'Asokoro, Abuja',
    price: '₦580,000,000',
    beds: 6,
    baths: 5,
    area: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 6-bedroom mansion in Asokoro offers luxurious living with spacious rooms and premium amenities.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 21,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 22,
    title: '3-Bedroom Family Home',
    location: 'Surulere, Lagos',
    price: '₦125,000,000',
    beds: 3,
    baths: 2,
    area: '380 sqm',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 3-bedroom family home in Surulere offers comfortable living with modern amenities.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 22,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 23,
    title: '4-Bedroom Duplex',
    location: 'Magodo, Lagos',
    price: '₦220,000,000',
    beds: 4,
    baths: 3,
    area: '550 sqm',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 4-bedroom duplex in Magodo offers spacious living with modern design.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2021,
    parking: '2-car garage',
    agentId: 23,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },

  // More Apartments
  {
    id: 24,
    title: '2-Bedroom Furnished Apartment',
    location: 'Ikeja, Lagos',
    price: '₦65,000,000',
    beds: 2,
    baths: 2,
    area: '100 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This furnished 2-bedroom apartment in Ikeja offers move-in ready living with modern amenities.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '1-car parking',
    agentId: 24,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 25,
    title: 'Studio Apartment',
    location: 'Yaba, Lagos',
    price: '₦35,000,000',
    beds: 1,
    baths: 1,
    area: '60 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy studio apartment in Yaba is perfect for singles or couples seeking affordable living.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 25,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 26,
    title: '4-Bedroom Luxury Apartment',
    location: 'Ikoyi, Lagos',
    price: '₦195,000,000',
    beds: 4,
    baths: 4,
    area: '220 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This luxury 4-bedroom apartment in Ikoyi offers premium living with stunning views and high-end finishes.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '2-car parking',
    agentId: 26,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },

  // More Lands
  {
    id: 27,
    title: 'Large Land Parcel in Ikoyi',
    location: 'Ikoyi, Lagos',
    price: '₦350,000,000',
    beds: 0,
    baths: 0,
    area: '2000 sqm',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This large land parcel in Ikoyi offers prime development potential in an exclusive neighborhood.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 27,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 28,
    title: 'Investment Land in Asokoro',
    location: 'Asokoro, Abuja',
    price: '₦180,000,000',
    beds: 0,
    baths: 0,
    area: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This investment land in Asokoro offers excellent potential for high-end residential development.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 28,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 29,
    title: 'Coastal Land in Lekki',
    location: 'Lekki Peninsula, Lagos',
    price: '₦420,000,000',
    beds: 0,
    baths: 0,
    area: '2500 sqm',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This coastal land in Lekki Peninsula offers stunning ocean views and excellent development potential for luxury properties.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 29,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },

  // More Commercial
  {
    id: 30,
    title: 'Hotel Building',
    location: 'Victoria Island, Lagos',
    price: '₦850,000,000',
    beds: 0,
    baths: 0,
    area: '3500 sqm',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This hotel building in Victoria Island offers prime location for hospitality business with modern facilities.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Conference Rooms'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 30,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hotel Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Hotel Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 31,
    title: 'Restaurant Space',
    location: 'Ikeja, Lagos',
    price: '₦55,000,000',
    beds: 0,
    baths: 0,
    area: '200 sqm',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This restaurant space in Ikeja is ideal for food business with good visibility and accessibility.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Kitchen Facilities'],
    yearBuilt: 2019,
    parking: 'Multiple parking spaces',
    agentId: 31,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Restaurant Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Kitchen Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Restaurant Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 32,
    title: 'Medical Center Facility',
    location: 'Wuse, Abuja',
    price: '₦180,000,000',
    beds: 0,
    baths: 0,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This medical center facility in Wuse offers space for healthcare services with modern infrastructure.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Medical Equipment Ready'],
    yearBuilt: 2020,
    parking: 'Multiple parking spaces',
    agentId: 32,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Medical Center Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Medical Center Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },

  // Additional properties continue with the same pattern...
  {
    id: 33,
    title: '4-Bedroom Townhouse',
    location: 'Ibadan, Oyo',
    price: '₦95,000,000',
    beds: 4,
    baths: 3,
    area: '400 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 4-bedroom townhouse in Ibadan offers modern living with spacious rooms and contemporary design. Perfect for families.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '2-car garage',
    agentId: 33,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 34,
    title: '2-Bedroom Apartment',
    location: 'Benin City, Edo',
    price: '₦55,000,000',
    beds: 2,
    baths: 2,
    area: '90 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This 2-bedroom apartment in Benin City offers comfortable living with modern amenities. Great for young professionals.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 34,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 35,
    title: 'Commercial Land',
    location: 'Kano, Kano',
    price: '₦150,000,000',
    beds: 0,
    baths: 0,
    area: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This commercial land in Kano offers excellent development potential with good accessibility and infrastructure. Perfect for business projects.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 35,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },

  // Continue with the remaining properties in the same format...

  // CONTINUING FROM ID 36...
  {
    id: 36,
    title: '3-Bedroom Bungalow',
    location: 'Calabar, Cross River',
    price: '₦85,000,000',
    beds: 3,
    baths: 2,
    area: '350 sqm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 3-bedroom bungalow in Calabar offers cozy living with a beautiful garden and modern finishes. Perfect for small families.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 36,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 37,
    title: 'Office Complex',
    location: 'Jos, Plateau',
    price: '₦220,000,000',
    beds: 0,
    baths: 0,
    area: '600 sqm',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This office complex in Jos offers prime location for businesses with modern facilities and excellent connectivity.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'High-Speed Internet'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 37,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Office Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Office Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 38,
    title: '5-Bedroom Villa',
    location: 'Kaduna, Kaduna',
    price: '₦140,000,000',
    beds: 5,
    baths: 4,
    area: '700 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 5-bedroom villa in Kaduna offers luxurious living with spacious rooms and premium amenities. Ideal for families.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '2-car garage',
    agentId: 38,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 39,
    title: '1-Bedroom Studio',
    location: 'Owerri, Imo',
    price: '₦30,000,000',
    beds: 1,
    baths: 1,
    area: '50 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy 1-bedroom studio in Owerri is perfect for singles seeking affordable living.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 39,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 40,
    title: 'Residential Land',
    location: 'Abeokuta, Ogun',
    price: '₦70,000,000',
    beds: 0,
    baths: 0,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This residential land in Abeokuta offers a serene environment with excellent amenities nearby. Perfect for building your dream home.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 40,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 41,
    title: 'Retail Space',
    location: 'Ilorin, Kwara',
    price: '₦60,000,000',
    beds: 0,
    baths: 0,
    area: '180 sqm',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This retail space in Ilorin is perfect for retail businesses with high foot traffic and visibility.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Storage Space'],
    yearBuilt: 2019,
    parking: 'Multiple parking spaces',
    agentId: 41,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Shop Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Location Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Shop Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 42,
    title: '4-Bedroom Duplex',
    location: 'Akure, Ondo',
    price: '₦110,000,000',
    beds: 4,
    baths: 3,
    area: '500 sqm',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 4-bedroom duplex in Akure offers spacious living with modern design.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2021,
    parking: '2-car garage',
    agentId: 42,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 43,
    title: '3-Bedroom Apartment',
    location: 'Sokoto, Sokoto',
    price: '₦45,000,000',
    beds: 3,
    baths: 2,
    area: '120 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This 3-bedroom apartment in Sokoto offers contemporary design and convenient location. Great for professionals working in Sokoto.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '1-car parking',
    agentId: 43,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 44,
    title: 'Industrial Land',
    location: 'Maiduguri, Borno',
    price: '₦200,000,000',
    beds: 0,
    baths: 0,
    area: '3000 sqm',
    image: 'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This industrial land in Maiduguri offers ample space for industrial development with good infrastructure.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 44,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 45,
    title: 'Warehouse',
    location: 'Bauchi, Bauchi',
    price: '₦180,000,000',
    beds: 0,
    baths: 0,
    area: '1500 sqm',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This warehouse facility in Bauchi offers ample space for storage and logistics operations.',
    features: ['Security System', 'Generator', 'Loading Dock', 'High Ceiling'],
    yearBuilt: 2020,
    parking: 'Multiple parking spaces',
    agentId: 45,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Warehouse Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Warehouse Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 46,
    title: '2-Bedroom Cottage',
    location: 'Katsina, Katsina',
    price: '₦50,000,000',
    beds: 2,
    baths: 2,
    area: '250 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This charming 2-bedroom cottage in Katsina offers cozy living with modern amenities.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '1-car garage',
    agentId: 46,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 47,
    title: 'Penthouse Suite',
    location: 'Minna, Niger',
    price: '₦120,000,000',
    beds: 3,
    baths: 3,
    area: '200 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This luxurious penthouse suite in Minna offers premium living with stunning views and high-end finishes.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '2-car parking',
    agentId: 47,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 48,
    title: 'Agricultural Land',
    location: 'Lokoja, Kogi',
    price: '₦90,000,000',
    beds: 0,
    baths: 0,
    area: '5000 sqm',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This agricultural land in Lokoja offers fertile soil and excellent potential for farming.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 48,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 49,
    title: 'Shopping Plaza',
    location: 'Makurdi, Benue',
    price: '₦300,000,000',
    beds: 0,
    baths: 0,
    area: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This shopping plaza in Makurdi offers excellent retail space with high customer traffic.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Central Location'],
    yearBuilt: 2022,
    parking: 'Multiple parking spaces',
    agentId: 49,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Mall Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Unit Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Unit Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 50,
    title: '6-Bedroom Mansion',
    location: 'Yola, Adamawa',
    price: '₦250,000,000',
    beds: 6,
    baths: 5,
    area: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 6-bedroom mansion in Yola offers luxurious living with spacious rooms and premium amenities.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 50,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 51,
    title: '1-Bedroom Flat',
    location: 'Gombe, Gombe',
    price: '₦25,000,000',
    beds: 1,
    baths: 1,
    area: '60 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy 1-bedroom flat in Gombe is perfect for singles seeking affordable living.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 51,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 52,
    title: 'Commercial Plot',
    location: 'Damaturu, Yobe',
    price: '₦80,000,000',
    beds: 0,
    baths: 0,
    area: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This commercial plot in Damaturu offers excellent development potential with good accessibility.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 52,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 53,
    title: 'Restaurant Building',
    location: 'Jalingo, Taraba',
    price: '₦70,000,000',
    beds: 0,
    baths: 0,
    area: '250 sqm',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This restaurant building in Jalingo is ideal for food business with good visibility and accessibility.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Kitchen Facilities'],
    yearBuilt: 2019,
    parking: 'Multiple parking spaces',
    agentId: 53,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Restaurant Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Kitchen Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Restaurant Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 54,
    title: '3-Bedroom Semi-Detached',
    location: 'Uyo, Akwa Ibom',
    price: '₦75,000,000',
    beds: 3,
    baths: 2,
    area: '300 sqm',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 3-bedroom semi-detached house in Uyo offers comfortable living with modern amenities.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 54,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 55,
    title: '2-Bedroom Condo',
    location: 'Asaba, Delta',
    price: '₦60,000,000',
    beds: 2,
    baths: 2,
    area: '100 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This 2-bedroom condo in Asaba offers comfortable living with modern amenities. Great for young professionals.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 55,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 56,
    title: 'Industrial Land',
    location: 'Warri, Delta',
    price: '₦160,000,000',
    beds: 0,
    baths: 0,
    area: '2000 sqm',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This industrial land in Warri offers ample space for industrial development with good infrastructure.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 56,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 57,
    title: 'Office Tower',
    location: 'Sapele, Delta',
    price: '₦400,000,000',
    beds: 0,
    baths: 0,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This office tower in Sapele offers prime location for businesses with modern facilities and excellent connectivity.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'High-Speed Internet'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 57,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Office Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Office Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 58,
    title: '4-Bedroom Family Home',
    location: 'Onitsha, Anambra',
    price: '₦100,000,000',
    beds: 4,
    baths: 3,
    area: '450 sqm',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 4-bedroom family home in Onitsha offers comfortable living with modern amenities.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '2-car garage',
    agentId: 58,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 59,
    title: 'Studio Apartment',
    location: 'Awka, Anambra',
    price: '₦20,000,000',
    beds: 1,
    baths: 1,
    area: '45 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy studio apartment in Awka is perfect for singles seeking affordable living.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 59,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 60,
    title: 'Farm Land',
    location: 'Nnewi, Anambra',
    price: '₦120,000,000',
    beds: 0,
    baths: 0,
    area: '10000 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This farm land in Nnewi offers fertile soil and excellent potential for farming.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 60,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 61,
    title: 'Supermarket Space',
    location: 'Aba, Abia',
    price: '₦90,000,000',
    beds: 0,
    baths: 0,
    area: '400 sqm',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This supermarket space in Aba offers excellent retail space with high customer traffic.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Storage Space'],
    yearBuilt: 2019,
    parking: 'Multiple parking spaces',
    agentId: 61,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Shop Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Location Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Shop Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 62,
    title: '5-Bedroom Estate House',
    location: 'Owerri, Imo',
    price: '₦180,000,000',
    beds: 5,
    baths: 4,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 5-bedroom estate house in Owerri offers luxurious living with spacious rooms and premium amenities. Ideal for families.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 62,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 63,
    title: '2-Bedroom Serviced Apartment',
    location: 'Umuahia, Abia',
    price: '₦40,000,000',
    beds: 2,
    baths: 2,
    area: '85 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This 2-bedroom serviced apartment in Umuahia offers move-in ready living with modern amenities.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '1-car parking',
    agentId: 63,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 64,
    title: 'Beachfront Land',
    location: 'Yenagoa, Bayelsa',
    price: '₦250,000,000',
    beds: 0,
    baths: 0,
    area: '1500 sqm',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This beachfront land in Yenagoa offers stunning views and excellent development potential.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 64,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 65,
    title: 'Hotel Property',
    location: 'Port Harcourt, Rivers',
    price: '₦500,000,000',
    beds: 0,
    baths: 0,
    area: '2500 sqm',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This hotel property in Port Harcourt offers prime location for hospitality business with modern facilities.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Conference Rooms'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 65,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hotel Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Hotel Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 66,
    title: '3-Bedroom Terrace House',
    location: 'Enugu, Enugu',
    price: '₦80,000,000',
    beds: 3,
    baths: 2,
    area: '320 sqm',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 3-bedroom terrace house in Enugu offers cozy living with a beautiful garden and modern finishes. Perfect for small families.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 66,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 67,
    title: 'Luxury Apartment',
    location: 'Abuja, FCT',
    price: '₦200,000,000',
    beds: 4,
    baths: 4,
    area: '250 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This luxury apartment in Abuja offers premium living with stunning views and high-end finishes.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2021,
    parking: '2-car parking',
    agentId: 67,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 68,
    title: 'Mining Land',
    location: 'Jos, Plateau',
    price: '₦300,000,000',
    beds: 0,
    baths: 0,
    area: '5000 sqm',
    image: 'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This mining land in Jos offers excellent potential for mining operations with good infrastructure.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 68,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1505691723518-41cb85c8e5c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 69,
    title: 'Bank Building',
    location: 'Lagos, Lagos',
    price: '₦600,000,000',
    beds: 0,
    baths: 0,
    area: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This bank building in Lagos offers prime location for financial services with modern facilities.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'Conference Rooms'],
    yearBuilt: 2018,
    parking: 'Multiple parking spaces',
    agentId: 69,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Bank Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Bank Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 70,
    title: '7-Bedroom Palace',
    location: 'Kano, Kano',
    price: '₦350,000,000',
    beds: 7,
    baths: 6,
    area: '1500 sqm',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 7-bedroom palace in Kano offers luxurious living with spacious rooms and premium amenities.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2020,
    parking: '3-car garage',
    agentId: 70,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 71,
    title: 'Mini Flat',
    location: 'Ibadan, Oyo',
    price: '₦15,000,000',
    beds: 1,
    baths: 1,
    area: '40 sqm',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This cozy mini flat in Ibadan is perfect for singles seeking affordable living.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 71,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 72,
    title: 'Oil Field Land',
    location: 'Port Harcourt, Rivers',
    price: '₦1,000,000,000',
    beds: 0,
    baths: 0,
    area: '10000 sqm',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This oil field land in Port Harcourt offers excellent potential for oil and gas exploration.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 72,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 73,
    title: 'Factory Building',
    location: 'Kaduna, Kaduna',
    price: '₦280,000,000',
    beds: 0,
    baths: 0,
    area: '3000 sqm',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This factory building in Kaduna offers ample space for manufacturing operations.',
    features: ['Security System', 'Generator', 'Loading Dock', 'High Ceiling', 'Industrial Power'],
    yearBuilt: 2020,
    parking: 'Multiple parking spaces',
    agentId: 73,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Factory Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Factory Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 74,
    title: '2-Bedroom Bungalow',
    location: 'Benin City, Edo',
    price: '₦65,000,000',
    beds: 2,
    baths: 2,
    area: '280 sqm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This charming 2-bedroom bungalow in Benin City offers cozy living with modern amenities.',
    features: ['Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2019,
    parking: '2-car garage',
    agentId: 74,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 75,
    title: 'Executive Apartment',
    location: 'Calabar, Cross River',
    price: '₦90,000,000',
    beds: 3,
    baths: 3,
    area: '150 sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This executive apartment in Calabar offers premium living with modern amenities.',
    features: ['Elevator', 'Gym', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2020,
    parking: '2-car parking',
    agentId: 75,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 76,
    title: 'Timber Land',
    location: 'Makurdi, Benue',
    price: '₦150,000,000',
    beds: 0,
    baths: 0,
    area: '20000 sqm',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This timber land in Makurdi offers excellent potential for forestry and timber production.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 76,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 77,
    title: 'Cinema Complex',
    location: 'Enugu, Enugu',
    price: '₦350,000,000',
    beds: 0,
    baths: 0,
    area: '1500 sqm',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This cinema complex in Enugu offers excellent space for entertainment business.',
    features: ['Security System', 'Generator', 'Air Conditioning', 'Central Location', 'Dolby Sound System'],
    yearBuilt: 2022,
    parking: 'Multiple parking spaces',
    agentId: 77,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Cinema Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Cinema Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 78,
    title: '4-Bedroom Modern Home',
    location: 'Abeokuta, Ogun',
    price: '₦130,000,000',
    beds: 4,
    baths: 3,
    area: '550 sqm',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 4-bedroom modern home in Abeokuta offers contemporary living with spacious rooms.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen'],
    yearBuilt: 2021,
    parking: '2-car garage',
    agentId: 78,
    agentName: 'David Okafor',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 79,
    title: 'Loft Apartment',
    location: 'Ilorin, Kwara',
    price: '₦35,000,000',
    beds: 1,
    baths: 1,
    area: '70 sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Apartment',
    description: 'This loft apartment in Ilorin offers modern living with open spaces.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning'],
    yearBuilt: 2019,
    parking: '1-car parking',
    agentId: 79,
    agentName: 'Sarah Ibrahim',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  },
  {
    id: 80,
    title: 'Vineyard Land',
    location: 'Akure, Ondo',
    price: '₦100,000,000',
    beds: 0,
    baths: 0,
    area: '3000 sqm',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=600&h=400&fit=crop',
    badge: 'Land',
    propertyType: 'Land',
    description: 'This vineyard land in Akure offers excellent potential for wine production.',
    features: ['Water Supply', 'Electricity', 'Good Road Network', 'Security'],
    yearBuilt: 0,
    parking: 'N/A',
    agentId: 80,
    agentName: 'Michael Eze',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Land Overview Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Surrounding Area Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Land Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Development Plan' }
    ]
  },
  {
    id: 81,
    title: 'Tech Hub Office',
    location: 'Lagos, Lagos',
    price: '₦450,000,000',
    beds: 0,
    baths: 0,
    area: '900 sqm',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'Commercial',
    description: 'This tech hub office in Lagos offers modern workspace for technology companies.',
    features: ['Elevator', 'Security System', 'Generator', 'Air Conditioning', 'High-Speed Internet', 'Conference Rooms'],
    yearBuilt: 2021,
    parking: 'Multiple parking spaces',
    agentId: 81,
    agentName: 'John Adebayo',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Office Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Facilities Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Office Layout Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Floor Plan' }
    ]
  },
  {
    id: 82,
    title: '8-Bedroom Compound',
    location: 'Abuja, FCT',
    price: '₦400,000,000',
    beds: 8,
    baths: 7,
    area: '2000 sqm',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    badge: 'For Sale',
    propertyType: 'House',
    description: 'This 8-bedroom compound in Abuja offers luxurious living with spacious rooms and premium amenities for extended families.',
    features: ['Swimming Pool', 'Garden', 'Security System', 'Generator', 'Air Conditioning', 'Walk-in Closet', 'Gourmet Kitchen', 'Guest House'],
    yearBuilt: 2020,
    parking: '4-car garage',
    agentId: 82,
    agentName: 'Mary Johnson',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    virtualTours: [
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Living Room Tour' },
      { tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Master Bedroom Tour' }
    ],
    floorPlans: [
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'Ground Floor Plan' },
      { tourUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', title: 'First Floor Plan' }
    ]
  }
];

const imagePoolsByType = {
  House: houseImagePool,
  Apartment: apartmentImagePool,
  Land: landImagePool,
  Commercial: commercialImagePool
};

const poolIndexByType = Object.keys(imagePoolsByType).reduce((acc, type) => {
  acc[type] = 0;
  return acc;
}, {});

properties.forEach((property) => {
  const pool = imagePoolsByType[property.propertyType];
  if (!pool || pool.length === 0) {
    return;
  }

  const typeIndex = poolIndexByType[property.propertyType] || 0;
  const galleryImages = [];
  const startIndex = (typeIndex + property.id) % pool.length;

  for (let i = 0; i < 5; i += 1) {
    galleryImages.push(pool[(startIndex + i) % pool.length]);
  }

  property.image = toCoverImage(galleryImages[0]);
  property.images = galleryImages;
  poolIndexByType[property.propertyType] = typeIndex + 1;
});

properties.forEach((property) => {
  if (property.image) {
    property.image = normalizePropertyImageUrl(property.image);
  }

  if (Array.isArray(property.images)) {
    property.images = property.images.map(normalizePropertyImageUrl);
  }
});

properties.forEach((property) => {
  const tour = virtualTourByLocation[property.location];
  if (tour) {
    property.virtualTours = [tour];
  }
});

properties.forEach((property) => {
  if (property.floorPlans) {
    delete property.floorPlans;
  }
});

export default properties;

