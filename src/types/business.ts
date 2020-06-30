export interface BusinessDataInterface {
  ecosystems: EcosystemDataInterface[];
}

interface EcosystemDataInterface {
  ecosystem_id: {
    ecosystem_name: string;
    ecosystem_url: string;
    _id: string;
    mode: string;
  };
}
