import { Meta, StoryObj } from "@storybook/react";
import CamelDSLCodeEditor from "@app/components/POCs/CamelDSLCodeEditor/CamelDSLCodeEditor";

const meta = {
  title: "PoCs/Camel DSL Code Editor",
  component: CamelDSLCodeEditor,
  args: {
    onChange: (): void => {},
    onValidate: (): void => {},
    width: "100%",
    height: "500px",
    sinkConnectorsNames: [],
  },
} as Meta<typeof CamelDSLCodeEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SampleProcessor: Story = {
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

export const InvalidSource: Story = {
  args: {
    code: `- from:
    uri: "some:source"
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

export const ToSinkNamesSuggestions = {
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
              uri: `,
    sinkConnectorsNames: ["myFirstSinkName", "mySecondSinkName"],
  },
};
