"use client"
import { DataTable } from "@/components/tables/DataTable";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment"


type ClientPageProps = {
  dataItem: any[];
  header?: string;
  column: ColumnDef<any>[];
  navigation: string;
  navigationParam?: string;
  isThereNewTitle?: boolean
}

const ClientPage: FC<ClientPageProps> = ({dataItem, header, column, navigation, navigationParam, isThereNewTitle}) => {

  const item = dataItem.map((d) => ({
    ...d,
    createdAt: moment(d.updatedAt).format('MMMM DD, YYYY'),
    updatedAt: moment(d.createdAt).format('MMMM DD, YYYY'),
  }))

  return (
    <main>
      <div>
        <DataTable isThereNewTitle={isThereNewTitle} dataItem={dataItem} columns={column} newTitle={header} navigation={navigation} navigationParam={navigationParam}/>
      </div>
    </main>
  )
}

export default ClientPage;