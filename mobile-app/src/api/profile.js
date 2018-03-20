import Api from '../services/Api';

async function updateProfileStatus(profileStatus) {
  try {
    const response = await Api.put('me/privacy', profileStatus);

    return response.data;
  } catch (ex) {
    throw ex;
  }
}

async function getProfile() {
  try {
    const response = await Api.get('/me');
    return response.data;
  } catch (ex) {
    throw ex;
  }
}

async function updateProfile(profile) {
  try {
    const response = await Api.put('/me', profile);
    if (!response || !response.data) {
      throw { error: 'Could not not read response data' };
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
}

export default {
  updateProfileStatus,
  getProfile,
  updateProfile,
};
