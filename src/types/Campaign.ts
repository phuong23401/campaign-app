interface Advertisement {
  name: string;
  quantity: number;
}

interface SubCampaign {
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

export default Campaign;
