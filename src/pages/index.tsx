import Head from "next/head";
import { GetStaticPropsContext } from "next";
import Layout from "@/components/Layout";
import HomePage from "@/components/Home";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("Bosh sahifa")}</title>
      </Head>
      <main>
        <Layout />
        <HomePage />
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}
