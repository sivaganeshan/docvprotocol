export enum userPersona {
  deponent = 'Deponent',
  buyer = 'Buyer',
  seller = 'Seller',
  tenant = 'Tenant',
  lawyer = 'Lawyer',
  legalentity = 'Legal Entity',
}
export enum doctypes {
  rentalAggremment = 'RENTAL_AGREEMENT',
  buySellAggrement = 'BUY_SELL_AGREEMENT',
  notaryAffidavit = 'NOTARY_AFFIDAVIT',
  existingCertificates = 'EXISTING_CERTIFICATES',
  newCertificates = 'NEW_CERTIFICATES',
}

export enum idType {
  ssn = 'SSN',
  aadhar = 'Aadhar',
}

export const legalTeam = () => {
  return [
    {
      name: 'Ram Rao',
      homeAddress: {
        line1: '256, First street',
        line2: 'bellandur, Bangalore',
        line3: 'Karnataka',
        zip: 560013,
      },
      address: '0x2546bcd3c84621e976d8185a91a922ae77ecec30',
      email: 'ramrao112@gmail.com',
      avatar: 'https://reqres.in/img/faces/9-image.jpg',
      docsCreated: 50,
      rating: 4,
    },
    {
      name: 'Suk Hegde',
      homeAddress: {
        line1: '654, second street',
        line2: 'Koramangala, Bangalore',
        line3: 'Karnataka',
        zip: 560064,
      },
      address: '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
      email: 'sukhegde112@gmail.com',
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
      docsCreated: 87,
      rating: 5,
    },
    {
      name: 'Indira Rajan',
      homeAddress: {
        line1: '874, third street',
        line2: 'indiranagar, Bangalore',
        line3: 'Karnataka',
        zip: 560047,
      },
      address: '0xdd2fd4581271e230360230f9337d5c0430bf44c0',
      email: 'sukhegde112@gmail.com',
      avatar: 'https://reqres.in/img/faces/12-image.jpg',
      docsCreated: 36,
      rating: 3,
    },
  ]
}

//As soon as customer given details // cid
export let bondNftMetadata: {
  name: string
  email: string
  mobile: string
  idType: string
  idNumber: string
  purposeDataUrl: string //cid of purpose
}

//After legal entity /lawyer prepared the document
export let bondNftMetadataUpdate: {
  name: string
  email: string
  mobile: string
  idType: string
  idNumber: string
  purposeDataUrl: string //cid of purpose
  //newlyadded
  legalDataUrl: string //cid of legal data prepared from lawyer /entity
  legalDatahash: string //
}
