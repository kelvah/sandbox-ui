import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionGroup,
  Button,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormSection,
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  TextInput,
  Tile,
} from "@patternfly/react-core";
import FiltersEdit, {
  EventFilter,
} from "@app/Processor/ProcessorEdit/FiltersEdit/FiltersEdit";
import { CodeEditor } from "@patternfly/react-code-editor";
import ActionEdit from "@app/Processor/ProcessorEdit/ActionEdit/ActionEdit";
import { BaseAction } from "../../../../openapi/generated";
import SourceEdit from "@app/Processor/ProcessorEdit/SourceEdit/SourceEdit";
import "./ProcessorEdit.css";

interface ProcessorEditProps {
  onSave: () => void;
  onCancel: () => void;
}

const ProcessorEdit = (props: ProcessorEditProps) => {
  const { onSave, onCancel } = props;
  const [processorType, setProcessorType] = useState("");
  const [filters, setFilters] = useState<EventFilter[]>([
    { key: "", type: "", value: "" },
  ]);
  const [transformation, setTransformation] = useState("");
  const [action, setAction] = useState<BaseAction>({
    type: "",
    parameters: {},
  });
  const [source, setSource] = useState({
    type: "",
    parameters: {},
  });

  const { t } = useTranslation();

  return (
    <>
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: "noPadding" }}
        className="processor-edit__page-section"
      >
        <section className={"processor-edit__container"}>
          <Flex direction={{ default: "column" }} style={{ height: "100%" }}>
            <Flex
              direction={{ default: "column" }}
              grow={{ default: "grow" }}
              flexWrap={{ default: "nowrap" }}
              className={"processor-edit__outer-wrap"}
            >
              <Flex
                direction={{ default: "column" }}
                grow={{ default: "grow" }}
                className={"processor-edit__inner-wrap"}
              >
                <FlexItem
                  grow={{ default: "grow" }}
                  className={"processor-edit__content-wrap"}
                >
                  <Form className={"processor-edit__form"}>
                    <FormSection
                      title={t(
                        "openbridgeTempDictionary:processor:generalInformation"
                      )}
                      titleElement="h2"
                    >
                      <FormGroup
                        label={t(
                          "openbridgeTempDictionary:processor:selectProcessorType"
                        )}
                        fieldId={"processor-type"}
                        isRequired
                      >
                        <Grid
                          hasGutter={true}
                          className={"processor-form__type-selection"}
                        >
                          <GridItem span={6}>
                            <Tile
                              title={t(
                                "openbridgeTempDictionary:processor:sourceProcessor"
                              )}
                              isSelected={processorType === "source"}
                              style={{ height: "100%" }}
                              onClick={() => setProcessorType("source")}
                            >
                              {t(
                                "openbridgeTempDictionary:processor:sourceProcessorDescription"
                              )}
                            </Tile>
                          </GridItem>
                          <GridItem span={6}>
                            <Tile
                              title={t(
                                "openbridgeTempDictionary:processor:sinkProcessor"
                              )}
                              style={{ width: "100%", height: "100%" }}
                              isSelected={processorType === "sink"}
                              onClick={() => setProcessorType("sink")}
                            >
                              {t(
                                "openbridgeTempDictionary:processor:sinkProcessorDescription"
                              )}
                            </Tile>
                          </GridItem>
                        </Grid>
                      </FormGroup>
                      <FormGroup
                        fieldId={"processor-name"}
                        label={t(
                          "openbridgeTempDictionary:processor:processorName"
                        )}
                        isRequired={true}
                      >
                        <TextInput
                          type="text"
                          id="processor-name"
                          name="processor-name"
                          aria-describedby="processor-name"
                          isRequired={true}
                          maxLength={255}
                        />
                      </FormGroup>
                    </FormSection>
                    {processorType !== "" && (
                      <>
                        {processorType === "source" && (
                          <FormSection
                            title={t(
                              "openbridgeTempDictionary:processor:source"
                            )}
                          >
                            <TextContent>
                              <Text component="p">
                                {t(
                                  "openbridgeTempDictionary:processor:selectProcessorTypeDescription"
                                )}
                              </Text>
                            </TextContent>
                            <SourceEdit source={source} onChange={setSource} />
                          </FormSection>
                        )}

                        <FormSection
                          title={t(
                            "openbridgeTempDictionary:processor:filters"
                          )}
                          titleElement="h2"
                        >
                          <FiltersEdit
                            filters={filters}
                            onChange={setFilters}
                          />
                        </FormSection>
                        <FormSection
                          title={t(
                            "openbridgeTempDictionary:processor:transformation"
                          )}
                        >
                          <TextContent>
                            <Text component="p">
                              {t(
                                "openbridgeTempDictionary:processor:addTransformationDescription"
                              )}
                            </Text>
                          </TextContent>
                          <CodeEditor
                            id={"transformation-template"}
                            height={"300px"}
                            isLineNumbersVisible={true}
                            code={transformation}
                            onChange={setTransformation}
                            options={{
                              scrollbar: { alwaysConsumeMouseWheel: false },
                            }}
                          />
                        </FormSection>
                        {processorType === "sink" && (
                          <FormSection
                            title={t(
                              "openbridgeTempDictionary:processor:action"
                            )}
                          >
                            <TextContent>
                              <Text component="p">
                                {t(
                                  "openbridgeTempDictionary:processor:selectActionDescription"
                                )}
                              </Text>
                            </TextContent>
                            <ActionEdit action={action} onChange={setAction} />
                          </FormSection>
                        )}
                      </>
                    )}
                  </Form>
                </FlexItem>
              </Flex>
              <Flex
                flexWrap={{ default: "wrap" }}
                shrink={{ default: "shrink" }}
              >
                <ActionGroup className={"processor-edit__actions"}>
                  <Button variant="primary" onClick={onSave}>
                    {t("openbridgeTempDictionary:common:create")}
                  </Button>
                  <Button variant="link" onClick={onCancel}>
                    {t("openbridgeTempDictionary:common:cancel")}
                  </Button>
                </ActionGroup>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </PageSection>
    </>
  );
};

export default ProcessorEdit;
