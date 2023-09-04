export type UserPreferences = { [key: string]: string }

export type CommunicationPreferences = {
  contactViaSms: boolean;
  contactViaEmail: boolean;
  contactViaPost: boolean;
}