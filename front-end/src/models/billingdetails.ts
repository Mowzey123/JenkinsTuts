export interface BillingDetails {
  companyname: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
export interface Savecard {
  cardno: string;
  exp: string;
  holdername: string;
}

export interface Card {
  // cardschema: string;
  prefix: string;
  suffix: string;
}

export interface Data {
    name: string;
    phone: string;
    subscriptionid: string;
}

export interface Addaccount {
  firstname: string;
  lastname: string;
  // phone: string;
  subscriptionid: string;
}

export interface Device {
  deviceId: string;
  model: string;
  imei: string;
}
