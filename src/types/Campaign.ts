interface Advertisement {
  id: number;
  name: string;
  quantity: number;
}

interface SubCampaign {
  id: number;
  name: string;
  status: boolean;
  ads: Advertisement[];
}

interface Information {
  name: string;
  describe?: string;
}

interface Campaign {
  information: Information;
  subCampaigns: SubCampaign[];
}

export type { Campaign, Information, SubCampaign, Advertisement };
