export const sortData = (data, type) => {
  const [first, ...rest] = data;
  let remainingVales = [];
  let filteredData = rest
    .filter(game => {
      if (!isNaN(Number(Object.values(game)[0][3]))) {
        return true;
      } else {
        remainingVales = [...remainingVales, game];
      }
    })
    .sort(
      (a, b) =>
        Number(Object.values(type == "asc" ? a : b)[0][3]) -
        Number(Object.values(type == "asc" ? b : a)[0][3])
    );

  return [...filteredData, ...remainingVales];
};

export const formatData = data => {
  let formattedArray = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      formattedArray.push({ [`heading`]: data[i] });
      localStorage[`heading`] = JSON.stringify(data[i]);
    } else {
      formattedArray.push({ [`GAME-${data[i][1]}`]: data[i] });
      localStorage[`GAME-${data[i][1]}`] = JSON.stringify(data[i]);
    }
  }
  return formattedArray;
};

export const getSearchList = (text, data) => {
  let regex = new RegExp(text);
  return data.filter(game =>
    Object.keys(game)[0]
      .toLocaleUpperCase()
      .match(regex)
  );
};
