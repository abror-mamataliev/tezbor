import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Steps from "@/components/Steps";
import styles from "./index.module.sass";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";

export default function Confirmation() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations();

  const homePage = () => {
    setLoading(true);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{t("Tasdiqlash")}</title>
      </Head>
      <main>
        <Steps />
        {loading && <Loading />}
        <div className={styles.confirmation}>
          <Result
            status="success"
            title={t("Tabriklayman muvaffaqiyatli yakunlandi!")}
            extra={[
              <Button key="back-to-home" type="primary" onClick={homePage}>
                {t("Bosh sahifaga qaytish")}
              </Button>,
            ]}
          />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}.json`))
        .default,
    },
  };
}
