const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    id,
    overallStatus,
    portalSetup,
    groupsPerms,
    moduleConfig,
    crmIntegration,
    uatTraining,
    goLiveStatus,
    thisWeek,
    nextWeek,
    decisionsNeeded,
    risksBlockers,
  } = req.body;

  if (!id) return res.status(400).json({ error: "Missing project id" });

  try {
    const properties = {};

    if (overallStatus)   properties["Overall Status"]       = { select: { name: overallStatus } };
    if (portalSetup)     properties["Portal Setup"]         = { select: { name: portalSetup } };
    if (groupsPerms)     properties["Groups & Permissions"] = { select: { name: groupsPerms } };
    if (moduleConfig)    properties["Module Config"]        = { select: { name: moduleConfig } };
    if (crmIntegration)  properties["CRM Integration"]      = { select: { name: crmIntegration } };
    if (uatTraining)     properties["UAT & Training"]       = { select: { name: uatTraining } };
    if (goLiveStatus)    properties["Go-Live Status"]       = { select: { name: goLiveStatus } };

    properties["This Week"]          = { rich_text: [{ text: { content: thisWeek || "" } }] };
    properties["Next Week"]          = { rich_text: [{ text: { content: nextWeek || "" } }] };
    properties["Decisions Needed"]   = { rich_text: [{ text: { content: decisionsNeeded || "" } }] };
    properties["Risks & Blockers"]   = { rich_text: [{ text: { content: risksBlockers || "" } }] };

    await notion.pages.update({ page_id: id, properties });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
