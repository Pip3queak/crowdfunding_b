import { createContext, Dispatch, useContext } from "react";

import { Address, Credential, OutRef, PaymentKeyHash, PolicyId, Unit, UTxO, Validator } from "@lucid-evolution/lucid";
import { CampaignDatum, CampaignState } from "@/types/crowdfunding";

export type CampaignUTxO = {
  CampaignInfo: {
    id: PolicyId;
    platform: { pkh: PaymentKeyHash };
    nonce: OutRef;
    validator: Validator;
    address: Address;
    datum: CampaignDatum;
    data: {
      name: string;
      goal: number;
      deadline: Date;
      creator: { pk: Credential; sk: Credential; address: Address };
      state: CampaignState;
    };
  };
  StateToken: {
    unit: Unit;
    utxo: UTxO;
  };
};

export type CampaignDispatchAction = {
  actionType: "Store";
  nextState: CampaignUTxO;
};

export const CampaignContext = createContext<[CampaignUTxO | undefined, Dispatch<CampaignDispatchAction>]>([, () => {}]);
export const useCampaign = () => useContext(CampaignContext);
