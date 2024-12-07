import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { ZonedDateTime } from "@internationalized/date";

// import CreatedCampaigns from "./creator/CreatedCampaigns";
// import CreateCampaignButton from "./creator/CreateCampaignButton";

// import AvailableCampaigns from "./backer/AvailableCampaigns";

import {
  Address,
  applyDoubleCborEncoding,
  applyParamsToScript,
  Constr,
  LucidEvolution,
  paymentCredentialOf,
  TxSignBuilder,
  UTxO,
  validatorToAddress,
} from "@lucid-evolution/lucid";
import { network } from "@/config/lucid";
// import { CampaignDatum, CampaignRedeemerAction } from "@/types/cardano";

const Script = {
  Crowdfunding: applyDoubleCborEncoding(
    "59186d0101003232323232323232323232323223223222533300b3232323232323232323232323232323232323232323253330213007011132533333302a014133300601413232323232325333028300e302a3754605c605e0082a66605066e3c08000454ccc0a0cdc4240000062a66605066e20c024c020c0acdd500d8010a99981429998141980a9bac300a302b375403646464a66605666ebcc0c40080884cdd7980d198181ba90234bd700008a503030302d37546060605a6ea8c0c0c0c4004c0b0dd50008a5115330294901366d7573745f636f6e73756d655f63726561746f725f6e6f6e63652874782c2063726561746f722c206e6f6e636529203f2046616c73650014a02a666050a666050a66605066ebd3010ea14b53544154455f544f4b454e0100374c64a666052602860566ea800452f5bded8c026eacc0bcc0b0dd50009980b1bab302e302f302f302f302f302b375403600e294454cc0a52401365b5061697228636f6e6669672e73746174655f746f6b656e2c2031295d203d3d206d696e7465645f746f6b656e73203f2046616c73650014a0294454cc0a52412e6d7573745f6d696e745f73746174655f746f6b656e2874782c2073656c665f73637269707429203f2046616c73650014a02a66605066601e03600e034294454cc0a524013e6d7573745f73656e645f73746174655f746f6b656e2874782c2073656c665f7363726970742c2063616d706169676e5f646174756d29203f2046616c73650014a029405280a99814a4814265787065637420756e736166655f756e777261702e66696e6974655f73746172745f6f662874782e76616c69646974795f72616e676529203c20646561646c696e65001615330294910f65787065637420676f616c203e203000161533029491156578706563742063726561746f72203d3d20706b6800161533029491636578706563742043616d706169676e446174756d207b20676f616c2c20646561646c696e652c2063726561746f723a2028706b682c205f292c2073746174653a2052756e6e696e672c202e2e207d203d0a2020202063616d706169676e5f646174756d0016375c605a6eb0c0b400cdd698160019bad302b003302b001302a00130293025375402803e03e03e03e03e6eb8c09cc090dd50090a99981098060088991991299999981600b09919299981318060008a99981518149baa0180020221533302630110011533302a302937540300040442a66604c601e0022a66605460526ea8060008088088c09cdd500b89919191919191919192999816980998179baa001132533302e3019303037540022646464a666062602e60666ea80044c94ccc0c8c0600044c8c94cccccc0f00084ccc06000854ccc0d14ccc0d14ccc0d0cc02409c0b85288a9981aa491d69735f7369676e65645f62795f706c6174666f726d203f2046616c73650014a02a6660686601604e6eb4c080c0dcdd50010a5115330354913b6d7573745f62655f61667465725f646561646c696e652874782c2063616d706169676e5f646174756d2e646561646c696e6529203f2046616c73650014a02a6660686601204e6eb8c058dd61806181b9baa00214a22a6606a921396d7573745f62655f7369676e65645f62792874782c2063616d706169676e5f646174756d2e63726561746f722e31737429203f2046616c73650014a02a666068a666068660146eb0c058c0dcdd50138030a51153303549013369735f72756e6e696e675f63616d706169676e2874782e696e707574732c2073656c665f73637269707429203f2046616c73650014a02a66606866603604e00c646464604c66078607a00666078607a00466078607a00266078607a607c0026607898103d87a80004bd70181e800981e000981b9baa00214a22a6606a921706d7573745f73656e645f73746174655f746f6b656e2874782c2073656c665f7363726970742c20776974685f646174756d3a2043616d706169676e446174756d207b202e2e63616d706169676e5f646174756d2c2073746174653a2043616e63656c6c6564207d29203f2046616c73650014a029405280008008008008008a9981a24930496e76616c69642043616e63656c20446174756d205479706521204d7573742062652043616d706169676e446174756d00163038303537540042a666064603a00226464a66666607800426660300042a666068a666068a6660686601204e05c294454cc0d524011d69735f7369676e65645f62795f706c6174666f726d203f2046616c73650014a02a6660686601604e6eb4c080c0dcdd50010a5115330354913b6d7573745f62655f61667465725f646561646c696e652874782c2063616d706169676e5f646174756d2e646561646c696e6529203f2046616c73650014a02a6660686601204e6eb8c058dd61806181b9baa00214a22a6606a921396d7573745f62655f7369676e65645f62792874782c2063616d706169676e5f646174756d2e63726561746f722e31737429203f2046616c73650014a02a666068a666068660146eb0c058c0dcdd50138030a51153303549013369735f72756e6e696e675f63616d706169676e2874782e696e707574732c2073656c665f73637269707429203f2046616c73650014a02a666068a66606866603604e00c646464604c66078607a00666078607a00466078607a00266078607a607c00266078980103d87b80004bd70181e800981e000981b9baa00214a22a6606a9216f6d7573745f73656e645f73746174655f746f6b656e2874782c2073656c665f7363726970742c20776974685f646174756d3a2043616d706169676e446174756d207b202e2e63616d706169676e5f646174756d2c2073746174653a2046696e6973686564207d29203f2046616c73650014a02a666068664464646464a66607466e240180044c94ccc0eccdc480119980b1bac3027303e375405c9000111919299981f99baf3045002005133700603200200820086eacc110c114004c100dd50008a51153303c49013b6c6973742e7265647563652874782e6f7574707574732c20302c2073756d5f63726561746f7229203e3d20737570706f727473203f2046616c73650014a0602c6607e6ea4010cc0fcdd4801a5eb8054cc0ed24011765787065637420737570706f727473203e3d20676f616c00163330143758603660786ea80b120002232323232533303f3375e608a00800e2a66607e605060826ea80044c8c94cccccc1240080040044c94ccc1180040084c94cccccc12c00400c00c00c00c4c8c94ccc1240040144c94cccccc1380040180180180184c94ccc12cc13800c4cdc018108050070039bae001304b001304b003375c00260900026eb0008004004401cc114c108dd500088030803182218228011bab30430013043001303e375460826084607c6ea8004c09ccc0f4c080cc0f4dd480525eb80cc0f5300103d87a80004bd701bae303d303e002375c60780026eb4c05cc0dcdd50011bac300c30373754004294454cc0d5241696d7573745f72656163685f676f616c5f616e645f73656e645f746f5f63726561746f722874782c2073656c665f7363726970742c2063616d706169676e5f646174756d2e676f616c2c2063616d706169676e5f646174756d2e63726561746f7229203f2046616c73650014a029405280a50001001001001001132533333303c0020010011325333039001002132533333303e00100300300300313232533303c0010051325333333041001006006006006132533303e30410031533303a3301037586038607a6ea80b40305288a9981da4813369735f72756e6e696e675f63616d706169676e2874782e696e707574732c2073656c665f73637269707429203f2046616c73650014a000e6eb8004c0f8004c0f800cdd7000981d8009bac00200100115330344911a496e76616c69642046696e69736820446174756d205479706521001630383035375400426464a666666078004002002264a666072002004264a66666607c00200600600600626464a66607800200a264a66666608200200c00c00c00c264a66607c60820062a666074666074660206eb0c074c0f4dd50168062504a22a666074646464a66607a66e24ccc060dd6180f98201baa0304800088c8c8c8c94ccc10ccdd798248020040a999821981618229baa001153330433375e6092608c6ea80040244cdc0180e801003080308030803182418248011bab3047001304700130423754608a608c60846ea8004ccc060dd6181498201baa0304800088c8c94ccc104cdd79823801002899b80301b00100410043756608c608e00260846ea80045288a9981f249296f75747075745f6c6f76656c616365203e3d20696e7075745f6c6f76656c616365203f2046616c73650014a060300106054660806046660806ea40352f5c066080980103d87a80004bd701ba700614a22a66076921326d7573745f726566756e642874782c2073656c665f7363726970742c206261636b65725f646174756d29203f2046616c73650014a007000e6eb8004c0f8004c0f800cdd7000981d8009bac002001001153303449012e496e76616c696420526566756e6420446174756d205479706521204d757374206265204261636b6572446174756d001630383035375400460666ea8c0dcc0e000854ccc0c4ccc0c4cc01cdd6180a181a1baa0240034a09444cc0180900ac0bcc0d8004cc0d0030cc0d00852f5c06eb8c0d0c0c4dd50008a99817a48137657870656374205363726970742873656c665f73637269707429203d20616464726573732e7061796d656e745f63726564656e7469616c0016300f30303754606660606ea8c0ccc0d0c0c0dd5181998181baa001153302e4916a65787065637420536f6d6528496e707574207b206f75747075743a204f7574707574207b20616464726573732c202e2e207d2c202e2e207d29203d0a2020202074782e696e70757473207c3e207472616e73616374696f6e2e66696e645f696e707574286f5f726566290016330053758601c605e6ea807c8cdd7980798181baa00100b22533302d3375e6e9ccc0c8dd4800a5eb80c0ccc0d0c0d0c0d0c0d0c0d0c0d0c0d0c0d0c0c0dd50010a51153302e491285b7369676e65725d203d3d2074782e65787472615f7369676e61746f72696573203f2046616c73650014a04464a66605a6026605e6ea80044c94ccc0b8c05cc0c0dd5000899299999981b8008a999817980a98189baa001132533303400102f1325333333039001030030030030132325333037001032132533333303c00103303303313232533303a001035132533333303f00103603603613232533303d001038132533333304200103903913232533304000103b13253333330450011533304130440021533304100303c132533333304600103d03d03d03d13232533304400103f132533333304900104004004004013253330463049003133302700613375e00c980103d8798000041041375c002608c002608c00a6eb8004c10c00c0f00f00f00f00f0c108004c10800cdd600081c81c981f800981f8019bad001036303c001303c003375a002066607200260720066eb8004c0d8004c0c8dd5000817017017017017181a18189baa001153302f4912a65787065637420496e6c696e65446174756d2863616d706169676e5f646174756d29203d20646174756d0016303330343034303037546066606860606ea8c0ccc0c0dd50008a99817249b665787065637420536f6d6528496e707574207b206f75747075743a204f7574707574207b20646174756d2c202e2e207d2c202e2e207d29203d207b0a202020206c657420696e707574203c2d206c6973742e66696e642874785f696e70757473290a202020206173736574732e7175616e746974795f6f6628696e7075742e6f75747075742e76616c75652c2073656c665f7363726970742c20636f6e6669672e73746174655f746f6b656e29203d3d20310a20207d001633005002230183330173756602060606ea8c040c0c0dd500080124410b53544154455f544f4b454e0022533302b3371200260186016605c6ea80085288a99816248144756e736166655f756e777261702e66696e6974655f73746172745f6f662874782e76616c69646974795f72616e676529203e3d20646561646c696e65203f2046616c73650014a04605e60606060606000244646600200200644a66605e0022980103d87a800013322533302d30050021301c330320024bd70099802002000981880098190009199808800a450048810022232333001001004003222533302f00210011333003003303200233004001303100223230153302b30153302b302c0024bd7019815a99981319b8f00148810014c103d87a8000130153302b30153302b30153302b375200297ae04bd7025eb812f5c06eb8c0acc0b0004080080080080c0a0004c0a0c0a4004c090dd50090b118139814181418141814181418141814000919192999811180698121baa0011325333023300e30253754600c604c6ea800c40044cdc0000a40046eb4c0a0c094dd50008a99811a49446578706563742046696e6974652874696d65293a20496e74657276616c426f756e64547970653c506f73697854696d653e203d20626f756e642e626f756e645f747970650016300330243754002664464a666046601200220062a666046601c0022006200460486ea8c94ccc08cc024004530103d879800015333023300c00114c0103d87b8000153330235333023300e30253754600c604c6ea800c4c038c094dd5180318131baa0021333023300e30253754600c604c6ea80092825114c103d87a800015333023300e30253754600c604c6ea800c5300103d87b800014c103d879800030243754664464a66604a60160022a66604a6016604e6ea80085300103d87a800014c103d879800015333025300e00115333025300e30273754004298103d87a800014c103d87b8000132325333027300d00114c0103d87b800015333027301000114c0103d87980001325333028337100060022980103d8798000153330283370e0060022980103d87a800014c103d87b8000375a605a60546ea8010c0a0dd50019bad302b30283754006604c6ea8008c010c094dd5001180218129baa001300230233754002600660466ea80048c0940048c090c0940048894ccc07cc014c084dd500189929998120008010992999999814800801801801801899192999813800802899299999981600080300300309919299981500080409929999998178008048048048991929998168008058992999999819000806006099192999818000807099299999981a8008a999818981a0010a999818801807899299999981b00080800800800809919299981a000809099299999981c800809809809809899299981b181c801899980b80300a80a00a1bae00130360013036005375c002606600601e01e01e01e01e606400260640066eb0004030030c0bc004c0bc00cdd6800804981600098160019bad00100630290013029003375c002604c00260446ea800c004888c94ccc07cc01400454ccc08cc088dd50020018010a99980f98050008a99981198111baa0040030021533301f3008001153330233022375400800600400460406ea800cdc3a400044464660146eb0c024c080dd5002119191919192999811980618129baa00113253330243375e0080102a66604866ebc0040244c03cccc03800c02922010b53544154455f544f4b454e0014a02940c0a4c098dd50008a50302830290033756604e004604c004604c00260426ea8004c02ccc084c010cc084dd480125eb80cc085300103d87a80004bd701ba548008dc3a400844464a666034600a60386ea8004520001375a6040603a6ea8004c94ccc068c014c070dd50008a60103d87a80001323300100137566042603c6ea8008894ccc080004530103d87a80001323332225333020337220100062a66604066e3c02000c4c03ccc094dd400125eb80530103d87a8000133006006001375c603e0026eb4c080004c090008c088004cc01c00c008dc3a4004460366038603800244646600200200644a66603600229404cc894ccc064c014008528899802002000980e800980f00091191980080080191299980d0008a60103d87a8000132333222533301a3372200e0062a66603466e3c01c00c4c024cc07cdd300125eb80530103d87a8000133006006001375c60320026eacc068004c078008c070004dd2a400060246ea8004c054c05800cc050008c04c008c04c004c038dd50008a4c2a6601892011856616c696461746f722072657475726e65642066616c73650013656375c0026eb800454cc01524011872656465656d65723a2043616d706169676e416374696f6e001615330044912672656465656d65722063616d706169676e5f646174756d3a2043616d706169676e446174756d001615330034913d657870656374202169735f72756e6e696e675f63616d706169676e2874782e7265666572656e63655f696e707574732c2073656c665f7363726970742900161533002491336578706563742043616d706169676e446174756d207b2073746174652c202e2e207d203d2063616d706169676e5f646174756d00165734ae7155ceaab9e5573eae815d0aba257481"
  ),
};

export default function Dashboard(props: {
  lucid: LucidEvolution;
  address: Address;
  setActionResult: (result: string) => void;
  onError: (error: any) => void;
}) {
  const { lucid, address, setActionResult, onError } = props;

  async function submitTx(tx: TxSignBuilder) {
    const txSigned = await tx.sign.withWallet().complete();
    const txHash = await txSigned.submit();

    return txHash;
  }

  type Action = (params: any) => Promise<void>;
  type ActionGroup = Record<string, Action>;

  const actions: Record<string, ActionGroup> = {
    CampaignCreator: {
      createCampaign: async (campaign: { title: string; goal: string; deadline: ZonedDateTime }) => {
        try {
          const utxos = await lucid.wallet().getUtxos();
          if (!utxos) throw "Empty Wallet";

          const nonce = utxos[0];
          const { txHash, outputIndex } = nonce;
          const oRef = new Constr(0, [String(txHash), BigInt(outputIndex)]);

          const pkh = paymentCredentialOf(address).hash;
          const platform = pkh;
          const creator = pkh;

          const campaignAddress = validatorToAddress(network, {
            type: "PlutusV3",
            script: applyParamsToScript(Script.Crowdfunding, [platform, creator, oRef]),
          });

          const tx = await lucid.newTx().pay.ToContract(campaignAddress, { kind: "inline", value: "TODO: Datum!" }).complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },

      finishCampaign: async ({ utxo }: { utxo: UTxO }) => {
        try {
          //   const tx = await lucid
          //     .newTx()
          //     .collectFrom([utxo], CampaignRedeemerAction.finish)
          //     .attach.SpendingValidator(spendingValidator)
          //     .addSigner(address)
          //     .complete();
          //   submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },

      cancelCampaign: async ({
        // campaign,
        utxo,
      }: {
        // campaign: CampaignDatum;
        utxo: UTxO;
      }) => {
        try {
          //   let newTx = lucid.newTx().collectFrom([utxo], CampaignRedeemerAction.cancel).attach.SpendingValidator(spendingValidator).addSigner(address);
          //   campaign.backers.forEach((lovelace, { pkh, skh }) => {
          //     const paymentCredential = keyHashToCredential(pkh);
          //     const stakeCredential = skh ? keyHashToCredential(skh) : undefined;
          //     const backerAddress = credentialToAddress(lucid.config().network, paymentCredential, stakeCredential);
          //     newTx = newTx.pay.ToAddress(backerAddress, { lovelace });
          //   });
          //   const tx = await newTx.complete();
          //   submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },
    },

    Backer: {
      pledgeCampaign: async ({
        pledgeAmount,
        // campaign,
        utxo,
      }: {
        pledgeAmount: string;
        // campaign: CampaignDatum;
        utxo: UTxO;
      }) => {
        try {
          //   const pkh = paymentCredentialOf(address).hash;
          //   const stakeAddress = await lucid.wallet().rewardAddress();
          //   const skh = stakeAddress ? stakeCredentialOf(stakeAddress).hash : "";
          //   const key = [...campaign.backers.keys()].find((key) => key.pkh === pkh && key.skh === skh) ?? { pkh, skh };
          //   const val = BigInt(parseFloat(pledgeAmount) * 1_000000);
          //   const datum: CampaignDatum = {
          //     ...campaign,
          //     backers: campaign.backers.set(key, (campaign.backers.get(key) ?? 0n) + val),
          //   };
          //   const block = await fetch("/blocks/latest", { headers: { project_id: `${process.env.NEXT_PUBLIC_BF_PID}` } });
          //   const { time } = await block.json();
          //   const tx = await lucid
          //     .newTx()
          //     .collectFrom([utxo], CampaignRedeemerAction.pledge)
          //     .attach.SpendingValidator(spendingValidator)
          //     .pay.ToContract(
          //       crowdfundingAddress,
          //       { kind: "inline", value: Data.to(datum, CampaignDatum) },
          //       { ...utxo.assets, lovelace: utxo.assets.lovelace + val }
          //     )
          //     .addSigner(address)
          //     .validFrom(time * 1_000)
          //     .complete();
          //   submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },
    },
  };

  /*
  Roles:
  - Campaign Creator:
    - Create Campaign
    - Cancel Campaign
    - Finish Campaign
  - Campaign Backer:
    - Pledge Campaign
    - Refund Campaign
  - Crowdfunding Platform:
    - Cancel Campaign (after its deadline)
    - Finish Campaign (after its deadline)
    - Refund Campaign
    - When There's No Datum, we can claim
  */
  return (
    <div className="flex flex-col gap-2">
      <span>{address}</span>

      <Accordion variant="splitted">
        {/* CampaignCreator */}
        <AccordionItem key="1" aria-label="Accordion 1" title="Campaign Creator">
          <div className="flex flex-wrap gap-2 mb-2">
            {/* <CreatedCampaigns
              lucid={lucid}
              address={address}
              crowdfundingAddress={crowdfundingAddress}
              finishCampaign={actions.CampaignCreator.finishCampaign}
              cancelCampaign={actions.CampaignCreator.cancelCampaign}
              onError={onError}
            /> */}
            {/* <CreateCampaignButton createCampaign={actions.CampaignCreator.createCampaign} onError={onError} /> */}
          </div>
        </AccordionItem>

        {/* Backer */}
        <AccordionItem key="2" aria-label="Accordion 2" title="Pledge Campaigns">
          <div className="flex flex-wrap gap-2 mb-2">
            {/* <AvailableCampaigns
              lucid={lucid}
              address={address}
              crowdfundingAddress={crowdfundingAddress}
              pledgeCampaign={actions.Backer.pledgeCampaign}
              onError={onError}
            /> */}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
