import { loadReport } from "../apis/Dashboard";
import { ReportHeader } from "../components/ReportHeader";
import { ReportMenu } from "../components/ReportMenu";
import { ErrorLoader, PanelLoader } from "@pvyparts/allianceauth-components";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UnknownTable } from "../components/UnknownTable";

export const ReportPage = () => {
  let { corporationID } = useParams();


  const { isLoading, error, data, isFetching } = useQuery(
    ["dashboard", corporationID],
    () => loadReport(corporationID),
    {
      refetchOnWindowFocus: false,
      refetchInterval: null,
    }
  );

  return (
    <>
      <ReportMenu />
      <ReportHeader reportData={data} isLoading={isFetching} />
      {error ? (
        <ErrorLoader title="API Error" message="There was a problem loading data from the API" />
      ) : isLoading ? (
        <PanelLoader
          title="Loading Data"
          message="If this is a large corp this may take considerable time"
        />
      ) : corporationID === "0" ? (
        <PanelLoader title="Please Select a Corporation, you may need to add a token first" />
      ) : (
        <UnknownTable reportData={data} />
      )}
    </>
  );
};
