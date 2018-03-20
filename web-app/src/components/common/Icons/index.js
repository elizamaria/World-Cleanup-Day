import React from 'react';

import bin from '../../../assets/ic-trashpoint-active-copy.png';
import arrowDown from '../../../assets/arrow-drop-down-blue.png';
import events from '../../../assets/events.png';
import location from '../../../assets/ic-location.png';
import locationBlue from '../../../assets/ic-location-ev.png';
import locationBlack24px from '../../../assets/icLocationOnBlack24Px.png';
import locationPinActive from '../../../assets/icLocationPinActive.png';
import locationPinInactive from '../../../assets/icLocationPinInactive.png';
import groupBlack24px from '../../../assets/icGroupBlack24Px.png';
import hidePanel from '../../../assets/hide-panel.png';
import fb from '../../../assets/ic-facebook-active.png';
import google from '../../../assets/ic-google-plus-active.png';
import share from '../../../assets/share.png';
import participants from '../../../assets/ic-participant.png';
import close from '../../../assets/ic-close.png';
import date from '../../../assets/ic-date.png';
import report from '../../../assets/ic-report.png';
import email from '../../../assets/ic-email.png';
import phone from '../../../assets/ic-phone.png';
import userpicHolder from '../../../assets/placeholder-userpic.png';

export const BinIcon = () => <img src={bin} alt="bin-icon" />;
export const ArrowDownIcon = () => <img src={arrowDown} alt="arrowdown-icon" />;
export const EventsIcon = () => <img src={events} alt="events-icon" />;
export const LocationIcon = () => <img src={location} alt="location-icon" />;
export const LocationIconEvent = () => <img src={locationBlue} alt="location-icon-ev" />;
export const LocationPinActive = () => <img src={locationPinActive} alt="location-pin-a" />;
export const LocationPinInactive = () => <img src={locationPinActive} alt="location-pin-ina" />;
export const LocationIcon24px = () => <img src={locationBlack24px} alt="location-icon-black" />;
export const GroupIcon24px = () => <img src={groupBlack24px} alt="group-icon-black" />;
export const MinimizeIcon = () => <img src={hidePanel} alt="minimize-icon" />;
export const FbIcon = () => <img src={fb} alt="fb-icon" />;
export const GoogleIcon = () => <img src={google} alt="google-icon" />;
export const ShareIcon = () => <img src={share} alt="share-icon" />;
export const ParticipantsIcon = () => <img src={participants} alt="participants-icon" />;
export const ReportIcon = () => <img src={report} alt="report-icon" />;
export const CloseIcon = () => <img src={close} alt="close-icon" />;
export const DateIcon = () => <img src={date} alt="date-icon" />;
export const Userpic = () => <img src={userpicHolder} alt="userpic" />;
export const EmailIcon = () => <img src={email} alt="email" />;
export const PhoneIcon = () => <img src={phone} alt="phone" />;

export {
  locationPinActive,
  locationPinInactive,
};