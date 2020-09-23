export type EcosystemResponseInterface = EcosystemDataInterface[];

export interface EcosystemDataInterface {
  _id: string;
  ecosystem_name: string;
  ecosystem_url: string[];
  mode: string;
}
