import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Meta from "@/components/meta";
import { useRouter } from "next/router";

export default function Layout({ children, className }) {
  const router = useRouter();
  return (
    <>
      <Meta />
      <Header />
      <div
        className={`${
          router.asPath !== "/" ? "min-h-screen" : ""
        } ${className}`}
      >
        <main>{children}</main>
      </div>
      {router.asPath !== "/" ? <Footer /> : null}
    </>
  );
}
