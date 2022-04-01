import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  TextInput,
} from "@patternfly/react-core";
import { BaseAction } from "../../../../../openapi/generated";

interface ActionEditProps {
  action?: BaseAction;
  onChange: (action: BaseAction) => void;
}

const ActionEdit = (props: ActionEditProps) => {
  const { action, onChange } = props;
  const [type, setType] = useState(action?.type ?? "");
  const [parameters, setParameters] = useState(action?.parameters ?? {});

  const updateType = (type: string) => {
    setType(type);
    onChange({
      type,
      parameters,
    });
  };

  const updateConfiguration = (parameters: BaseAction["parameters"]) => {
    setParameters(parameters);
    onChange({
      type,
      parameters,
    });
  };

  useEffect(() => {
    if (action) {
      setType(action.type);
      setParameters(action.parameters);
    }
  }, [action]);

  const { t } = useTranslation(["openbridgeTempDictionary"]);

  const actionTypes = [
    {
      value: "",
      label: t("processor.selectAction"),
      isPlaceholder: true,
    },
    {
      value: "KafkaTopic",
      label: t("processor.sendToKafka"),
      isPlaceholder: false,
    },
    {
      value: "Webhook",
      label: t("common.webhook"),
      isPlaceholder: false,
    },
    {
      value: "SendToBridge",
      label: t("processor.sendToBridge"),
      isPlaceholder: false,
    },
    {
      value: "Slack",
      label: t("processor.sendToSlack"),
      isPlaceholder: false,
    },
  ];

  return (
    <>
      <FormGroup
        fieldId={`action-type`}
        label={t("processor.actionType")}
        isRequired={true}
      >
        <FormSelect
          id={`action-type`}
          aria-label={t("processor.actionType")}
          isRequired={true}
          value={type}
          onChange={(type) => updateType(type)}
        >
          {actionTypes.map((option, index) => (
            <FormSelectOption
              key={index}
              value={option.value}
              label={option.label}
              isPlaceholder={option.isPlaceholder}
            />
          ))}
        </FormSelect>
      </FormGroup>
      {type === "" && (
        <FormGroup
          fieldId={`action-config`}
          label={t("processor.actionConfiguration")}
        >
          <TextInput
            type="text"
            id="action-config"
            name="action-config"
            aria-describedby="action-config"
            isDisabled={true}
          />
        </FormGroup>
      )}
      {type === "KafkaTopic" && (
        <FormGroup
          fieldId={`kafka-topic`}
          label={t("common.kafkaTopic")}
          isRequired={true}
        >
          <TextInput
            type="text"
            id="kafka-topic"
            name="kafka-topic"
            aria-describedby="kafka-topic"
            isRequired={true}
            value={parameters.topic}
            onChange={(value) => {
              updateConfiguration({
                ...parameters,
                topic: value,
              });
            }}
          />
        </FormGroup>
      )}
      {type === "Webhook" && (
        <FormGroup
          fieldId={`webhook-endpoint`}
          label={t("common.endpoint")}
          isRequired={true}
        >
          <TextInput
            type="url"
            id="webhook-endpoint"
            name="webhook-endpoint"
            aria-describedby="webhook-endpoint"
            isRequired={true}
            value={parameters.endpoint}
            onChange={(value) => {
              updateConfiguration({
                ...parameters,
                endpoint: value,
              });
            }}
          />
        </FormGroup>
      )}
      {type === "SendToBridge" && (
        <FormGroup
          fieldId={`bridge-id`}
          label={t("instance.instanceId")}
          isRequired={true}
        >
          <TextInput
            type="text"
            id="bridge-id"
            name="bridge-id"
            aria-describedby="bridge-id"
            isRequired={true}
            value={parameters.bridgeId}
            onChange={(value) => {
              updateConfiguration({
                ...parameters,
                bridgeId: value,
              });
            }}
          />
        </FormGroup>
      )}
      {type === "Slack" && (
        <>
          <FormGroup
            fieldId={`slack-channel`}
            label={t("processor.slackChannel")}
            isRequired={true}
          >
            <TextInput
              type="text"
              id="slack-channel"
              name="slack-channel"
              aria-describedby="slack-channel"
              isRequired={true}
              value={parameters.channel}
              onChange={(value) => {
                updateConfiguration({
                  ...parameters,
                  channel: value,
                });
              }}
            />
          </FormGroup>
          <FormGroup
            fieldId={`slack-webhook-url`}
            label={t("processor.slackWebhookUrl")}
            isRequired={true}
          >
            <TextInput
              type="url"
              id="slack-webhook-url"
              name="slack-webhook-url"
              aria-describedby="slack-webhook-url"
              isRequired={true}
              value={parameters.webhookUrl}
              onChange={(value) => {
                updateConfiguration({
                  ...parameters,
                  webhookUrl: value,
                });
              }}
            />
          </FormGroup>
        </>
      )}
    </>
  );
};

export default ActionEdit;