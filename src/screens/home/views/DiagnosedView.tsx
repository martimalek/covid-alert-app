import React from 'react';
import {useI18n} from 'locale';
import {Text} from 'components';
import {ExposureStatusType, useExposureStatus} from 'services/ExposureNotificationService';
import {daysBetween, getCurrentDate} from 'shared/date-fns';
import {pluralizeKey} from 'shared/pluralization';
import {useStorage} from 'services/StorageService';
import {useAccessibilityAutoFocus} from 'shared/useAccessibilityAutoFocus';
import {isRegionActive} from 'shared/RegionLogic';
import {useRegionalI18n} from 'locale/regional';

import {BaseHomeView} from '../components/BaseHomeView';
import {Tip} from '../components/Tip';

export const DiagnosedView = ({isBottomSheetExpanded}: {isBottomSheetExpanded: boolean}) => {
  const i18n = useI18n();
  const regionalI18n = useRegionalI18n();
  const {region} = useStorage();
  const [exposureStatus] = useExposureStatus();
  const autoFocusRef = useAccessibilityAutoFocus(!isBottomSheetExpanded);

  if (exposureStatus.type !== ExposureStatusType.Diagnosed) return null;

  const daysLeft = daysBetween(getCurrentDate(), new Date(exposureStatus.cycleEndsAt)) - 1;

  return (
    <BaseHomeView iconName="hand-thank-you-with-love" testID="diagnosed">
      <Text focusRef={autoFocusRef} variant="bodyTitle" color="bodyText" marginBottom="m" accessibilityRole="header">
        {i18n.translate('Home.DiagnosedView.Title')}
        {/* No exposure detected */}
      </Text>
      {daysLeft < 1 ? null : (
        <>
          <Text variant="bodyText" color="bodyText" marginBottom="m">
            {i18n.translate(pluralizeKey('Home.DiagnosedView.Body1', daysLeft), {number: daysLeft})}
          </Text>
          <Text variant="bodyText" color="bodyText" marginBottom="m">
            {i18n.translate('Home.DiagnosedView.Body2')}
          </Text>
          <Text variant="bodyText" color="bodyText" marginBottom="m">
            {i18n.translate('Home.DiagnosedView.Body3')}
          </Text>
          {isRegionActive(region, regionalI18n.activeRegions) ? <Tip /> : null}
        </>
      )}
    </BaseHomeView>
  );
};
