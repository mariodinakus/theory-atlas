# THEORY ATLAS — THE EVERYTHING LAB

**An educational, bilingual (Ελληνικά / English), colorful, responsive, numerical playground about the search for a Theory of Everything.**

Next.js 15 · React 19 · TypeScript · custom SVG charts · no API keys required.

## Run locally

1. Install Node.js 20.9 or newer.
2. In the project directory, run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.
4. For a production check, run `npm run build` and `npm start`.

## Deploy on Vercel with GitHub

1. Create a new GitHub repository (for example `theory-atlas`).
2. Upload the **contents** of this project folder into the repository root, retaining `app/`, `components/`, `lib/`, `public/` and `package.json`.
3. At Vercel, choose **Add New → Project → Import Git Repository**.
4. Framework preset should auto-detect **Next.js**. No environment variables or API keys are required.
5. Click **Deploy**. Subsequent GitHub pushes trigger Vercel deployments.

If you upload the ZIP directly to GitHub, first extract it and upload the folder's contents. Do not put everything into a nested folder unless you also configure Vercel's Root Directory.

## Included screens

- **Overview:** dashboard, Planck energy gap, ten lab launchers, a five-milestone evidence gate instead of an invented % complete.
- **Labs:** 10 functioning experiments with adjustable parameters, formulas, charts, numerical outputs, default reset, clear caveats and sources.
- **Theory atlas:** searchable/filterable library of 12 **representative** theories, proposals, mathematical frameworks and benchmark theories. Side-by-side comparison of up to three; no pseudoscientific scoring.
- **Experimental frontiers:** separates observations, constraints and research proposals; links to original sources.
- **Notebook:** localStorage experiments, reload, delete and export to JSON; no account or backend.
- **Methodology:** reference library and detailed restrictions.
- **Greek / English:** language toggle and responsive layout with mobile sidebar.

## All ten labs

| # | Lab | What you can change | Mathematical model and limitations |
|---|---|---|---|
| 01 | Planck gap | Energy from 1 GeV to ~Planck | Corresponding inverse length scale ℏc/E; **not** experimental reach |
| 02 | Coupling convergence | Energy, αs(MZ), SM vs illustrative SUSY | One-loop running with sample high-energy coefficients; hypothetical 1 TeV SUSY threshold |
| 03 | Black hole physics | Mass | Schwarzschild radius, semiclassical Hawking temperature |
| 04 | Uncertainty | Position uncertainty, extra momentum factor | Heisenberg inequality, schematic Gaussian visualizations |
| 05 | Extra dimensions | Compactification radius, KK level | KK energy spectrum for one simple flat circular extra dimension |
| 06 | Higgs | λ, μ | Tree-level single-real-field potential, minima, mass |
| 07 | Vacuum energy | Dimensional-analysis cutoff | Quartic-scale comparison with observed dark-energy **scale**, not a full renormalized calculation |
| 08 | Bell inequalities | Photon polarization angle, visibility | Ideal CHSH scenario, classical and quantum bounds |
| 09 | Gravity-mediated phase | Mass, separation, time | **Only** simplified interaction phase, not a full entanglement or feasibility simulation |
| 10 | Gravitational chirp | Binary masses, frequency | Leading-order circular, non-spinning inspiral; stylized waveform |

## Science and epistemic boundaries

**There is no validated Theory of Everything and no agreed metric for “percentage complete.”** This app never reports a “72% complete” fiction. Standard Model and General Relativity are separately successful in their own domains, not a full unified theory.

At the LHC's 13.6 TeV proton collision energy and the Planck energy ~1.22×10^19 GeV, the energy scale ratio is ~8.98×10^14 (~14.95 powers of ten). Direct access to generic Planck-scale phenomena with present-day colliders is out of reach. That does **not** mean all quantum-gravity tests are impossible: indirect observations and laboratory proposals may access constrained effects in particular models.

Candidate types are deliberately differentiated. For example, SU(5) and SO(10) GUT approaches concern gauge-force unification but do not by themselves quantize gravity; holography is a duality/framework, and the Standard Model + GR entry is a **benchmark**, not a ToE. Strings and LQG are very different approaches, and no one candidate receives a fabricated likelihood of being “correct.”

Simulations are theoretical classroom calculations. They use idealizations and fixed input numbers, not streaming CERN/LIGO data. The library is curated as of **October 2026** and does not auto-update. A source link on a specific card is for scientific context and does not mean the source validates the particular toy parameters or qualitative interpretation.

## Primary references

- NIST CODATA 2022 recommended constants: https://physics.nist.gov/cuu/Constants/
- CERN Large Hadron Collider / 13.6 TeV: https://home.cern/science/accelerators/large-hadron-collider
- Particle Data Group review: https://pdg.lbl.gov/
- ATLAS (2026) benchmark quantum-black-hole search (null result): https://cds.cern.ch/record/2959458
- Marletto & Vedral, Reviews of Modern Physics (2025): https://doi.org/10.1103/RevModPhys.97.015006
- LIGO GW150914: https://ligo.org/science-summaries/GW150914/
- CERN Higgs: https://home.cern/science/physics/higgs-boson
- Nobel Prize 2022, Bell experiments: https://www.nobelprize.org/prizes/physics/2022/summary/

## Data / privacy / security

- No secrets, credentials or environment variables required.
- No user sign-in and no server storage.
- The notebook is persisted to the browser's localStorage; clearing website data deletes it. Export to JSON to back it up.
- Calculations are executed in the browser. A deployed site still needs network for its initial load unless a caching solution is added separately.
- External scientific links open in a new tab with `noopener noreferrer`.

## Folder structure

```
app/                 Next.js App Router shell and global visual design
components/          UI, numerical simulations, responsive SVG chart engine
lib/                 Fundamental constants, formulas, theories, sources
public/              App icon and install metadata
```

## Validation status

This project was authored and checked for TypeScript/TSX parse errors. Core physics formulas underwent numerical sanity tests (Planck ratio, inverse couplings, Schwarzschild, Hawking, CHSH, inspiral). **Full `npm run build` validation was not possible here because dependency download from npm timed out in the current environment.** Run a build locally or in Vercel before treating it as verified production-ready.
