export interface UserLogin {
    email: string;
    password: string;
}


export interface Signupclient {
   email: string;
   password: string;
}


export interface SignupClientCompanyDetails {
  token: string;
  companyname: string;
  noofemployees: string;
  }

export interface Companyuserprofile {
  email: string;
  password: string;
  companyname: string;
  noofemployees: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  }


export interface Verifytoken {
    token: string;
  }

export interface Userprofile {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    phone: string;
  }

export interface EditUserprofile {
    firstname: string;
    lastname: string;
    phone: string;
    }

export interface ChangePassword {
    oldpassword: string;
    newpassword: string;
}
export interface ConfirmEmail {
  role: string;
  password: string;
}

export interface Token {
  token: string;
}


