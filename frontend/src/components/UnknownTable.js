import { BaseTable } from "@pvyparts/allianceauth-components";
import { EveWhoButton, ZKillButton } from "@pvyparts/allianceauth-components";
import React from "react";
import { Panel } from "react-bootstrap";

export const UnknownTable = ({ reportData }) => {
  const columns = React.useMemo(() => {
    return [
      {
        header: "Unknown Character",
        accessorKey: "name",
      },
      {
        header: (row) => <div className="text-right">Links</div>,
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (row) => (
          <div className="text-right">
            <ZKillButton character_name={row.getValue()} character_id={row.getValue()} />
            <EveWhoButton character_name={row.getValue()} character_id={row.getValue()} />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Panel.Body>
      <BaseTable data={reportData?.data} {...{ columns }} />
    </Panel.Body>
  );
};
