import React, { useState, useEffect } from 'react';
import { authenticationService } from '@/_services';
import { CustomSelect } from './CustomSelect';
import { getWorkspaceIdFromURL, appendWorkspaceId, getAvatar } from '../../_helpers/utils';

export const OrganizationList = function () {
  const { current_organization_id } = authenticationService.currentSessionValue;
  const [organizationList, setOrganizationList] = useState([]);
  const [getOrgStatus, setGetOrgStatus] = useState('');
  const darkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    setGetOrgStatus('loading');
    const sessionObservable = authenticationService.currentSession.subscribe((newSession) => {
      setOrganizationList(newSession.organizations ?? []);
      if (newSession.organizations?.length > 0) setGetOrgStatus('success');
    });

    () => sessionObservable.unsubscribe();
  }, []);

  const switchOrganization = (orgId) => {
    if (getWorkspaceIdFromURL() !== orgId) {
      const newPath = appendWorkspaceId(orgId, location.pathname, true);
      window.history.replaceState(null, null, newPath);
      window.location.reload();
    }
  };

  const options = organizationList.map((org) => ({
    value: org.id,
    name: org.name,
    label: (
      <div className={`align-items-center d-flex tj-org-dropdown  ${darkMode && 'dark-theme'}`}>
        <div className="dashboard-org-avatar " data-cy={`${org.name}-avatar`}>
          {getAvatar(org.name)}
        </div>
        <div className="org-name">{org.name}</div>
      </div>
    ),
  }));

  return (
    <div className="org-select-container">
      <CustomSelect
        isLoading={getOrgStatus === 'loading'}
        options={options}
        value={current_organization_id}
        onChange={(id) => switchOrganization(id)}
        className={`tj-org-select  ${darkMode && 'dark-theme'}`}
      />
    </div>
  );
};
