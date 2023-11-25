import type { Node } from '#edgedb/interfaces'
import { getNode } from '#edgedb/queries'

import { H3Error, defineEventHandler, getRouterParams } from 'h3'
export default defineEventHandler(async (req) => {
  const params = getRouterParams(req)
  const client = useEdgeDb(req)

  if (params.id) {
    const node = await getNode(client, {id: params.id}  )
    return node as Node
  }
  else {
    const err = new H3Error('No domain found in query.')
    err.statusCode = 400
    return err
  }
})