import { OrphanCharacterTable } from "./OrphanCharactersTable";
import { CorporationLogo } from "@pvyparts/allianceauth-components";
import React, { useState } from "react";
import { Label, Modal, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ReportHeader = ({ reportData, isLoading = false }) => {
  let { corporationID } = useParams();

  const [open, setOpen] = useState(false);

  let aggregates = reportData?.headers?.filter((r) => r?.aggregate);
  return (
    <div>
      <ProgressBar active={isLoading} now={100} style={{ margin: "0", height: "3px" }} />
      <div className="panel" style={{ display: "flex" }}>
        <CorporationLogo
          corporation_id={corporationID}
          size={128}
          style={{ marginRight: "20px" }}
        />
        <div>
          <h2>{reportData?.corporation}</h2>
          <h3>Unknown Characters</h3>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "30px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h4 style={{ alignSelf: "center" }}>Summary</h4>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {reportData?.knowns > 0 && (
              <Label bsStyle={"success"} style={{ margin: "5px" }}>
                Known Characters: {reportData?.knowns}
              </Label>
            )}
            {reportData?.unknowns > 0 && (
              <Label bsStyle={"danger"} style={{ margin: "5px" }}>
                Unknown Characters: {reportData?.unknowns}
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
