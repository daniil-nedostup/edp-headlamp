import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { FilterContextProvider } from '../../../../providers/Filter/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionsToCheckConfig } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <FilterContextProvider
            entityID={`PIPELINE_LIST::${getDefaultNamespace()}`}
            matchFunctions={null}
          >
            <PageView />
          </FilterContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
