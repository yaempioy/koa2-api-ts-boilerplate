import * as mongoose from 'mongoose'

export const cleanDb = (excludeCollections: string[]) => {
  if (excludeCollections != null) {
    Object.keys(mongoose.connection.collections).forEach((name) => {
      // if (!excludeCollections.includes(name)) {
      // mongoose.connection.collections[name].remove(() => { })
      // }
    })
  } else {
    Object.keys(mongoose.connection.collections).forEach((name) => {
      mongoose.connection.collections[name].remove(() => { })
    })
  }
}
