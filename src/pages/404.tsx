import Head from "next/head";
import { css } from "@emotion/css";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{"Bunday sahifa yo'q"}</title>
      </Head>
      <main
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        `}
      >
        <h1
          className={css`
            font-weight: 700;
          `}
        >
          Bunday sahifa mavjud emas
        </h1>
      </main>
    </>
  );
}
