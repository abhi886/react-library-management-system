export var updateExpiredTime = () => {
  const currentTTL = localStorage.getItem("TTL");
  localStorage.setItem("TTL", parseInt(currentTTL) + 3000);
};

export const tracker = (options) => {
  console.log(options);
  options === "add" &&
    window.addEventListener("mousemove", updateExpiredTime, false);
  options === "remove" &&
    window.removeEventListener("mousemove", updateExpiredTime, false);

  //   window.addEventListener("scroll", updateExpiredTime, true);
  //   window.addEventListener("keydown", updateExpiredTime, true);
};
export const interval = (isTimeOut, SetIsTimeout) => {
  let nIntervId;
  if (isTimeOut === false) {
    nIntervId = setInterval(() => {
      console.log("Inside Interval");
      SetIsTimeout(true);
    }, 20000);
  }
  if (isTimeOut === true) {
    console.log("true");
    clearInterval(nIntervId);
  }
};
