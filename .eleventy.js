module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/*.png");
  eleventyConfig.addPassthroughCopy("src/*.jpg");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Blog posts collection (newest first)
  eleventyConfig.addCollection("blog", function (api) {
    return api.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  // All unique tags across blog posts
  eleventyConfig.addCollection("tagList", function (api) {
    const tagSet = new Set();
    api.getFilteredByGlob("src/blog/posts/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });

  // Date formatting filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const date = new Date(dateObj);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // ISO date filter for <time> datetime attribute
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const date = new Date(dateObj);
    return date.toISOString().split("T")[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
