/* eslint-disable @typescript-eslint/await-thenable */

import { CloudProviderWithRegions } from "@app/Instance/CreateInstance/types";
import { PlayFunction } from "@storybook/csf";
import { ReactRenderer } from "@storybook/react";
import { CreateInstanceProps } from "@app/Instance/CreateInstance/CreateInstance";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export const cloudRegion = {
  kind: "CloudRegion",
  name: "us-east-1",
  display_name: "US East, N. Virginia",
  enabled: true,
};

export const cloudProvider: CloudProviderWithRegions = {
  kind: "CloudProvider",
  id: "aws",
  name: "aws",
  href: "/api/v1/cloud_providers/aws",
  display_name: "Amazon Web Services",
  enabled: true,
  regions: [cloudRegion],
};

export const cloudProviderUnavailable: CloudProviderWithRegions = {
  ...cloudProvider,
  regions: [{ ...cloudRegion, enabled: false }],
};

export const sampleSubmit: PlayFunction<
  ReactRenderer,
  CreateInstanceProps
> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(
    () => {
      expect(canvas.getByLabelText("Name *")).toBeEnabled();
    },
    { timeout: 3000 }
  );

  await userEvent.type(await canvas.findByLabelText("Name *"), "Instance name");
  await userEvent.click(await canvas.getByText("Create Smart Events instance"));
};
