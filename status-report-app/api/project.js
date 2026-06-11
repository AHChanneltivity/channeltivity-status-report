const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing project id" });

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const props = page.properties;

    const data = {
      id: page.id,
      projectName:    getTitle(props["Project Name"]),
      targetGoLive:   getDate(props["Target Go-Live"]),
      overallStatus:  getSelect(props["Overall Status"]),
      portalSetup:    getSelect(props["Portal Setup"]),
      groupsPerms:    getSelect(props["Groups & Permissions"]),
      moduleConfig:   getSelect(props["Module Config"]),
      crmIntegration: getSelect(props["CRM Integration"]),
      uatTraining:    getSelect(props["UAT & Training"]),
      goLiveStatus:   getSelect(props["Go-Live Status"]),
      thisWeek:       getRichText(props["This Week"]),
      nextWeek:       getRichText(props["Next Week"]),
      decisionsNeeded: getRichText(props["Decisions Needed"]),
      risksBlockers:  getRichText(props["Risks & Blockers"]),
    };

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

function getTitle(prop) {
  if (!prop || prop.type !== "title") return "";
  return prop.title.map((t) => t.plain_text).join("") || "Untitled";
}

function getSelect(prop) {
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name || "";
}

function getDate(prop) {
  if (!prop || prop.type !== "date") return "";
  return prop.date?.start || "";
}

function getRichText(prop) {
  if (!prop || prop.type !== "rich_text") return "";
  return prop.rich_text.map((t) => t.plain_text).join("") || "";
}
