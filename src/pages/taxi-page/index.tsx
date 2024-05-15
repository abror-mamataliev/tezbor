import React, { useState } from "react";
import styles from "./index.module.sass";
import Head from "next/head";
import { Form, Input, Button, DatePicker } from "antd";
import { PatternFormat } from "react-number-format";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { PiTelegramLogoThin } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import {
  MdOutlineWhereToVote,
  MdOutlineVerticalAlignBottom,
} from "react-icons/md";
import { css } from "@emotion/css";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { DatePickerProps } from "antd";
import axios from "@/utils/axios.config";

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

type FieldType = {
  first_name?: string;
  phone?: string;
  account_tg: string;
  price?: number;
  model?: string;
  date?: string;
  from_place?: string;
  to_place?: string;
};

export default function TaxiPage() {
  const [plaseOne, setPlaseOne] = useState<boolean>(false);
  const [plaseTwo, setPlaseTwo] = useState<boolean>(false);
  const [plaseThree, setPlaseThree] = useState<boolean>(false);
  const [plaseFour, setPlaseFour] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<string>("");
  const t = useTranslations();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDay(dateString);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post(
        "/driver",
        {
          first_name: values.first_name,
          last_name: "No Last Name",
          phone: values.phone,
          account_tg: values.account_tg,
          model: values.model,
          from_place: values.from_place,
          to_place: values.to_place,
          date: day,
          price: values.price,
          seat: [
            {
              seat: 1,
              is_booked: plaseOne,
            },
            {
              seat: 2,
              is_booked: plaseTwo,
            },
            {
              seat: 3,
              is_booked: plaseThree,
            },
            {
              seat: 4,
              is_booked: plaseFour,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        },
      );

      setLoading(false);
      toast.success(t("Muvaffaqiyatli yakunlandi!"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <Head>
        <title>{t("Taksi sahifasi")}</title>
      </Head>
      {loading && <Loading />}
      <main>
        <div className={styles.taxiPage}>
          <div className={styles.taxiPage__form}>
            <Form onFinish={onFinish} layout={"vertical"}>
              <Form.Item<FieldType>
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: t("Iltimos ismingizni kiriting!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <Input placeholder={t("Ism")} prefix={<CiUser />} />
              </Form.Item>

              <Form.Item<FieldType>
                name="phone"
                rules={[
                  {
                    required: true,
                    message: t("Iltimos raqamingizni kiriting!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <CustomPasswordInput prefix={<BsTelephone />} />
              </Form.Item>

              <Form.Item<FieldType>
                name="account_tg"
                className={styles.taxiPage__input}
              >
                <Input
                  placeholder={t("Telegram link")}
                  prefix={<PiTelegramLogoThin />}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="price"
                rules={[
                  { required: true, message: t("Iltimos narx kiriting!") },
                ]}
                className={styles.taxiPage__input}
              >
                <Input
                  placeholder={"Narxi"}
                  prefix={<GiMoneyStack />}
                  type={"number"}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="model"
                rules={[
                  {
                    required: true,
                    message: t("Iltimos avtomobil rusumini kiriting!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <Input
                  placeholder={t("Avtomobil rusumi")}
                  prefix={<IoCarSportOutline />}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="date"
                rules={[
                  {
                    required: true,
                    message: t("Iltimos jo'nash vaqtini kiriting!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <DatePicker
                  onChange={onChange}
                  placeholder={t("Jo'nash vaqti")}
                  format={"YYYY-MM-DD"}
                  className={css`
                    width: 100%;
                  `}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="from_place"
                rules={[
                  {
                    required: true,
                    message: t("Qayerdan!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <Input
                  placeholder={t("Qayerdan")}
                  prefix={<MdOutlineWhereToVote />}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="to_place"
                rules={[
                  {
                    required: true,
                    message: t("Qayerga!"),
                  },
                ]}
                className={styles.taxiPage__input}
              >
                <Input
                  placeholder={t("Qayerga")}
                  prefix={<MdOutlineWhereToVote />}
                />
              </Form.Item>

              <Form.Item
                className={css`
                  width: 100%;
                `}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className={css`
                    width: 100%;
                  `}
                >
                  {t("Tasdiqlash")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className={styles.taxiPage__carImage}>
          <h2>
            {t("Bo'sh o'rindiqlarni belgilang")}{" "}
            <MdOutlineVerticalAlignBottom />
          </h2>

          <div className={styles.taxiPage__carDiv}>
            <img
              src="../../../Images/car-4.png"
              alt="Car"
              className={styles.taxiPage__carDivImage}
            />
            <Button
              onClick={() => setPlaseThree(!plaseThree)}
              className={css`
                background: ${plaseThree ? "black" : "none"};
                color: ${plaseThree ? "#fff" : "black"};
              `}
            >
              3
            </Button>
            <Button
              onClick={() => setPlaseOne(!plaseOne)}
              className={css`
                background: ${plaseOne ? "black" : "none"};
                color: ${plaseOne ? "#fff" : "black"};
              `}
            >
              1
            </Button>
            <Button
              onClick={() => setPlaseFour(!plaseFour)}
              className={css`
                background: ${plaseFour ? "black" : "none"};
                color: ${plaseFour ? "#fff" : "black"};
              `}
            >
              4
            </Button>
            <Button
              onClick={() => setPlaseTwo(!plaseTwo)}
              className={css`
                background: ${plaseTwo ? "black" : "none"};
                color: ${plaseTwo ? "#fff" : "black"};
              `}
            >
              2
            </Button>
          </div>
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
