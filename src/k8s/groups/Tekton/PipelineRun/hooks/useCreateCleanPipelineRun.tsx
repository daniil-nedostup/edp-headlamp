import React from 'react';
import { Snackbar } from '../../../../../components/Snackbar';
import { CRUD_TYPE } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { routePipelineRunDetails } from '../../../../../pages/pipelines/pages/pipeline-run-details/route';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';

export interface CreateCleanPipelineRunProps {
  cleanPipelineRun: PipelineRunKubeObjectInterface;
}

export const useCreateCleanPipelineRun = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
  const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

  const cleanPipelineRunCreateMutation = useResourceCRUDMutation<
    PipelineRunKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('cleanPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPE.CREATE, {
    createCustomMessages: (item) => ({
      onMutate: {
        message: 'Creating clean PipelineRun',
      },
      onError: {
        message: 'Failed to create clean PipelineRun',
      },
      onSuccess: {
        message: 'Start cleaning application(s)',
        options: {
          autoHideDuration: 8000,
          content: (key, message) => (
            <Snackbar
              text={String(message)}
              snackbarKey={key}
              pushLocation={{
                href: {
                  routeName: routePipelineRunDetails.path,
                  params: {
                    namespace: item.metadata.namespace || getDefaultNamespace(),
                    name: item.metadata.name,
                  },
                },
                text: 'Check status',
              }}
              variant={'success'}
            />
          ),
        },
      },
    }),
  });

  const createCleanPipelineRun = React.useCallback(
    async ({ cleanPipelineRun }: CreateCleanPipelineRunProps) => {
      cleanPipelineRunCreateMutation.mutate(cleanPipelineRun, {
        onSuccess: () => {
          invokeOnSuccessCallback();
        },
        onError: () => {
          invokeOnErrorCallback();
        },
      });
    },
    [cleanPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
  );

  const mutations = {
    cleanPipelineRunCreateMutation,
  };

  return { createCleanPipelineRun, mutations };
};
