import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const assets = get(this, 'props.data.allContentfulResourceZoneAsset.edges');

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2 className="section-headline">Resource zone</h2>
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
