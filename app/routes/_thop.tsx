import { json, Outlet } from "@remix-run/react";
import Layout from "../components/Layout";
import type { LoaderFunction } from "@remix-run/node";
import { Toaster } from "../components/ui/toaster";
import { ContactDetailsService } from "~/services/contact-details.server";
import { ContactD } from "~/types/ContactDetails";
import { ProductService } from "~/services/product.server";
import { Product } from "~/types/Product";
import DemoWatermarkCard from "~/components/demo";

export const loader: LoaderFunction = async () => {
  const resContact = await ContactDetailsService.getContactDetails();
  const contactDetails = resContact;
  const resProducts = await ProductService.getProducts();
  const products = resProducts;

  return json({
    contactDetails: contactDetails as ContactD,
    products: products as Product[],
  });
};

export default function Thop() {
  return (
    <Layout>
      <Toaster />
      <DemoWatermarkCard />
      <Outlet />
    </Layout>
  );
}
