enum userPersona{
    deponent,
    buyer,
    seller,
    tenant,
    lawyer,
    legalentity
}

const allDocTypes = () => {
    return {
      docTypes: [
        "RENTAL_AGREEMENT",
        "BUY_SELL_AGREEMENT",
        "NOTARY_AFFIDAVIT",
        "EXISTING_CERTIFICATES",
        "NEW_CERTIFICATES",
      ],
    };
  };
  
  const legalTeam = () => {
    return {
      legalTeam: [
        {
          name: "ram rao",
          address: {
            line1: "256, First street",
            line2: "bellandur, Bangalore",
            line3: "Karnataka",
            zip: 560013,
          },
          email: "ramrao112@gmail.com",
          avatar: "https://reqres.in/img/faces/9-image.jpg",
          docsCreated: 50,
          rating: 4,
        },
        {
          name: "suk hegde",
          address: {
            line1: "654, second street",
            line2: "Koramangala, Bangalore",
            line3: "Karnataka",
            zip: 560064,
          },
          email: "sukhegde112@gmail.com",
          avatar: "https://reqres.in/img/faces/10-image.jpg",
          docsCreated: 87,
          rating: 5,
        },
        {
          name: "indira rajan",
          address: {
            line1: "874, third street",
            line2: "indiranagar, Bangalore",
            line3: "Karnataka",
            zip: 560047,
          },
          email: "sukhegde112@gmail.com",
          avatar: "https://reqres.in/img/faces/12-image.jpg",
          docsCreated: 36,
          rating: 3,
        },
      ],
    };
  };
  


enum doctypes{
    rentalAggremment= "RENTAL_AGREEMENT",
    buySellAggrement = "BUY_SELL_AGREEMENT",
    notaryAffidavit = "NOTARY_AFFIDAVIT",
    existingCertificates = "EXISTING_CERTIFICATES",
    newCertificates = "NEW_CERTIFICATES"
}

//As soon as customer given details // cid
type bondNftMetadata = {
    name:string,
    email:string,
    mobile:string,
    idType:string,
    idNumber:string,
    purposeDataUrl:string,//cid of purpose
}

//After legal entity /lawyer prepared the document
type bondNftMetadataUpdate = {
    name:string,
    email:string,
    mobile:string,
    idType:string,
    idNumber:string,
    purposeDataUrl:string,//cid of purpose
    //newlyadded
    legalDataUrl:string //cid of legal data prepared from lawyer /entity
    legalDatahash: string, // 
}

//************** dependencies to install in front end ******************** /
1. js-ipfs //https://js.ipfs.io/ --b refer from here
2. pdf.js / pdfreader need to check
3. sjcl.js /
// code to check
//import sjcl from 'sjcl'
//const myString = 'Hello'
//const myBitArray = sjcl.hash.sha256.hash(myString)
//const myHash = sjcl.codec.hex.fromBits(myBitArray)
//*********************************************************************** */


//1.dropdown to select doctype
//scenario where notaryAffidavit is selected

//2.dropdown to select userpersona
//user selects deponent

//3.selects one of the lawyer or legal entity to verify 

//user form ->  
// Name, Email, mobile, address, ID_Type, ID_Number,  purposeData{this will contain all the texts}, 

// check box (purposeData -> all the details that have provided is true to my knowledge, )
 //submit
//
//4. js-ipfs create data and storage uri ->(purposeData), (bondNftMetadata)
//5. Call -> CreateBond(storage uri, value:{5 matic}) -> escrow contract

//------------------------------------------------------


//webapp_
// lawyer / legal entity 
//bond // cid
// 1. get all bond details -> from smartcontract
//storage uri -> read from ipfs
//2. list all the bond ->
//3. upon lawyer selction of bond -> show purpose data -> text area

//4. File upload -> pdf.js -> read
//5. string->sjcl.js / hash
//6. ipfs -> cid, 
//6. bondNftMetadataUpdate {
   // ipfs -> cid, 
    //hash
//}


//updatemethod(bondid, uri,hash)


// id, doc, -> sha256 ->





