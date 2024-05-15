import React, { useState } from "react";
import Head from "next/head";
import { Form, Input, Button, Alert } from "antd";
import { css } from "@emotion/css";
import styles from "./index.module.sass";
import { useRouter } from "next/router";
import { PatternFormat } from "react-number-format";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Loading from "@/components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/utils/axios.config";

type FieldType = {
  first_name?: string;
  username?: string;
  password?: string;
  phone_number?: string;
  sms?: string;
};

const CustomPasswordInput = ({ ...rest }) => {
  return (
    <PatternFormat
      format="+998 (##) ### ## ##"
      allowEmptyFormatting
      customInput={Input}
      {...rest}
    />
  );
};

export default function Register() {
  const [smsActive, setSMSnotActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<any>(null);
  const router = useRouter();
  const t = useTranslations();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (!smsActive) {
        const res = await axios.post(`/user/activation/`, {
          phone_number: values.phone_number?.replaceAll(/[ ()]/g, ""),
        });
        setCode(res?.data.code);
        setSMSnotActive(true);
        setLoading(false);
      } else {
        setLoading(true);
        if (+values.sms === code) {
          try {
            await axios.post("/user/register/", {
              first_name: values.first_name,
              username: values.username,
              phone_number: values.phone_number?.replaceAll(/[ ()]/g, ""),
              password: code,
            });
            router.push("/auth/login");
          } catch (e) {
            console.log(e);
          }
        } else {
          setLoading(false);
          toast.error(t("Parolingiz xato!"));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ToastContainer />
      <Head>
        <title>{t("Ro'yxatdan o'tish")}</title>
      </Head>
      {loading && <Loading />}
      <main className={styles.register}>
        <div className={styles.register__form}>
          <div>
            <h2>{t("Ro'yxatdan o'tish")}</h2>
            <Alert
              className={styles.register__alert}
              message={t(
                "Shaxsiy kabinetingizni himoya qilish maqsadida, parolingizni muntazam yangilab turishingizni tavsiya qilamiz",
              )}
              type="warning"
            />
          </div>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item<FieldType>
              name="first_name"
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
              name="username"
              rules={[
                {
                  required: true,
                  message: t("Iltimos foydalanuvchi nomini kiriting", {
                    icon: "✏️!",
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("Foydalanuvchi nomini kiriting", { icon: "✏️" })}
              />
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

            <Form.Item<FieldType>
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: t("Iltimos raqamingizni kiriting", { icon: "📞!" }),
                },
              ]}
            >
              <CustomPasswordInput />
            </Form.Item>

            {smsActive && (
              <Form.Item<FieldType>
                name="sms"
                rules={[
                  {
                    required: true,
                    message: t("Iltimos sms kiriting", { icon: "📩!" }),
                  },
                ]}
              >
                <Input placeholder={t("Smsni kiriting", { icon: "📩" })} />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {smsActive ? t("Kirish") : t("SMS")}
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
              router.push("/auth/login");
              setLoading(true);
            }}
          >
            {t("Kirish")}
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
