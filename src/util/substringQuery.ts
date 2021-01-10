// formats query so that mongoose's find matches substrings
const substringQuery = (query: any, keys: string[]) => {
  if (keys.length === 0) return query

  const regexQuery: any = {}
  keys.forEach((key) => {
    if (query[key] && typeof query[key] === 'string') {
      regexQuery[key] = { $regex: query[key], $options: 'i' }
    }
  })
  return { ...query, ...regexQuery }
}

export default substringQuery
