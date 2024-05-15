import Steps from "@/components/Steps";
import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { Tag, Button, Form, Input } from "antd";
import { MdOutlineAccessTime } from "react-icons/md";
import { css } from "@emotion/css";
import Head from "next/head";
import { HiArrowLongRight } from "react-icons/hi2";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { PatternFormat } from "react-number-format";
import Loading from "@/components/Loading";
// import { TaxiId } from "@/components/Context";
import axios from "@/utils/axios.config";

type FieldType = {
  first_name?: string;
  phone?: string;
};

interface Seats {
  id: number;
  driver_id: number;
  seat_id: number;
  is_booked: boolean;
}

type DataTaxi = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  account_tg: string;
  model: string;
  from_place: string;
  to_place: string;
  date: string;
  price: string;
  seats: Seats[];
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

export default function ChoosePlace() {
  const [loading, setLoading] = useState<boolean>(false);
  const [taxiData, setTaxiData] = useState<DataTaxi[]>([]);
  // const { taxiId } = useContext<any>(TaxiId);
  const [saveId, setSaveId] = useState<string>("");
  const router = useRouter();
  const t = useTranslations();

  const [plaseOne, setPlaseOne] = useState<boolean>(false);
  const [plaseTwo, setPlaseTwo] = useState<boolean>(false);
  const [plaseThree, setPlaseThree] = useState<boolean>(false);
  const [plaseFour, setPlaseFour] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [oneSeat, setOneSeat] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("TaxiID") ?? "";
    setSaveId(id);
    const fetchData = async () => {
      try {
        const response = await axios.get("/driver-list");
        setTaxiData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const taxiUser: DataTaxi | undefined = taxiData?.find(
    (item: DataTaxi): boolean => item.id === +saveId,
  );

  const seatsNumber: Seats[] | undefined = taxiUser?.seats.filter(
    (item: any): boolean => item.is_booked === true,
  );

  const price: number = taxiUser && taxiUser.price ? +taxiUser.price : 0;

  const allButton = () => {
    if (!plaseOne) setPlaseOne(true);

    if (!plaseTwo) setPlaseTwo(true);

    if (!plaseThree) setPlaseThree(true);

    if (!plaseFour) setPlaseFour(true);

    setCount(price * (seatsNumber?.length ?? 0));
  };

  const onFinish = (values: any) => {
    console.log(values, "seat", [
      {
        id: 1,
        driver_id: 1,
        seat_id: 1,
        is_booked: true,
      },
      {
        id: 2,
        driver_id: 1,
        seat_id: 2,
        is_booked: true,
      },
      {
        id: 3,
        driver_id: 1,
        seat_id: 3,
        is_booked: true,
      },
      {
        id: 4,
        driver_id: 1,
        seat_id: 4,
        is_booked: false,
      },
    ]);

    setLoading(true);
    if (localStorage.getItem("Token")) return router.push("/confirmation");
    else return router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>{t("Joy tanlash")}</title>
      </Head>
      <main>
        <Layout />
        <Steps />
        {loading && <Loading />}
        <div className={styles.choosePlace}>
          <div>
            <div className={styles.choosePlace__boxInfo}>
              <div className={styles.choosePlace__boxContent}>
                <div className={styles.choosePlace__departure}>
                  <p className={styles.choosePlace__aboutUser}>
                    {taxiUser?.first_name}
                  </p>
                  <p className={styles.choosePlace__region}>
                    {taxiUser?.from_place}
                  </p>
                </div>
                <div className={styles.choosePlace__iconSvgRow}>
                  <HiArrowLongRight />
                </div>
                <div className={styles.choosePlace__arrive}>
                  <p className={styles.choosePlace__userTel}>
                    <a href={`tel: ${taxiUser?.phone}`}>{taxiUser?.phone}</a>
                  </p>
                  <p className={styles.choosePlace__region}>
                    {taxiUser?.to_place}
                  </p>
                </div>
              </div>
              <div className={styles.choosePlace__boxContent2}>
                <div className={styles.departure2}>
                  <Tag color="success">{taxiUser?.model}</Tag>
                  <div className={styles.departure2__content}>
                    <MdOutlineAccessTime
                      className={css`
                        color: #9c9c9c;
                      `}
                    />
                    <p className={styles.departure2__arriveTime}>
                      {"Jo'nash vaqtlari mahalliy vaqt bilan ko'rsatilgan."}
                    </p>
                  </div>
                  <p className={styles.departure2__time}>{taxiUser?.date}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.choosePlace__contentInfoOrder}>
              <h3>{t("Avtomobil (nomi) joyni tanlang")}</h3>
              <div className={styles.choosePlace__boxInfo2}>
                <div className={styles.choosePlace__orderInfo}>
                  <p className={styles.choosePlace__totalText}>
                    {t("Jami o'rindiqlar")}
                  </p>
                  <p>4</p>
                </div>
                <div className={styles.choosePlace__orderInfo}>
                  <p className={styles.choosePlace__totalText}>
                    {t("Bo'sh o'rindiqlar")}
                  </p>
                  <p>{seatsNumber?.length}</p>
                </div>
                <div className={styles.choosePlace__orderInfo}>
                  <p className={styles.choosePlace__totalText}>
                    {t("Band o'rindiqlar")}
                  </p>
                  <p>{4 - (seatsNumber?.length ?? 0)}</p>
                </div>
                <div className={styles.choosePlace__orderInfo}>
                  <p className={styles.choosePlace__totalText}>{t("Narxi")}</p>
                  <p>
                    {taxiUser && taxiUser.price
                      ? Intl.NumberFormat("en-En").format(+taxiUser.price)
                      : ""}{" "}
                    {t("so'm")}
                  </p>
                </div>
                <Button type="primary" onClick={allButton}>
                  {t("Hamma o'rindiqlarni belgilash")}
                </Button>
              </div>
              <div className={styles.choosePlace__carDiv}>
                <img
                  src="../../../Images/car-4.png"
                  alt="Car"
                  className={styles.choosePlace__carDivImage}
                />
                {taxiUser?.seats[2].is_booked ? (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[2].is_booked === false) {
                        setPlaseThree(!plaseThree);
                        if (!plaseThree) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: black;
                      color: #fff;
                    `}
                  >
                    3
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[2].is_booked === false) {
                        setPlaseThree(!plaseThree);
                        if (!plaseThree) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: ${plaseThree ? "black" : "none"};
                      color: ${plaseThree ? "#fff" : "black"};
                    `}
                  >
                    3
                  </Button>
                )}
                {taxiUser?.seats[0].is_booked ? (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[0].is_booked === false) {
                        setPlaseOne(!plaseOne);
                        if (!plaseOne) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: black;
                      color: #fff;
                    `}
                  >
                    1
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[0].is_booked === false) {
                        setPlaseOne(!plaseOne);
                        if (!plaseOne) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: ${plaseOne ? "black" : "none"};
                      color: ${plaseOne ? "#fff" : "black"};
                    `}
                  >
                    1
                  </Button>
                )}
                {taxiUser?.seats[3].is_booked ? (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[3].is_booked === false) {
                        setPlaseFour(!plaseFour);
                        if (!plaseFour) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: black;
                      color: #fff;
                    `}
                  >
                    4
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[3].is_booked === false) {
                        setPlaseFour(!plaseFour);
                        if (!plaseFour) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: ${plaseFour ? "black" : "none"};
                      color: ${plaseFour ? "#fff" : "black"};
                    `}
                  >
                    4
                  </Button>
                )}
                {taxiUser?.seats[1].is_booked ? (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[1].is_booked === false) {
                        setPlaseTwo(!plaseTwo);
                        if (!plaseTwo) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: black;
                      color: #fff;
                    `}
                  >
                    2
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (taxiUser?.seats[1].is_booked === false) {
                        setPlaseTwo(!plaseTwo);
                        if (!plaseTwo) {
                          setCount((prev) => prev + price);
                        } else setCount((prev) => prev - price);
                      }
                    }}
                    className={css`
                      background: ${plaseTwo ? "black" : "none"};
                      color: ${plaseTwo ? "#fff" : "black"};
                    `}
                  >
                    2
                  </Button>
                )}
              </div>
            </div>
          </div>
          {count > 0 ? (
            <div className={styles.choosePlace__form}>
              <h2>{t("O'zingiz haqingizda malumot bering!")}</h2>
              <Form onFinish={onFinish}>
                <Form.Item<FieldType>
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: t("Iltimos ismingizni kiriting!"),
                    },
                  ]}
                  className={styles.choosePlace__userInfos}
                >
                  <Input placeholder={t("Ism")} />
                </Form.Item>

                <Form.Item<FieldType>
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: t("Iltimos raqamingizni kiriting!"),
                    },
                  ]}
                  className={styles.choosePlace__userInfos}
                >
                  <CustomPasswordInput />
                </Form.Item>

                <p>
                  {Intl.NumberFormat("en-En").format(count)} {t("so'm")}
                </p>

                <Form.Item>
                  <Button type="primary" htmlType={"submit"}>
                    {t("Tasdiqlash")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            ""
          )}
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
