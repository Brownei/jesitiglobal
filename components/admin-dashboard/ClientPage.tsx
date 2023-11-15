"use client"
import { DataTable } from "@/components/tables/DataTable";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";

type ClientPageProps = {
  dataItem: any[];
  header: string;
  column: ColumnDef<any>[];
  navigation: string;
  navigationParam: string;
}

const ClientPage: FC<ClientPageProps> = ({dataItem, header, column, navigation, navigationParam}) => {
  return (
    <main>
      <div>
        <DataTable dataItem={dataItem} columns={column} newTitle={header} navigation={navigation} navigationParam={navigationParam}/>
      </div>
    </main>
  )
}

export default ClientPage;