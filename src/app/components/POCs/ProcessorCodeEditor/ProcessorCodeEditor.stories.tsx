import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import ProcessorCodeEditor from "@app/components/POCs/ProcessorCodeEditor/ProcessorCodeEditor";

const meta = {
  title: "PoCs/Processor Code Editor",
  component: ProcessorCodeEditor,
  args: {
    onChange: () => {},
    onValidate: () => {},
    onGuideClick: () => {},
    sinkConnectorsNames: ["one", "two"],
  },
  decorators: [
    (Story): JSX.Element => (
      <div style={{ height: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ProcessorCodeEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CodeEditor: Story = {
  args: {
    code: `- from:
    uri: "rhose:bridge"
    steps:
      - filter:
          simple: '\${header.type} == "StorageService"'
          steps:
          - kamelet:
              name: template
              parameters:
                template: 'hello \${body.name}'
          - to:
              uri: "SomeAction"`,
  },
};
