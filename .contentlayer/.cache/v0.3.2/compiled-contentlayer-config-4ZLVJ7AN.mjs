// contentlayer.config.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};
var Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    image: { type: "string", required: true },
    twitter: { type: "string", required: true }
  }
}));
var Social = defineDocumentType(() => ({
  name: "Social",
  filePathPattern: `socials/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    address: {
      type: "string",
      required: true
    },
    url: {
      type: "string",
      required: true
    },
    icon: {
      type: "string",
      required: true
    },
    iconColor: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    date: {
      type: "date"
    },
    image: {
      type: "string"
    },
    imageAlt: {
      type: "string"
    },
    imageCaption: {
      type: "string"
    },
    socials: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Social,
      type: "list",
      of: { type: "string" }
    }
  },
  computedFields
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    image: {
      type: "string",
      required: true
    },
    imageCaption: {
      type: "string"
    },
    category: {
      type: "string",
      required: true
    },
    author: {
      type: "nested",
      of: Author
    },
    tags: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Tags,
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  computedFields
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    mobile: {
      type: "boolean",
      default: true
    },
    description: {
      type: "string"
    },
    url: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    icon: {
      type: "string",
      required: true
    },
    screenshot: {
      type: "string",
      required: true
    },
    tags: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Tags,
      type: "list",
      of: { type: "string" },
      required: true
    },
    features: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Features,
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Project, Social],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Page,
  Post,
  Project,
  Social,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4ZLVJ7AN.mjs.map
