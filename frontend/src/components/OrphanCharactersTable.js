import { loadUnknowns } from "../apis/Dashboard";
import { BaseTable, PanelLoader } from "@pvyparts/allianceauth-components";
import { EveWhoButton, ZKillButton } from "@pvyparts/allianceauth-components";
import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";

export const OrphanCharacterTable = ({ data }) => {
  const columns = React.useMemo(() => {
    let cols = [
      {
        header: "Character",
        accessorKey: "name",
        cell: (row) => (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {row.getValue()}
            <div style={{ marginLeft: "auto" }}>
              <ZKillButton character_name={row.getValue()} />
              <EveWhoButton character_id={row.row.original.id} />
            </div>
          </div>
        ),
      },
    ];
    return cols;
  }, []);

  return (
    <Panel.Body>
      <BaseTable {...{ columns }} hover={true} data={data} />
    </Panel.Body>
  );
};
