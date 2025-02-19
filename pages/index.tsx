import * as React from 'react'

import { NotionPage } from '@/components/notion/NotionPage'
import { domain } from '@/lib/notion/config'
import { resolveNotionPage } from '@/lib/notion/resolve-notion-page'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)
    console.log('test: props: ', props)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  return <NotionPage {...props} />
}
