export default class InfoInput {
  constructor(payload) {
    this.icuBedCount = payload.icuBedCount;
    this.regularBedCount = payload.regularBedCount;
    this.ventilatorCount = payload.ventilatorCount;
    this.erWaitTime = payload.erWaitTime;
    this.userId = payload.userId;
    this.hospitalId = payload.hospitalId;
  }

  isValid() {
    return (
      this.icuBedCount &&
      this.regularBedCount &&
      this.ventilatorCount &&
      this.erWaitTime &&
      this.userId &&
      this.hospitalId
    );
  }
}
