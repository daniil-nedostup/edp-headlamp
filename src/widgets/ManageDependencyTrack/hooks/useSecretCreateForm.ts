import React from 'react';
import { useForm } from 'react-hook-form';
import { useSecretCRUD } from '../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { createDependencyTrackIntegrationSecretInstance } from '../../../k8s/groups/default/Secret/utils/createDependencyTrackIntegrationSecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { IntegrationSecretFormValues, WidgetPermissions } from '../types';

export const useSecretCreateForm = ({
  handleClosePanel,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  permissions: WidgetPermissions;
}): FormItem => {
  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClosePanel,
  });

  const form = useForm<IntegrationSecretFormValues>();

  const handleSubmit = React.useCallback(
    async (values: IntegrationSecretFormValues) => {
      if (!permissions.create.Secret.allowed) {
        return false;
      }

      const secretInstance = createDependencyTrackIntegrationSecretInstance(values);

      await createSecret({ secretData: secretInstance });
    },
    [createSecret, permissions.create.Secret.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: secretCreateMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.create.Secret.allowed,
        reason: permissions.create.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      secretCreateMutation.isLoading,
      permissions.create.Secret.allowed,
      permissions.create.Secret.reason,
    ]
  );
};
