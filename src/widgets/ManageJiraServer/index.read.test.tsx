/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { JiraCISecretWithOwnerMock } from '../../k8s/groups/default/Secret/mocks/jira-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { JiraServerMock } from '../../k8s/groups/EDP/JiraServer/mocks/jira-server.mock';
import { JiraServerKubeObjectInterface } from '../../k8s/groups/EDP/JiraServer/types';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { ManageJiraServer } from './index';

test('renders ManageJiraServer Edit component (read-only)', () => {
  const ownerReference = JiraCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageJiraServer
        secret={JiraCISecretWithOwnerMock as unknown as SecretKubeObjectInterface}
        jiraServer={JiraServerMock as JiraServerKubeObjectInterface}
        ownerReference={ownerReference}
        permissions={{
          create: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            JiraServer: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          update: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            JiraServer: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          delete: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
        }}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
