import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InProgressIcon,
} from "@patternfly/react-icons";
import { Label } from "@patternfly/react-core";

// TODO: temporary label for demo purposes. Replace it with component from shared
//  library. See https://issues.redhat.com/browse/MGDOBR-523

interface StatusLabelProps {
  status: string;
}

const StatusLabel = (props: StatusLabelProps): JSX.Element => {
  const { status } = props;

  let statusIcon = <InProgressIcon />;
  if (status === "ready") {
    statusIcon = <CheckCircleIcon />;
  }
  if (status === "failed") {
    statusIcon = <ExclamationCircleIcon />;
  }

  return (
    <Label
      color={
        status === "ready" ? "green" : status === "failed" ? "red" : "grey"
      }
      icon={statusIcon}
      style={{ textTransform: "capitalize" }}
      variant="outline"
    >
      {status}
    </Label>
  );
};

export default StatusLabel;
