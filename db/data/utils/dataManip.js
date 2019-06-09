const convertToDateTime = data => {
  return data.reduce((newData, i) => {
    const { created_at, ...otherData } = i;
    otherData.created_at = new Date(i.created_at);
    newData.push(otherData);
    return newData;
  }, []);
};

const pairKeys = data => {
  const pairs = data.reduce((newData, i) => {
    newData[i.title] = i.article_id;
    return newData;
  }, {});
  return pairs;
};

const replaceKeys = (data, pairs) => {
  return data.reduce((newData, i) => {
    const { belongs_to, ...restOfData } = i;
    restOfData.article_id = pairs[belongs_to];
    newData.push(restOfData);
    return newData;
  }, []);
};

const swapKeyID = data => {
  return data.reduce((newData, i) => {
    const { created_by, ...restOfData } = i;
    restOfData.author = created_by;
    newData.push(restOfData);
    return newData;
  }, []);
};

module.exports = {
  convertToDateTime,
  pairKeys,
  replaceKeys,
  swapKeyID
};
