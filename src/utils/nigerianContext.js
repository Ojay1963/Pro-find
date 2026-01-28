export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const nigerianCities = {
  'Abia': ['Umuahia', 'Aba', 'Ohafia', 'Arochukwu'],
  'Adamawa': ['Yola', 'Mubi', 'Jimeta', 'Ganye'],
  'Akwa Ibom': ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
  'Bauchi': ['Bauchi', 'Azare', 'Jama\'are', 'Katagum'],
  'Bayelsa': ['Yenagoa', 'Brass', 'Ogbia', 'Sagbama'],
  'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala'],
  'Borno': ['Maiduguri', 'Bama', 'Dikwa', 'Biue'],
  'Cross River': ['Calabar', 'Ugep', 'Ikom', 'Ogoja'],
  'Delta': ['Asaba', 'Warri', 'Sapele', 'Ughelli'],
  'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Edda'],
  'Edo': ['Benin City', 'Auchi', 'Ekpoma', 'Uromi'],
  'Ekiti': ['Ado Ekiti', 'Ikere', 'Ijan', 'Ikole'],
  'Enugu': ['Enugu', 'Nsukka', 'Agbani', 'Udi'],
  'Federal Capital Territory': ['Abuja', 'Gwagwalada', 'Kuje', 'Kubwa'],
  'Gombe': ['Gombe', 'Bajoga', 'Kumo', 'Dukku'],
  'Imo': ['Owerri', 'Orlu', 'Okigwe', 'Mbaise'],
  'Jigawa': ['Dutse', 'Hadejia', 'Gumel', 'Kazaure'],
  'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Saminaka'],
  'Kano': ['Kano', 'Wudil', 'Rano', 'Gaya'],
  'Katsina': ['Katsina', 'Funtua', 'Daura', 'Malumfashi'],
  'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yelwa', 'Zuru'],
  'Kogi': ['Lokoja', 'Okene', 'Idah', 'Kabba'],
  'Kwara': ['Ilorin', 'Offa', 'Omu-Aran', 'Patigi'],
  'Lagos': ['Lekki', 'Victoria Island', 'Ikoyi', 'Surulere', 'Yaba', 'Ikeja', 'Ajah', 'Maryland'],
  'Nasarawa': ['Lafia', 'Keffi', 'Nasarawa', 'Akwanga'],
  'Niger': ['Minna', 'Suleja', 'Bida', 'Kontagora'],
  'Ogun': ['Abeokuta', 'Sagamu', 'Ijebu Ode', 'Ilaro'],
  'Ondo': ['Akure', 'Ondo', 'Owo', 'Ikare'],
  'Osun': ['Osogbo', 'Ile-Ife', 'Ilesa', 'Ejigbo'],
  'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin'],
  'Plateau': ['Jos', 'Bukuru', 'Shendam', 'Pankshin'],
  'Rivers': ['Port Harcourt', 'Bonny', 'Okrika', 'Degema'],
  'Sokoto': ['Sokoto', 'Tambuwal', 'Wurno', 'Gwadabawa'],
  'Taraba': ['Jalingo', 'Bali', 'Takum', 'Wukari'],
  'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Nguru'],
  'Zamfara': ['Gusau', 'Kaura Namoda', 'Tsafe', 'Anka']
};

export const popularLocations = [
  'Lekki, Lagos',
  'Victoria Island, Lagos',
  'Ikoyi, Lagos',
  'Maitama, Abuja',
  'Asokoro, Abuja',
  'GRA Port Harcourt',
  'Bodija, Ibadan',
  'GRA Enugu',
  'Onitsha, Anambra',
  'Uyo, Akwa Ibom'
];

export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};