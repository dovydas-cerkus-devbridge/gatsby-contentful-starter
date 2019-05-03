import React from 'react'
import ReactPlayer from 'react-player'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {INLINES} from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      // If you are using contenful.js sdk, the referenced entry is resolved
      // automatically and is available at `node.data.target`.
      const referencedEntry = getEntryWithId(node.data.target.sys.id);

      return <a href={`/resource-pages/${referencedEntry.fields.slug}`}>{children}</a>;
    }
  }
};

function getEntryWithId(entryId) {
  return {
    fields: {
      slug: 'entry-slug'
    }
  };
}

class BlogPostTemplate extends React.Component {

  render() {
    const post = get(this.props, 'data.contentfulResourceZoneAsset')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            {post.assetFile ? <ReactPlayer width="320" height="240" url={post.assetFile.file.url} /> : null}
          </div>
          <div className="wrapper">
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <h1 className="section-headline">{post.title}</h1>
            <h4>{post.author}</h4>
            <small>{post.topic}</small><small>{post.subtopic}</small>
            <p>
              { documentToReactComponents(post.description, options) }
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulResourceZoneAsset(slug: { eq: $slug }) {
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
`;
