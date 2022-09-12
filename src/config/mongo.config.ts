export default (): {} => ({
  uri: `${process.env.DB_NAME}://${process.env.DB_HOST}/${process.env.DB_COLLECTION}`,
});
