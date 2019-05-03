import React from 'react'
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import styles from './article-preview.module.css'

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

export default ({ article }) => (
  <div className={styles.preview}>
    {article.assetFile ? <ReactPlayer width="320" height="240" url={article.assetFile.file.url} /> : null}
    <h3 className={styles.previewTitle}>
      <Link to={`/resource-pages/${article.slug}`}>{article.title}</Link>
    </h3>
    <h4>{article.author}</h4>
    <small>{article.publishDate}</small>
    <p>
      { documentToReactComponents(article.description, options) }
    </p>
  </div>
)
