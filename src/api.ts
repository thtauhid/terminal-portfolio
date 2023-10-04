let username = "";

export const setUsername = (name: string) => {
  username = name;
};

export const getUsername = () => {
  return username;
};

export const getData = async () => {
  return import(`../data/${username}.json`).then((data) => data.default);
};
