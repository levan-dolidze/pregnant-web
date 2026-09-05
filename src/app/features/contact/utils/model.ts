export interface ContactInfoModel {
  address: string;
  mobileNumber: string;
  email: string;
  workingHours: string;
}
export class ContactInfoSource {
  data: ContactInfoModel
  loader: boolean = true
}



export interface SendContactMessage {
  message: string;
  mobileNumber: string;


}