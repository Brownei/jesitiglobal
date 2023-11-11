"use client"
import { DataTable } from "@/components/DataTable";
import { GraphicColumn, graphicColumns } from "./columns";
import ProductForm from "@/components/forms/ProductForm";
import { FC } from "react";

type ClientPageProps = {
  productDataItem: GraphicColumn[]
}

const ClientPage: FC<ClientPageProps> = ({productDataItem}) => {
  return (
    <main>
      <div>
        <DataTable productDataItem={productDataItem} columns={graphicColumns} newTitle="New Graphic"/>
        {/* <ProductForm title="Create Graphic Product"/> */}
      </div>
    </main>
  )
}

export default ClientPage;