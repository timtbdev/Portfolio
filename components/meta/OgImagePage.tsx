/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import type { OgImagePageAttributes } from "types"
import { styles } from "./Styles"

type OgImagePageProps = OgImagePageAttributes

export function OgImagePage({
  caption = "",
  title = "",
  description = "",
  author
}: OgImagePageProps) {
  return (
    <div style={styles.container}>
      {caption && (
        <>
          <div
            style={
              caption.toLowerCase() === "work"
                ? { ...styles.category, ...styles.categoryWork }
                : styles.category
            }
          >
            {caption}
          </div>
          <div />
        </>
      )}

      {title && (
        <>
          <div style={styles.title}>{title}</div>
          <div />
        </>
      )}

      {description && (
        <>
          <div style={styles.description}>{description}</div>
          <div />
        </>
      )}

      <div style={styles.author}>
        <img
          width="48"
          height="48"
          src={author.image}
          style={styles.authorAvatar}
        />
        <div style={styles.authorName}>{author.name}</div>
      </div>
      <div
        style={
          caption.toLowerCase() === "work"
            ? { ...styles.borderBottom, ...styles.borderBottomWork }
            : styles.borderBottom
        }
      />
    </div>
  )
}
