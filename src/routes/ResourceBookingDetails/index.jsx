/**
 * ResourceBookingDetails
 *
 * Page for resource booking details.
 * It gets `teamId` and `resourceBookingId` from the router.
 */
import React, { useMemo, useState, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import { getReourceBookingById } from "services/resourceBookings";
import { getTeamById } from "services/teams";
import {getJobById } from "services/jobs";
import {useAsync} from 'react-use';
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import Button from "../../components/Button";
import ResourceSummary from "./ResourceSummary";
import ResourceDetails from "./ResourceDetails";
import "./styles.module.scss";

const ResourceBookingDetails = ({ teamId, resourceBookingId }) => {
  // const [rb, loadingError] = useData(getReourceBookingById, resourceBookingId);
  const [rb, setRb] = useState(null)
  const [loadingError, setLoadingError] = useState(null)
  const [jobTitle, setJobTitle] = useState('<Not Assigned>')
  // const [team, loadingTeamError] = useData(getTeamById, teamId);
  // const [team, setTeam] = useState(null)
  // const rb = null
  useAsync(async () => {
    try {
      const { data } = await getReourceBookingById(resourceBookingId)
      debugger;
      setRb(data)
    } catch (e) {
      setLoadingError(e.message)
    }
    }, [resourceBookingId]);

  useAsync(async () => {
      debugger; 
    if (rb) {
      if (rb.jobId) {
      const {data} = await getJobById(rb.jobId)
        setJobTitle(data.title)
        return data.title
      }else {
        return '<Not Assigned>'
      }
      return data
    }
    }, [rb]);

  const member = useMemo(() => {
    if (team) {
      const resource = _.find(
        team.resources,
        (r) => r.id === resourceBookingId
      );
      let job;
      if (resource.jobId) {
        job = _.find(team.jobs, { id: resource.jobId });
      }
      resource.jobTitle = _.get(job, "title", "<Not Assigned>");
      return resource;
    }
  }, [team, resourceBookingId]);

  return (
    <Page title="Member Details">
      {!rb ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader
            title="Member Details"
            backTo={`/taas/myteams/${teamId}`}
          />
          <div styleName="content-wrapper">
            {/* <ResourceSummary candidate={member} /> */}
            <ResourceDetails resource={{ ...rb, title: jobTitle }} />
            <div styleName="actions">
              <Button
                size="medium"
                routeTo={`/taas/myteams/${teamId}/rb/${rb.id}/edit`}
              >
                Edit Member Details
              </Button>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

ResourceBookingDetails.propTypes = {
  teamId: PT.string,
  resourceBookingId: PT.string,
};

export default withAuthentication(ResourceBookingDetails);
