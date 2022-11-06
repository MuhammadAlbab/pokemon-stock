import format from "date-fns/format";

const getTime = () => {
  return format(new Date(), "hh:mm");
};

const getDate = () => {
  return format(new Date(), "d MMM yyy");
};

export { getTime, getDate };
