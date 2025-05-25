import type { Group, User, Error, NewGroup, UpdateGroup } from '../../../types/api';
import { QUERY_KEYS } from '../constants';
import { useApiMutate, type UseApiMutateResult } from '../use-api-mutate';
import { useApiQuery, type UseApiQueryResult } from '../use-api-query';

// Get group details
export const useApiGroupQuery = (groupId: string): UseApiQueryResult<{ group: Group }, Error> => {
  return useApiQuery<{ group: Group }, never, Error>({
    queryKey: QUERY_KEYS.GROUPS.single(groupId),
    path: `/groups/${groupId}`,
    enabled: !!groupId,
  });
};

// Create group
export const useApiCreateGroupMutation = (): UseApiMutateResult<{ message: string; group: Group }, NewGroup, Error> => {
  return useApiMutate({
    path: '/groups',
    method: 'POST',
  });
};

// Update group
export const useApiUpdateGroupMutation = (
  groupId: string
): UseApiMutateResult<{ message: string; group: Group }, UpdateGroup, Error> => {
  return useApiMutate({
    path: `/groups/${groupId}`,
    method: 'PATCH',
  });
};

// Get group users
export const useApiGroupUsersQuery = (groupId: string): UseApiQueryResult<{ users: User[] }, Error> => {
  return useApiQuery<{ users: User[] }, never, Error>({
    queryKey: QUERY_KEYS.GROUPS.users(groupId),
    path: `/groups/${groupId}/users`,
    enabled: !!groupId,
  });
};

// Invite user to group
export const useApiInviteUserToGroupMutation = (
  groupId: string
): UseApiMutateResult<{ message: string }, { email: string }, Error> => {
  return useApiMutate({
    path: `/groups/${groupId}/users`,
    method: 'POST',
  });
};
