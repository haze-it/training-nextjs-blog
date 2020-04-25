import Link from 'next/link'
import Date from '../components/date'

import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} >
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <p>at feature/test-now-build</p>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

// 静的生成
// 外部にリクエストを飛ばしたりしてデータを取得する場所 on Serverside(at build time)。
// 当然query parameter, http headerといったデータは使えない
// ユーザに見えることがない
// refs: https://nextjs.org/docs/basic-features/data-fetching
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
