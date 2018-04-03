import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import moment from 'moment';

import toUpper from 'lodash/toUpper';
import isEmpty from 'lodash/isEmpty';

import strings from '../../assets/strings';
import { Icons } from '../../assets/images';
import {
    Icon,
    Map,
    ReadMore,
    Button,
} from '../../components';

import { DEFAULT_ZOOM } from '../../shared/constants';

import MainButton from '../../components/Buttons/MainButton';

import { EVENTS_TRASHPOINTS_SCREEN } from '../index';

import styles from './styles';

import {
  navigatorStyle,
  navigatorButtons,
  calendarConfig,
  trashpoints,
  backId,
  placeholder,
} from './config';

class EventDetails extends PureComponent {

  static navigatorStyle = navigatorStyle;
  static navigatorButtons = navigatorButtons;

  constructor(props) {
    super(props);

    props.navigator.setOnNavigatorEvent(
        this.onNavigatorEvent,
    );

    this.state = {
      isEndReached: false,
    };
  }

  componentWillMount() {
    const { eventId, onLoadEvent } = this.props;

    onLoadEvent(eventId);
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case backId: {
          this.props.navigator.dismissModal();
          break;
        }
      }
    }

    if (event.type === trashpoints) {
      this.props.navigator.showModal({
        screen: EVENTS_TRASHPOINTS_SCREEN,
        title: strings.label_trashpoints,
      });
    }
  }

  handleEventJoin = () => console.log('Join Event');

  handlePhoneNumberOpen = (phoneNumber) => {
    const formatedPhoneNumber = phoneNumber && `tel:${phoneNumber}`;

    Linking.canOpenURL(formatedPhoneNumber).then(
      (supported) => {
        if (!supported) {
          console.warn(`Can't handle url: ${formatedPhoneNumber}`);
        } else {
          return Linking.openURL(formatedPhoneNumber);
        }
      }).catch(err => console.warn('An error occurred', err));
  }

  handleRenderImage() {
    const { event } = this.props;
    const img = isEmpty(event.photos) ? { uri: placeholder } : { uri: event.photos[0] };

    return (
      <Image
        style={styles.coverImage}
        source={img}
      />
    );
  }

  handleRenderButton() {
    return (
      <View style={styles.buttonContainer}>
        <MainButton
          isValid
          text={strings.lable_join_event}
          style={styles.button}
          onPress={this.handleEventJoin}
        />
      </View>
    );
  }

  handleRenderDate() {
    const { event } = this.props;
    const formatedDate = moment(event.createDate).format('DD MMMM, HH:mm');
    const calendarTime = moment(event.createDate).calendar(null, calendarConfig);
    return (
      <View style={styles.dateContainer}>
        <Icon path={Icons.Time} />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatedDate}</Text>
          <Text style={styles.calendarText}>{calendarTime}</Text>
        </View>
      </View>
    );
  }

  handleRenderLocation() {
    const { event } = this.props;

    if (!event.location) return null;

    const initialRegion = {
      latitude: event.location.latitude,
      longitude: event.location.longitude,
      latitudeDelta: DEFAULT_ZOOM * 2,
      longitudeDelta: DEFAULT_ZOOM * 2,
    };

    const marker = {
      id: event.location.latitude,
      latlng: {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      },
    };

    return (
      <View>
        <View style={styles.locationContainer}>
          <Icon path={Icons.Map} />
          <Text
            numberOfLines={2}
            style={styles.locationText}
          >
            {event.address}
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <Map
            markers={[marker]}
            region={initialRegion}
          />
        </View>
      </View>
    );
  }

  handleRenderCircle() {
    const { event } = this.props;

    if (!isEmpty(event.trashpoints)) {
      return (
        <View style={styles.circleContainer}>
          <Text style={styles.circleText}>
            {event.trashpoints.length}
          </Text>
        </View>
      );
    }
  }

  handleRenderTrashpoints() {
    const { event } = this.props;

    const Wrapper = isEmpty(event.trashpoints) ? View : TouchableOpacity;
    const navigation = { type: trashpoints };

    return (
      <Wrapper
        onPress={this.onNavigatorEvent.bind(this, navigation)}
        style={styles.trashpointsContainer}
      >
        <Icon path={Icons.Trashpoints} />
        <Text style={styles.locationText}>{strings.label_tap_to_preview_trashpoints}</Text>
        <View style={styles.trashpointsRightContainer}>
          {this.handleRenderCircle()}
          <Icon path={Icons.Back} iconStyle={styles.arrowIcon} />
        </View>
      </Wrapper>
    );
  }

  handleRenderDescription() {
    const { event } = this.props;
    return (
      <ReadMore
        numberOfLines={3}
        style={styles.readMoreContainer}
      >
        <Text style={styles.locationText}>
          {event.description}
        </Text>
      </ReadMore>
    );
  }

  handleRenderWhatToBring() {
    const { event } = this.props;
    return (
      <ReadMore
        numberOfLines={3}
        style={styles.readMoreContainer}
      >
        <Text style={styles.locationText}>
          {event.whatToBring}
        </Text>
      </ReadMore>
    );
  }

  handleRenderCoordinator() {
    const { event } = this.props;

    return (
      <View>
        {event.createdByName &&
          <View style={styles.coordinatorContainerItem}>
            <Icon path={Icons.Person} />
            <Text style={styles.coordinatorTextItem}>
              {event.createdByName}
            </Text>
          </View>
        }

        <View style={styles.coordinatorContainerItem}>
          <Icon path={Icons.GroupPeople} />
          <Text style={styles.noOrganizationText}>
            {strings.label_no_organization}
          </Text>
        </View>

        {event.phonenumber &&
          <View style={styles.coordinatorContainerItem}>
            <Icon path={Icons.Phone} iconStyle={styles.phoneIconStyle} />
            <TouchableOpacity
              onPress={this.handlePhoneNumberOpen.bind(this, event.phonenumber)}
            >
              <Text style={styles.coordinatorPhoneNumber}>
                {event.phonenumber}
              </Text>
            </TouchableOpacity>
          </View>
        }

        {event.email &&
          <View style={styles.coordinatorContainerItem}>
            <Icon path={Icons.Email} />
            <Text style={styles.coordinatorTextItem}>
              {event.email}
            </Text>
          </View>
        }
      </View>
    );
  }

  hadnleRenderAttendees() {
    const { event } = this.props;
    const string = `${event.peopleAmount}/${event.maxPeopleAmount}`;
    return (
      <View style={styles.trashpointsContainer}>
        <View style={styles.attendeesCount}>
          <Icon path={Icons.List} />
          <Text style={styles.locationText}>{string}</Text>
        </View>
        <Icon path={Icons.Back} iconStyle={styles.arrowIcon} />
      </View>
    );
  }

  spinner() {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color="rgb(0, 143, 223)"
      />
    );
  }

  handleIsCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  handleScrollToEnd = () => this.scrollView.scrollToEnd({ animated: true });

  handleScroll = ({ nativeEvent }) => {
    if (this.handleIsCloseToBottom(nativeEvent)) {
      this.setState({ isEndReached: true });
    }
  }

  render() {
    const { event } = this.props;
    const { isEndReached } = this.state;

    if (!event) return this.spinner();

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          ref={ref => this.scrollView = ref}
          scrollEventThrottle={800}
          onScroll={this.handleScroll}
          onContentSizeChange={(contentWidth, contentHeight) => console.log('contentWidth', contentWidth, 'contentHeight', contentHeight)}
        >
          <View style={styles.container}>
            {this.handleRenderImage()}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{event.name}</Text>
            </View>
            {this.handleRenderButton()}
            <Text style={styles.title}>{toUpper(strings.lable_date_and_time)}</Text>
            {this.handleRenderDate()}
            <Text style={styles.title}>{toUpper(strings.label_location)}</Text>
            {this.handleRenderLocation()}
            <Text style={styles.title}>{toUpper(strings.label_trashpoints)}</Text>
            {this.handleRenderTrashpoints()}
            <Text style={styles.title}>{toUpper(strings.label_description)}</Text>
            {this.handleRenderDescription()}
            <Text style={styles.title}>{toUpper(strings.label_what_to_bring)}</Text>
            {this.handleRenderWhatToBring()}
            <Text style={styles.title}>{toUpper(strings.lable_coordinator)}</Text>
            {this.handleRenderCoordinator()}
            <Text style={styles.title}>{toUpper(strings.label_attendees)}</Text>
            {this.hadnleRenderAttendees()}
          </View>
        </ScrollView>

        {!isEndReached && <Button
          style={styles.floatingButton}
          iconStyle={styles.iconFloatingButton}
          icon={Icons.Back}
          onPress={this.handleScrollToEnd}
        />}
      </View>
    );
  }
}

EventDetails.propTypes = {
  event: PropTypes.object,
  error: PropTypes.object,
  eventId: PropTypes.string,
  navigator: PropTypes.object,
  onLoadEvent: PropTypes.func,
};

export default EventDetails;