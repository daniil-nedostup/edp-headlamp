import { Dialog, useTheme } from '@mui/material';
import React from 'react';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from './constants';
import { CreateEditCodebaseDialogForwardedProps } from './types';

export const CreateEditCodebase = () => {
  const theme = useTheme();

  const {
    open,
    forwardedProps: { mode },
  } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
    CREATE_EDIT_CODEBASE_DIALOG_NAME
  );

  return (
    <Dialog
      open={open}
      maxWidth={'sm'}
      fullWidth
      data-testid="dialog"
      PaperProps={{ sx: { maxWidth: theme.typography.pxToRem(648) } }}
    >
      {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
    </Dialog>
  );
};
