# 2026 Job Application Dashboard

This repository publishes a tracker of verified 2026 job applications and employer-status records.

Open the interactive dashboard through GitHub Pages: `https://xujingxiang19883.github.io/job-applications-dashboard-2026/`

The page loads its Supabase JavaScript library from this repository and renders a published, read-only snapshot before checking authentication or fetching live data. This lets visitors read the dashboard on networks that cannot reach Supabase. When Supabase is available, the page refreshes with current records and the Cornell owner can edit as usual. GitHub Actions refreshes the public snapshot hourly; visitors on restricted networks may see changes with up to roughly an hour of delay, plus GitHub Pages deployment and caching time. The snapshot contains only records already exposed by the dashboard's public API.

The dashboard is sorted by submitted date. The Cornell owner can sign in to edit statuses and add applications; changes are saved in Supabase. Each row links to the original application/JD page and, where retained, the role-specific resume PDF. This repository does not maintain a downloadable Excel tracker.

Notes:

- “Submitted” is a completed application. “Received / reviewing” is an employer acknowledgment. “OA outstanding” means an online assessment remains to be completed. “OA received” means the assessment invitation has been received.
- Fidelity outcomes and the Barclays OA status were provided by the applicant.
- “Not captured” means no role-specific PDF was found locally. For Susquehanna, the listed date is the assessment-invitation date because the confirmation email did not state the submission date.
- Balbec appears twice because two confirmed submission channels were recorded.

## Operating workflow

This is the required workflow for each new 2027 quant internship application.

1. Search Cornell Handshake first and read the full job description. Verify that the role is open and fits the applicant's degree and expected graduation date.
2. Route a Handshake **Quick Apply** role to the application workflow. Create a role-specific resume from the current canonical resume, making only truthful, job-description-backed wording adjustments. Preserve the original one-page layout exactly: the same formatting, margins, fonts, spacing, and section structure. Keep the address centered under the name, as in the source resume. Render and check the PDF before use so it remains one full page without overflow or large unused space.
3. Show the tailored resume and obtain the applicant's current confirmation before clicking the final submit control.
4. After the site confirms a successful submission, immediately add the role to the published HTML dashboard with the submission date, company, role, current status, Handshake/job-description URL, and the uploaded resume PDF. Publish the change.
5. Route a Handshake **Apply Externally** role to Quant Path 27 instead. Do not place it in this application dashboard until a verified submission exists. Exclude companies already tracked here from Quant Path recommendations.

Repeat this routing and update sequence for every newly identified role. The Job Application Dashboard is the record of completed applications; Quant Path 27 is the remaining external-application pipeline.
