import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { guestLogIn } from '../../store/actions/auth';

import {
    fetchProfile,
    loadMyEvents,
    loadMyTrashPoints,
    loadMyTrashPointsError,
    loadMyEventsError,
} from '../../store/actions/profile';

import { fetchUserLocation } from '../../store/actions/locations';

import {
    getProfileEntity,
    isAuthenticated,
    isGuestSession,
    getUserCountry,
    loadMyEventsEntity,
    loadMyEventsErrorEntity,
    loadMyTrashPointsEntity,
    loadMyTrashPointsErrorEntity,
    getMyEventsPageSize,
    getMyEventsPageNumber,
    getMyTrashpointsPageSize,
    getMyTrashpointsPageNumber,
} from '../../store/selectors';

import Component from './Profile';

const selector = createStructuredSelector({
  profile: getProfileEntity,
  country: getUserCountry,
  eventsPageSize: getMyEventsPageSize,
  eventsPageNumber: getMyEventsPageNumber,
  trashpointsPageSize: getMyTrashpointsPageSize,
  trashpointsPageNumber: getMyTrashpointsPageNumber,
  myEvents: loadMyEventsEntity,
  myEventsError: loadMyEventsErrorEntity,
  myTrashPoints: loadMyTrashPointsEntity,
  myTrashPointsError: loadMyTrashPointsErrorEntity,
  isAuthenticated,
  isGuestSession,
});

const actions = {
  onFetchProfile: fetchProfile,
  onGuestLogIn: guestLogIn,
  onLoadMyEvents: loadMyEvents,
  onLoadMyTrashPoints: loadMyTrashPoints,
  onLoadMyTrashPointsError: loadMyTrashPointsError,
  onLoadMyEventsError: loadMyEventsError,
};

export default connect(selector, actions)(Component);
