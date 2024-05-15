import styles from "./index.module.sass";
import { css } from "@emotion/css";
import { Space, Select, Button, Dropdown } from "antd";
import { PiUserCircleLight, PiUserCircleGearLight } from "react-icons/pi";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import type { MenuProps } from "antd";

export default function Layout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const t = useTranslations();
  const router = useRouter();
  const { locale, locales, push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tokens = localStorage.getItem("Token") ?? "";
    setToken(tokens);
  }, []);

  const access = () => {
    setLoading(true);
    router.push("/auth/login");
  };

  const changeLanguage = (value: string) => {
    if (pathname === "/") {
      push("/", undefined, { locale: value });
    } else if (pathname === "/car-selection") {
      push("/car-selection", undefined, { locale: value });
    } else if (pathname === "/choose-place") {
      push("/choose-place", undefined, { locale: value });
    } else if (pathname === "/confirmation") {
      push("/confirmation", undefined, { locale: value });
    } else if (pathname === "/taxi-page") {
      push("/taxi-page", undefined, { locale: value });
    }
  };

  const items: MenuProps["items"] = [
    {
      label: t("Men taksichiman"),
      key: "1",
      onClick: () => {
        router.push("/taxi-page");
        setLoading(true);
      },
    },
    {
      type: "divider",
    },
    {
      label: t("Chiqish"),
      key: "3",
      danger: true,
      onClick: () => {
        localStorage.clear();
        location.reload();
      },
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <div
        className={css`
          background-color: #fff;
          box-shadow: 0 3px 11px 0 rgba(41, 41, 41, 0.2);
          border-radius: 10px;
        `}
      >
        <div className={styles.layout}>
          <div
            className={styles.layout__logo}
            onClick={() => {
              router.push("/");
              pathname === "/" ? setLoading(false) : setLoading(true);
            }}
          >
            <img
              src="../../../Images/photo_2023-12-18_19-07-54-removebg-preview.png"
              alt="logo"
            />
            <h2>ExpressGo</h2>
          </div>
          <div
            className={css`
              display: flex;
              align-items: center;
              gap: 15px;
            `}
          >
            <Space wrap>
              <Select
                defaultValue={locale}
                bordered={false}
                onChange={changeLanguage}
                options={[
                  {
                    value: "uz",
                    label: (
                      <span
                        className={css`
                          display: flex;
                          align-items: center;
                          gap: 5px;
                        `}
                      >
                        <img
                          src="../../../Images/Flag_of_Uzbekistan.svg.png"
                          alt="Uz"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "3px",
                          }}
                        />{" "}
                        Uzb
                      </span>
                    ),
                  },
                  {
                    value: "ru",
                    label: (
                      <span
                        className={css`
                          display: flex;
                          align-items: center;
                          gap: 5px;
                        `}
                      >
                        <img
                          src="../../../Images/Flag_of_Russia.svg.png"
                          alt="Ru"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "3px",
                          }}
                        />{" "}
                        Rus
                      </span>
                    ),
                  },
                ]}
              />
            </Space>

            {token ? (
              <Dropdown menu={{ items }} trigger={["click"]}>
                <PiUserCircleGearLight
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={(e: any) => e.preventDefault()}
                />
              </Dropdown>
            ) : (
              <Button
                type={"link"}
                className={css`
                  display: flex;
                  align-items: center;
                  gap: 5px;
                  color: #707070;
                  padding: 0;
                `}
                onClick={access}
              >
                <PiUserCircleLight />
                {t("Kirish")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
