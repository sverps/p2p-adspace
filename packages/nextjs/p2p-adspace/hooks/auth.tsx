import { ReactNode, createContext, useCallback, useContext, useState } from "react";
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
  const { token } = await res.json();
  return token;
}

interface AuthContext {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

const AuthContext = createContext<AuthContext>({
  token: undefined,
  setToken: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>();
  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const { token, setToken } = useContext(AuthContext);
  const { data: signer } = useSigner();

  const handleSignIn = useCallback(async () => {
    if (!signer) {
      return;
    }
    const token = await signInWithEthereum(signer);
    setToken(token);
  }, [setToken, signer]);

  return {
    onSignIn: handleSignIn,
    onSignOut: () => setToken(undefined),
    token,
  };
}
