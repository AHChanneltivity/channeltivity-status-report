const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Project name", direction: "ascending" }],
    });

    const projects = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        name: getTitle(props["Project name"]),
      };
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

function getTitle(prop) {
  if (!prop) return "";
  if (prop.type === "title") {
    return prop.title.map((t) => t.plain_text).join("") || "Untitled";
  }
  return "";
}
