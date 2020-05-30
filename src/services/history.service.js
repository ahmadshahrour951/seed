class HistoryService {
  static async getInputs(api, payload) {
    const { dateRange, users } = payload;
    const res = await api.get(`hospitalinput/${payload.hospitalId}`, {
      params: {
        dateRange,
        users,
      },
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
