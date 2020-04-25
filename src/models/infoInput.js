export default class InfoInput {
  constructor(payload) {
    this.icuBedCount = payload.icuBedCount;
    this.regularBedCount = payload.regularBedCount;
    this.ventilatorCount = payload.ventilatorCount;
    this.erWaitTime = payload.erWaitTime;
    this.patientsWaitingCount = payload.patientsWaitingCount;
    this.userId = payload.userId;
    this.hospitalId = payload.hospitalId;
  }
}
