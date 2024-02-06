import CorpSelect from "./CorpSelect";
import { useIsFetching } from "@tanstack/react-query";
import React from "react";
import { ProgressBar } from "react-bootstrap";

export const ReportMenu = ({ reportData }) => {
  const isFetching = useIsFetching();

  return (
    <>
      <br />
      <div
        style={{
          marginBottom: "0",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginLeft: "8px",
          }}
        >
          Alt Manager
        </h3>
        <div
          className="pull-right"
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "300px" }}>
            <CorpSelect />
          </div>
          <div>
            <a className="btn btn-default btn-sm" href="/alts/add_corp_token">
              <i class="fas fa-plus fa-fw"></i>
            </a>
          </div>
        </div>
      </div>
      <ProgressBar
        active={isFetching ? true : false}
        now={100}
        style={{ marginBottom: "-1px", marginTop: "-1px", height: "10px" }}
      />
    </>
  );
};
