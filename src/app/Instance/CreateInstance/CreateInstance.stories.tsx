/* eslint-disable @typescript-eslint/await-thenable */

import CreateInstance from "@app/Instance/CreateInstance/CreateInstance";
import { CloudProviderWithRegions } from "@app/Instance/CreateInstance/types";
import {
  cloudProvider,
  cloudProviderUnavailable,
  sampleSubmit,
} from "@app/Instance/CreateInstance/storiesHelpers";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bridge/Create Smart Events Instance",
  component: CreateInstance,
  args: {
    isOpen: true,
    onClose: () => {},
    getCloudProviders: (): Promise<CloudProviderWithRegions[]> =>
      new Promise<CloudProviderWithRegions[]>((resolve) => {
        resolve([cloudProvider]);
      }),
    createBridge: () => {},
    appendTo: () => document.getElementById("storybook-root") || document.body,
  },
} as Meta<typeof CreateInstance>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CreateSmartEventsInstance: Story = {
  args: {
    getCloudProviders: (): Promise<CloudProviderWithRegions[]> =>
      new Promise<CloudProviderWithRegions[]>((resolve) => {
        setTimeout(() => {
          resolve([cloudProvider]);
        }, 500);
      }),
  },
};

export const FormValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      async () => {
        await expect(canvas.getByLabelText("Name *")).toBeEnabled();
      },
      { timeout: 3000 }
    );
    await userEvent.click(
      await canvas.getByText("Create Smart Events instance")
    );
  },
};

export const CreationPending: Story = {
  args: {
    createBridge: (): void => {
      // Doing nothing to remain in the loading status
    },
  },
  play: sampleSubmit,
};

export const ProvidersUnavailable: Story = {
  args: {
    getCloudProviders: (): Promise<CloudProviderWithRegions[]> =>
      new Promise<CloudProviderWithRegions[]>((resolve) => {
        resolve([cloudProviderUnavailable]);
      }),
  },
};

export const NameAlreadyTakenError: Story = {
  name: "Creation Error - Name taken",
  args: {
    createBridge: (_data, _onSuccess, onError): void => {
      onError("name-taken");
    },
  },
  play: sampleSubmit,
};

export const GenericCreationError: Story = {
  name: "Creation Error - Generic error",
  args: {
    createBridge: (_data, _onSuccess, onError): void => {
      onError("generic-error");
    },
  },
};

export const CloudProviderUnavailableOnSubmit: Story = {
  name: "Creation Error - Provider no more available",
  args: {
    createBridge: (_data, _onSuccess, onError): void => {
      onError("region-unavailable");
    },
  },
  play: sampleSubmit,
};

export const QuotaError: Story = {
  name: "Creation Error - Out of quota",
  args: {
    createBridge: (_data, _onSuccess, onError): void => {
      onError("quota-error");
    },
  },
  play: sampleSubmit,
};
