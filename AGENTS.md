# Admin UI Style Enforcement (Enterprise Locked Version)

This project is an enterprise-grade internal admin system.

UI must strictly follow `infstones-admin-ui-style`.

When generating or modifying UI:
- Reuse Operation Dashboard layout structure.
- Reuse `assets/css/common.css`.
- Keep top-header + sidebar + main layout unchanged.
- Do NOT redesign the visual system.
- Do NOT introduce new UI frameworks.
- Do NOT change spacing scale, typography, or color palette.
- Do NOT perform aesthetic upgrades.

If there is any conflict between design suggestions and style consistency,
style consistency ALWAYS takes precedence.

---

# Project Configuration – Internal Admin / Governance

This project follows `infstones-product-workflow`.

## Product Type
- Internal governance platform
- Multi-environment (dev / stage / cloud)
- Company-level operational visibility

## Core Focus
- RBAC & permission isolation
- Environment boundary enforcement
- Audit logging & traceability
- Change governance
- Bulk operation safety
- Global misconfiguration risk control

## Operational Risk Model
Every feature must evaluate:
- Blast radius (impact scope)
- Permission boundary
- Cross-environment data leakage
- Audit log requirements
- Rollback strategy
- Alert & monitoring implications

## Non-functional priorities
- Reliability first
- Observability (logs / metrics / traces)
- Data correctness
- Operational stability
- Governance clarity

## Workflow Enforcement
All features must include:

1) Functional description
2) Risk & dependency analysis
3) Permission model impact
4) API contract (if applicable)
5) Edge cases & failure scenarios
6) QA checklist
7) Monitoring & alert consideration

---

## Workflow Routing

- Spec writing → doc-coauthoring
- Report export → docx / pdf
- Resource / cost sheet → xlsx
- Complex dashboard UI → web-artifacts-builder
- Regression testing → webapp-testing
- System integration → mcp-builder

frontend-design is NOT permitted in this project.

---

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: `npx openskills read <skill-name>` (run in your shell)
  - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>doc-coauthoring</name>
<description>Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.</description>
<location>global</location>
</skill>

<skill>
<name>docx</name>
<description>"Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of \"Word doc\", \"word document\", \".docx\", or requests to produce professional documents with formatting like tables of contents, headings, page numbers, or letterheads. Also use when extracting or reorganizing content from .docx files, inserting or replacing images in documents, performing find-and-replace in Word files, working with tracked changes or comments, or converting content into a polished Word document. If the user asks for a \"report\", \"memo\", \"letter\", \"template\", or similar deliverable as a Word or .docx file, use this skill. Do NOT use for PDFs, spreadsheets, Google Docs, or general coding tasks unrelated to document generation."</description>
<location>global</location>
</skill>

<skill>
<name>infstones-admin-ui-style</name>
<description></description>
<location>global</location>
</skill>

<skill>
<name>infstones-product-workflow</name>
<description></description>
<location>global</location>
</skill>

<skill>
<name>mcp-builder</name>
<description>Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).</description>
<location>global</location>
</skill>

<skill>
<name>pdf</name>
<description>Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.</description>
<location>global</location>
</skill>

<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>global</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>global</location>
</skill>

<skill>
<name>xlsx</name>
<description>"Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read, edit, or fix an existing .xlsx, .xlsm, .csv, or .tsv file (e.g., adding columns, computing formulas, formatting, charting, cleaning messy data); create a new spreadsheet from scratch or from other data sources; or convert between tabular file formats. Trigger especially when the user references a spreadsheet file by name or path — even casually (like \"the xlsx in my downloads\") — and wants something done to it or produced from it. Also trigger for cleaning or restructuring messy tabular data files (malformed rows, misplaced headers, junk data) into proper spreadsheets. The deliverable must be a spreadsheet file. Do NOT trigger when the primary deliverable is a Word document, HTML report, standalone Python script, database pipeline, or Google Sheets API integration, even if tabular data is involved."</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>