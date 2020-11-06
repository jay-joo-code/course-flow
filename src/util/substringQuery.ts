const substringQuery = (query: any, keys: string[]) => {
  const regexQuery: any = {}
  keys.forEach((key) => {
    if (query[key] && typeof query[key] === 'string') {
      regexQuery[key] = { '$regex': query[key], '$options': 'i' }
    }
  })
  return { ...query, ...regexQuery }
}

export default substringQuery
