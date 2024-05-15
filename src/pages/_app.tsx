import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { TaxiId } from "@/components/Context";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [taxiId, setTaxiId] = useState<number>(0);

  const router = useRouter();
  return (
    <TaxiId.Provider value={{ taxiId, setTaxiId }}>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </TaxiId.Provider>
  );
}
