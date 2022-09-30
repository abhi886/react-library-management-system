export var updateExpiredTime = () => {
  const currentTTL = localStorage.getItem("TTL");
  localStorage.setItem("TTL", parseInt(currentTTL) + 10);
};

export const tracker = (options) => {
  console.log(options);
  options === "add" &&
    window.addEventListener("mousemove", updateExpiredTime, false);
  options === "remove" &&
    window.removeEventListener("mousemove", updateExpiredTime, false);
};
