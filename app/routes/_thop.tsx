import { Outlet } from "@remix-run/react";
import Layout from "../components/Layout";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Thop() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
