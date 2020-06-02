class HistoryService {
  static async getInputs(api, payload) {
    const params = {};

    if (Object.prototype.hasOwnProperty.call(payload, 'dateRange')) {
      params.dateRange = payload.dateRange;
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'users')) {
      params.users = payload.users;
    }

    const res = await api.get(`hospitalinput/${payload.hospitalId}`, {
      params,
    });
    return res.data.data;
  }

  static async getHospitalUsers(api, hospitalId) {
    const res = await api.get(`hospitals/${hospitalId}/users`);
    return res.data.data.users.map((x) => {
      return {
        id: x.id,
        fullName: `${x.firstName} ${x.lastName}`,
      };
    });
  }
}

export default HistoryService;
