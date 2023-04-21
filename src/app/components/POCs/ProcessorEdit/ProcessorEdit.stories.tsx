/* eslint-disable @typescript-eslint/await-thenable */

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProcessorEdit from "@app/components/POCs/ProcessorEdit/ProcessorEdit";
import { Page } from "@patternfly/react-core";
import { PROCESSOR_TEMPLATES } from "@app/components/POCs/ProcessorEdit/ProcessorTemplates";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  demoTemplates,
  deployFunction,
  moreTemplates,
  waitForNextButton,
} from "@app/components/POCs/ProcessorEdit/storyUtils";

const meta = {
  title: "PoCs/Create Processor",
  component: ProcessorEdit,
  args: {
    onCancel: () => {},
    createProcessor: () => {},
    processorTemplates: PROCESSOR_TEMPLATES,
    sinkValuesSuggestions: ["MyFirstSink", "MySecondSink"],
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story): JSX.Element => (
      <Page>
        <Story />
      </Page>
    ),
  ],
} as Meta<typeof ProcessorEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreationFlow: Story = {};

export const CodeErrorsValidation: Story = {
  args: {
    processorTemplates: demoTemplates,
  },
  play: async ({ canvasElement }): Promise<void> => {
    const canvas = within(canvasElement);

    await waitForNextButton(canvas);
    await userEvent.click(await canvas.getByText("Next"));
  },
};

export const SyntaxErrorWarning: Story = {
  name: "Syntax error warning on deploy",
  args: {
    processorTemplates: demoTemplates,
  },
  play: async ({ canvasElement }): Promise<void> => {
    const canvas = within(canvasElement);

    await waitForNextButton(canvas);
    await userEvent.click(await canvas.getByText("Next"));

    await waitFor(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      await expect(canvas.getByText("1 Issue found")).toBeInTheDocument();
    });
    await userEvent.click(await canvas.getByText("Deploy Processor"));
  },
};

export const CreationPending: Story = {
  args: {
    createProcessor: (): void => {
      // Doing nothing to remain in the loading status
    },
  },
  play: deployFunction,
};

export const NameAlreadyTaken: Story = {
  name: "Creation Error - Name taken",
  args: {
    createProcessor: (_data, _onSuccess, onError): void => {
      onError("name-taken");
    },
  },
  play: deployFunction,
};

export const GenericCreationError: Story = {
  name: "Creation Error - Generic error",
  args: {
    createProcessor: (_data, _onSuccess, onError): void => {
      onError("generic-error");
    },
  },
  play: deployFunction,
};

export const ManyTemplatesOptions: Story = {
  args: {
    processorTemplates: moreTemplates,
  },
};
