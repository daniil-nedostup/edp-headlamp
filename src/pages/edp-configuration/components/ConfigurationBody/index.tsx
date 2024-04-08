import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { menu } from '../../menu';
import { ConfigurationBodyProps } from './types';

export const ConfigurationBody = ({
  pageData,
  renderPlaceHolderData,
  emptyMessage,
  blocker,
  items,
  bodyOnly = false,
  onlyOneItem = false,
  error,
}: ConfigurationBodyProps) => {
  const { label, description, docUrl } = pageData || {};
  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleClosePlaceholder = () => {
    setExpandedPanel(null);
  };

  const isLoading = items === null;
  const singleItem = items?.length === 1;

  const showInitialPlaceholder = items?.length === 0;

  const placeholderData = React.useMemo(() => {
    if (isLoading || error || !renderPlaceHolderData) {
      return null;
    }

    return !onlyOneItem || showInitialPlaceholder
      ? renderPlaceHolderData({ handleClosePlaceholder })
      : null;
  }, [error, isLoading, onlyOneItem, renderPlaceHolderData, showInitialPlaceholder]);

  return (
    <ConditionalWrapper
      condition={!bodyOnly}
      wrapper={(children) => (
        <PageWithSubMenu list={menu}>
          <PageWrapper containerMaxWidth={'xl'}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant={'h1'} gutterBottom>
                  {label}
                </Typography>
                <Typography variant={'body1'}>
                  {description} {!!docUrl && <LearnMoreLink url={docUrl} />}
                </Typography>
              </Grid>
              {children}
            </Grid>
          </PageWrapper>
        </PageWithSubMenu>
      )}
    >
      <Grid item xs={12}>
        <LoadingWrapper isLoading={isLoading}>
          <Grid container spacing={2}>
            {!!blocker && (
              <Grid item xs={12}>
                {blocker}
              </Grid>
            )}
            {!blocker && (
              <>
                {!!placeholderData && (
                  <Grid item xs={12}>
                    <CreateItemAccordion
                      isExpanded={expandedPanel === 'placeholder' || onlyOneItem}
                      onChange={handleChange('placeholder')}
                      disabled={placeholderData?.disabled}
                      title={placeholderData?.title}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          {placeholderData?.component}
                        </Grid>
                      </Grid>
                    </CreateItemAccordion>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {error ? (
                      <ErrorContent error={error} outlined />
                    ) : isLoading ? (
                      <Grid item xs={12}>
                        <Grid container justifyContent={'center'}>
                          <Grid item>
                            <CircularProgress />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : items && items.length ? (
                      items.map((configurationItem) => {
                        const key = configurationItem?.id;
                        const ownerReference = configurationItem?.ownerReference;

                        return (
                          <Grid item xs={12} key={key}>
                            <Accordion
                              expanded={singleItem ? true : expandedPanel === key}
                              onChange={handleChange(key)}
                            >
                              <AccordionSummary
                                expandIcon={singleItem ? null : <Icon icon={ICONS.ARROW_DOWN} />}
                                style={{
                                  cursor: singleItem ? 'default' : 'pointer',
                                }}
                              >
                                <Grid container spacing={3} alignItems={'center'}>
                                  <Grid item xs={12}>
                                    <Typography variant={'h6'} component="div">
                                      {configurationItem.title}
                                    </Typography>
                                  </Grid>
                                  {!!ownerReference && (
                                    <Grid item>
                                      <Tooltip title={`Managed by ${ownerReference}`}>
                                        <Icon
                                          icon={ICONS.CLOUD_LOCK}
                                          width={20}
                                          style={{
                                            display: 'block',
                                          }}
                                        />
                                      </Tooltip>
                                    </Grid>
                                  )}
                                </Grid>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    {configurationItem.component}
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        );
                      })
                    ) : (
                      <Grid item xs={12}>
                        <EmptyContent color={'textSecondary'}>{emptyMessage}</EmptyContent>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </LoadingWrapper>
      </Grid>
    </ConditionalWrapper>
  );
};
