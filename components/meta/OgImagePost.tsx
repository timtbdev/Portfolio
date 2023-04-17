/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import type { OgImagePostAttributes } from "types"
import { styles } from "./Styles"

type OgImagePostProps = OgImagePostAttributes

export function OgImagePost({
  category = "",
  title = "",
  tags = [],
  date = "",
}: OgImagePostProps) {
  return (
    <div style={styles.container}>
      {category && (
        <>
          <div style={styles.category}>{category}</div>
          <div />
        </>
      )}

      {title && (
        <>
          <div style={styles.title}>{title}</div>
          <div />
        </>
      )}

      {tags && Array.isArray(tags) && tags.length > 0 && (
        <>
          <div style={styles.tags}>
            {tags.slice(0, 3).map((tag) => (
              <div style={styles.tag} key={tag}>
                <div style={styles.tagHash}>#</div>
                <div style={styles.tagTitle}>{tag}</div>
              </div>
            ))}
          </div>
          <div />
        </>
      )}

      <div style={styles.author}>
        <img
          width="48"
          height="48"
          src="https://github.com/enjidev.png?size=48"
          style={styles.authorAvatar}
        />
        <div style={styles.authorName}>@enjidev</div>

        {date && (
          <>
            <div style={styles.divider}>&middot;</div>
            <div style={styles.description}>{date}</div>
          </>
        )}
      </div>
      <div style={styles.borderBottom} />
    </div>
  )
}
