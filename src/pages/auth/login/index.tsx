import Head from "next/head";
import styles from "./index.module.sass";
import { Form, Input, Button, Alert } from "antd";
import { css } from "@emotion/css";
import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import axios from "@/utils/axios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations();
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/user/login/", {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem("Token", res?.data.tokens.access);
      router.push("/");
    } catch (e) {
      setLoading(false);
      toast.error(t("Parolingiz xato!"));
    }
  };

  return (
    <>
      <ToastContainer />
      <Head>
        <title>{t("Tizimga kirish")}</title>
      </Head>
      {loading && <Loading />}
      <main className={styles.login}>
        <div className={styles.login__form}>
          <div>
            <h2>{t("Tizimga kirish")}</h2>
            <Alert
              className={styles.login__alert}
              message={t(
                "Shaxsiy kabinetingizni himoya qilish maqsadida, parolingizni muntazam yangilab turishingizni tavsiya qilamiz",
              )}
              type="warning"
            />
          </div>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item<FieldType>
              name="username"
              rules={[
                {
                  required: true,
                  message: t("Iltimos ismingizni kiriting", { icon: "📝!" }),
                },
              ]}
            >
              <Input placeholder={t("Ismni kiriting", { icon: "📝" })} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Iltimos parolingizni kiriting", { icon: "🔓!" }),
                },
              ]}
            >
              <Input.Password
                placeholder={t("Parolni kiriting", { icon: "🔓" })}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("Kirish")}
              </Button>
            </Form.Item>
          </Form>

          <Button
            type={"link"}
            className={css`
              text-align: end;
              padding: 0;
            `}
            onClick={() => {
              router.push("/auth/register");
              setLoading(true);
            }}
          >
            {t("Ro'yxatdan o'tish")}
          </Button>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${context.locale}.json`))
        .default,
    },
  };
}
