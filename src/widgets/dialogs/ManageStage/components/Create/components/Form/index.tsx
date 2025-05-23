import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, Grid, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import React from 'react';
import { TabPanel } from '../../../../../../../components/TabPanel';
import { useHandleEditorSave } from '../../../../../../../hooks/useHandleEditorSave';
import { useStepperContext } from '../../../../../../../providers/Stepper/hooks';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { FORM_STEPPER, FORM_STEPPER_STEPS } from '../../../../constants';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { STAGE_FORM_BACKWARD_NAME_MAPPING, STAGE_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import {
  CleanTemplate,
  Cluster,
  DeployTemplate,
  Description,
  Namespace,
  QualityGates,
  StageName,
  TriggerType,
} from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
  const {
    props: { otherStages },
  } = useCurrentDialog();
  const { getValues, setValue, resetField } = useTypedFormContext();

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: STAGE_FORM_NAMES,
    backwardNames: STAGE_FORM_BACKWARD_NAME_MAPPING,
    setValue: setValue as (name: string, value: any, options?: any) => void,
    resetField: resetField as (name: string) => void,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: KubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
      handleEditorSave(editorReturnValues, usedValues);
      handleCloseEditor();
    },
    [getValues, handleCloseEditor, handleEditorSave]
  );

  const otherStagesNames = React.useMemo(
    () => otherStages.map(({ spec: { name } }) => name),
    [otherStages]
  );

  const theme = useTheme();

  const { activeStep } = useStepperContext();

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ pt: theme.typography.pxToRem(24) }}>
          <Stepper activeStep={activeStep}>
            {FORM_STEPPER_STEPS.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <Box sx={{ p: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(8)}` }}>
          <TabPanel value={activeStep} index={FORM_STEPPER.CONFIGURATION.idx}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Cluster />
              </Grid>
              <Grid item xs={6}>
                <StageName otherStagesNames={otherStagesNames} />
              </Grid>
              <Grid item xs={6}>
                <Namespace />
              </Grid>
              <Grid item xs={6}>
                <Description />
              </Grid>
              <Grid item xs={6}>
                <TriggerType />
              </Grid>
              <Grid item xs={6}>
                <DeployTemplate />
              </Grid>
              <Grid item xs={6}>
                <CleanTemplate />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={activeStep} index={FORM_STEPPER.QUALITY_GATES.idx}>
            <QualityGates />
          </TabPanel>
        </Box>
      </Stack>
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
