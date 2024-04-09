import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { createCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/createCDPipelineInstance';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../../../types/forms';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../../CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../../CreateEditStage/types';
import {
  FORM_PART_APPLICATIONS,
  FORM_PART_PIPELINE,
  FORM_PART_STAGES,
  TAB_INDEXES,
} from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../types';
import { Applications, PipelineName, Stages } from '../../../fields';
import { FormProps } from './types';

export const Form = ({
  formActiveTabIdx,
  editorOpen,
  editorData,
  setEditorOpen,
  stages,
  setStages,
}: FormProps) => {
  const { setDialog } = useDialogContext();
  const { getValues, setValue, resetField } = useFormContext<CreateEditCDPipelineFormValues>();

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: CDPIPELINE_FORM_NAMES,
    setValue,
    resetField,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: KubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
      handleEditorSave(editorReturnValues, usedValues);
      handleCloseEditor();
    },
    [getValues, handleCloseEditor, handleEditorSave]
  );

  const onPipelineNameChange = React.useCallback(
    (pipelineNameFieldValue) => {
      if (!stages.length) {
        return;
      }

      const updatedStagesWithNewPipelineName = stages.map((el) => ({
        ...el,
        metadata: {
          ...el.metadata,
          name: `${pipelineNameFieldValue}-${el.spec.name}`,
        },
        spec: {
          ...el.spec,
          cdPipeline: pipelineNameFieldValue,
        },
      }));

      setStages(updatedStagesWithNewPipelineName);
    },
    [setStages, stages]
  );

  const handleDeleteStage = React.useCallback(
    (idx: number) => {
      setStages((prev) =>
        prev
          .map((el, prevElIndex) => {
            if (idx !== prevElIndex) {
              return el;
            }
          })
          .filter(Boolean)
      );
    },
    [setStages]
  );

  const handleClickAddStage = React.useCallback(() => {
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
    const newCDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
    const createStageDialogForwardedProps: CreateEditStageDialogForwardedProps = {
      CDPipelineData: newCDPipelineData,
      otherStages: stages,
      mode: FORM_MODES.CREATE,
      handleApply: ({ CDPipelineStageData }) => {
        setStages((prev) => [...prev, CDPipelineStageData]);
      },
    };
    setDialog({
      modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
      forwardedProps: createStageDialogForwardedProps,
    });
  }, [getValues, setDialog, setStages, stages]);

  return (
    <>
      <TabPanel value={formActiveTabIdx} index={TAB_INDEXES[FORM_PART_PIPELINE]} shouldRender>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PipelineName onPipelineNameChange={onPipelineNameChange} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={formActiveTabIdx} index={TAB_INDEXES[FORM_PART_APPLICATIONS]} shouldRender>
        <Applications />
      </TabPanel>
      <TabPanel value={formActiveTabIdx} index={TAB_INDEXES[FORM_PART_STAGES]} shouldRender>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stages
              stages={stages}
              handleDeleteStage={handleDeleteStage}
              handleClickAddStage={handleClickAddStage}
            />
          </Grid>

          {stages && !stages.length ? (
            <Grid item xs={12}>
              <Alert severity="info" variant="outlined">
                Add at least one stage
              </Alert>
            </Grid>
          ) : null}
        </Grid>
      </TabPanel>
      {editorOpen && (
        <EditorDialog
          open={editorOpen}
          item={editorData}
          onClose={handleCloseEditor}
          onSave={onEditorSave}
        />
      )}
    </>
  );
};
