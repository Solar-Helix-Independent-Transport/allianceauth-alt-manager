import { loadReport } from "../apis/Dashboard";
import { ReportHeader } from "../components/ReportHeader";
import { ReportMenu } from "../components/ReportMenu";
import { UnknownTable } from "../components/UnknownTable";
import { ErrorLoader, PanelLoader } from "@pvyparts/allianceauth-components";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

export const ReportPage = () => {
  let { corporationID } = useParams();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["dashboard", corporationID],
    queryFn: () => loadReport(corporationID),
    refetchOnWindowFocus: false,
    refetchInterval: null,
  });

  return (
    <>
      <ReportMenu />
      <ReportHeader reportData={data} isLoading={isFetching} />
      {error ? (
        <ErrorLoader
          title="API Error"
          message="There was a problem loading data from the API. Have you added a token?"
        />
      ) : isLoading ? (
        <PanelLoader
          title="Loading Data"
          message="If this is a large corp this may take considerable time"
        />
      ) : corporationID === "0" ? (
        <PanelLoader
          title="Please Select a Corporation"
          message="You may need to add a token first"
        />
      ) : (
        <UnknownTable reportData={data} />
      )}
    </>
  );
};
