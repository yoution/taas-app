/**
 * Team access page actions
 */

import {
  getTeamMembers,
  getTeamInvitees,
  deleteTeamMember,
  deleteInvite,
} from "services/teams";

export const ACTION_TYPE = {
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_PENDING: "LOAD_MEMBERS_PENDING",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS",
  LOAD_MEMBERS_ERROR: "LOAD_MEMBERS_ERROR",
  LOAD_INVITES: "LOAD_INVITES",
  LOAD_INVITES_PENDING: "LOAD_INVITES_PENDING",
  LOAD_INVITES_SUCCESS: "LOAD_INVITES_SUCCESS",
  LOAD_INVITES_ERROR: "LOAD_INVITES_ERROR",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  REMOVE_MEMBER_PENDING: "REMOVE_MEMBER_PENDING",
  REMOVE_MEMBER_SUCCESS: "REMOVE_MEMBER_SUCCESS",
  REMOVE_MEMBER_ERROR: "REMOVE_MEMBER_ERROR",
  REMOVE_INVITE: "REMOVE_INVITE",
  REMOVE_INVITE_PENDING: "REMOVE_INVITE_PENDING",
  REMOVE_INVITE_SUCCESS: "REMOVE_INVITE_SUCCESS",
  REMOVE_INVITE_ERROR: "REMOVE_INVITE_ERROR",
  CLEAR_ALL: "CLEAR_ALL",
};

/**
 * Loads team members
 *
 * @param {string|number} teamId
 *
 * @returns {Promise} loaded members or error
 */
export const loadMembers = (teamId) => ({
  type: ACTION_TYPE.LOAD_MEMBERS,
  payload: async () => {
    const res = await getTeamMembers(teamId);
    return res.data;
  },
  meta: {
    teamId,
  },
});

/**
 * Loads team invites
 *
 * @param {string|number} teamId
 *
 * @returns {Promise} loaded invitees or error
 */
export const loadInvites = (teamId) => ({
  type: ACTION_TYPE.LOAD_INVITES,
  payload: async () => {
    const res = await getTeamInvitees(teamId);
    return res.data;
  },
  meta: {
    teamId,
  },
});

/**
 * Clear team members state
 */
export const clearAll = () => ({
  type: ACTION_TYPE.CLEAR_ALL,
});

/**
 * Removes a team member
 *
 * @param {string|number} teamId
 * @param {string|number} memberId
 *
 * @returns {Promise} deleted member's id or error
 */
export const removeTeamMember = (teamId, memberId) => ({
  type: ACTION_TYPE.REMOVE_MEMBER,
  payload: async () => {
    const res = await deleteTeamMember(teamId, memberId);
    return res.data;
  },
  meta: {
    teamId,
    memberId,
  },
});

/**
 * Removes an invite
 *
 * @para {string|number} teamId
 * @param {string|number} REMOVE_INVITE_PENDING
 */
export const removeInvite = (teamId, inviteId) => ({
  type: ACTION_TYPE.REMOVE_INVITE,
  payload: async () => {
    const res = await deleteInvite(teamId, inviteId);
    return res.data;
  },
  meta: {
    teamId,
    inviteId,
  },
});
