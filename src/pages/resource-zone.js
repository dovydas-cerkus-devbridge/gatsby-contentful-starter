import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './resource-zone.module.css'
import Layout from "../components/layout"
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const assets = get(this, 'props.data.allContentfulResourceZoneAsset.edges');

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            Resource zone
          </div>
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {assets.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulResourceZoneAsset(sort: {fields: [publishDate], order: DESC}) {
      edges {
        node {
          title
          slug
          contentType
          topic
          subTopic
          author
          assetFile {
            file {
              url
              fileName
              contentType
            }
          }
          publishDate(formatString: "MMMM Do, YYYY")
          description {
            content {
              nodeType
              content {
                nodeType
                marks {
                  type
                }
                value
              }
            }
          }
        }
      }
    }
  }
`;
