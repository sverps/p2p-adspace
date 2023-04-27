import { useEffect } from "react";
import { Address, Signer } from "@wagmi/core";
import { SiweMessage } from "siwe";
import { useSigner } from "wagmi";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const domain = globalThis.location?.host;
const origin = globalThis.location?.origin;

const BACKEND_ADDR = "http://localhost:3000";

async function createSiweMessage(address: Address, statement: string) {
  const res = await fetch(`${BACKEND_ADDR}/api/auth?address=${encodeURIComponent(address)}`, {
    // credentials: "include",
  });
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: getTargetNetwork().id,
    nonce: await res.text(),
  });
  return message.prepareMessage();
}

async function signInWithEthereum(signer: Signer) {
  const message = await createSiweMessage(
    (await signer.getAddress()) as any as Address,
    "Sign in with Ethereum to the app.",
  );
  const signature = await signer.signMessage(message);

  const res = await fetch(`${BACKEND_ADDR}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
    // credentials: "include",
  });
  console.log(await res.text());
}

export function useAuth() {
  const { data: signer } = useSigner();
  useEffect(() => {
    if (signer) {
      signInWithEthereum(signer);
    }
  }, [signer]);
  return {
    loading: true,
    isAuth: false,
  };
}
