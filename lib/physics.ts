export const PH = {
  c: 299792458,
  G: 6.67430e-11,
  hbar: 1.054571817e-34,
  kB: 1.380649e-23,
  mSun: 1.98847e30,
  hbarc: 1.973269804e-16, // GeV*m
  planckEnergy: 1.220890e19, // GeV
  planckLength: 1.616255e-35, // m
  planckMass: 2.176434e-8, // kg
  lhcEnergy: 13600, // GeV, pp CM energy, not individual particle energy
  alphaStrong: 0.1184, // illustrative input, configurable research snapshot
  sin2ThetaW: 0.23122,
  alphaEmInv: 127.955,
  mZ: 91.1876, // GeV
};
export const clamp = (n:number,lo:number,hi:number) => Math.max(lo,Math.min(hi,n));
export function sci(value: number, digits=2):string {
  if (!Number.isFinite(value)) return "—";
  if(value===0) return "0";
  const a=Math.abs(value);
  if(a>=10000 || a<0.001) return value.toExponential(digits).replace("e+", " × 10^").replace("e-", " × 10^−");
  return new Intl.NumberFormat('en-US',{maximumFractionDigits:digits+1}).format(value);
}
export function power(value:number,digits=2):string {
  if(!Number.isFinite(value) || value<=0) return "—";
  const e=Math.floor(Math.log10(value)); const m=value/10**e;
  const superscript=String(Math.abs(e)).replace(/[0-9]/g,(d)=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]);
  return `${m.toFixed(digits)} × 10${e<0?"⁻":"⁺"}${superscript}`;
}
export function fmt(value:number, digits=3):string {
 if (!Number.isFinite(value)) return "—";
 if (Math.abs(value)<1e-3 && value!==0 || Math.abs(value)>1e5) return value.toExponential(2);
 return value.toLocaleString('en-US',{maximumFractionDigits:digits});
}
export type CouplingScheme='SM'|'SUSY';
export function inverseCouplings(Q:number,scheme:CouplingScheme,alphaS=PH.alphaStrong){
 const alphaEm=1/PH.alphaEmInv;
 const inverse=[(3/5)*(1-PH.sin2ThetaW)/alphaEm,PH.sin2ThetaW/alphaEm,1/alphaS];
 const bSM=[41/10,-19/6,-7];
 const bSusy=[33/5,1,-3];
 const run=(input:number[],beta:number[],from:number,to:number)=>input.map((v,i)=>v-beta[i]/(2*Math.PI)*Math.log(to/from));
 const q=clamp(Q,PH.mZ,1e19);
 if(scheme==='SM'||q<=1000) return run(inverse,bSM,PH.mZ,q);
 return run(run(inverse,bSM,PH.mZ,1000),bSusy,1000,q);
}
export function schwarzschild(massKg:number){
 const {G,c,hbar,kB}=PH;
 return { radius:2*G*massKg/(c*c), temperature:hbar*c**3/(8*Math.PI*G*massKg*kB), massRatio:massKg/PH.planckMass};
}
export function higgsPotential(phi:number,lambda:number,mu:number) { return -0.5*mu*mu*phi*phi +0.25*lambda*phi**4; }
export function bellS(aPrime:number,visibility:number){
 const rad=(v:number)=>v*Math.PI/180;
 const E=(a:number,b:number)=>-visibility*Math.cos(2*rad(a-b));
 return Math.abs(E(0,22.5)+E(0,-22.5)+E(aPrime,22.5)-E(aPrime,-22.5));
}
export function gwStats(m1solar:number,m2solar:number,frequency:number){
 const m1=m1solar*PH.mSun,m2=m2solar*PH.mSun;
 const chirp=(m1*m2)**(3/5)/(m1+m2)**(1/5);
 const fISCO=PH.c**3/(Math.pow(6,1.5)*Math.PI*PH.G*(m1+m2));
 const t=5/256 * Math.pow(PH.G*chirp/PH.c**3,-5/3)*Math.pow(Math.PI*frequency,-8/3);
 return {chirpSolar:chirp/PH.mSun,fISCO,timeToCoalescence:t};
}
export type LabId='planck'|'couplings'|'blackhole'|'uncertainty'|'dimensions'|'higgs'|'vacuum'|'bell'|'entanglement'|'waves';
export type LabDef={id:LabId,number:string,el:string,en:string,shortEl:string,shortEn:string,group:'Foundations'|'Unification'|'Frontiers',accent:string,formula:string,caveatEl:string,caveatEn:string,source:string};
export const LABS:LabDef[]=[
 {id:'planck',number:'01',el:'Κλίμακα Planck',en:'The Planck gap',shortEl:'Πόσο μακριά είναι η πειραματική κλίμακα;',shortEn:'How far from experimental reach?',group:'Foundations',accent:'#ff745f',formula:'ℓ ≈ ℏc / E    ·    Eₚ = √(ℏc⁵/G)',caveatEl:'Οι 13,6 TeV είναι ενέργεια σύγκρουσης πρωτονίων, όχι απευθείας μέτρο προσιτής κλίμακας κβαντικής βαρύτητας.',caveatEn:'13.6 TeV is proton collision center-of-mass energy, not a direct quantum-gravity reach measurement.',source:'https://physics.nist.gov/cuu/Constants/'},
 {id:'couplings',number:'02',el:'Ενοποίηση δυνάμεων',en:'Coupling convergence',shortEl:'Τρέξε τις τρεις σταθερές σύζευξης στην ενέργεια.',shortEn:'Run three gauge couplings across energy.',group:'Unification',accent:'#e0b744',formula:'αᵢ⁻¹(Q)=αᵢ⁻¹(MZ)−(bᵢ/2π) ln(Q/MZ)',caveatEl:'Μοντέλο 1-loop, σταθερές εισόδου ενδεικτικές. Το SUSY σενάριο υποθέτει φανταστικό threshold 1 TeV. Η σύγκλιση δεν αποδεικνύει SUSY ή GUT.',caveatEn:'One-loop illustrative calculation. The SUSY scenario assumes an unverified 1 TeV threshold. Convergence proves neither SUSY nor GUT.',source:'https://pdg.lbl.gov/'},
 {id:'blackhole',number:'03',el:'Εργαστήριο μελανών οπών',en:'Black hole physics',shortEl:'Άλλαξε μάζα, ορίζοντα και θερμοκρασία.',shortEn:'Change mass, horizon and temperature.',group:'Foundations',accent:'#bd9afa',formula:'rₛ=2GM/c²    ·    Tₕ=ℏc³/(8πGMkᵦ)',caveatEl:'Η θερμοκρασία Hawking είναι ημι-κλασική πρόβλεψη, όχι άμεσα επιβεβαιωμένη εκπομπή αστροφυσικών οπών. Κοντά στη μάζα Planck οι τύποι χάνουν αξιοπιστία.',caveatEn:'Hawking radiation is a semiclassical prediction, not directly confirmed for astrophysical holes. Formulae break down near Planck mass.',source:'https://physics.nist.gov/cuu/Constants/'},
 {id:'uncertainty',number:'04',el:'Κβαντική αβεβαιότητα',en:'Uncertainty explorer',shortEl:'Συμπίεσε το πακέτο κύματος, δες την ορμή.',shortEn:'Compress a wave packet, expand momentum.',group:'Foundations',accent:'#5ebcc5',formula:'Δx · Δp ≥ ℏ/2',caveatEl:'Οι καμπύλες δείχνουν ενδεικτικές Gaussian οριακές κατανομές, όχι πλήρη δυναμική κυματοσυνάρτησης.',caveatEn:'Curves show idealized Gaussian marginal distributions, not full wavefunction dynamics.',source:'https://www.nist.gov/pml/fundamental-physical-constants'},
 {id:'dimensions',number:'05',el:'Κρυφές διαστάσεις',en:'Extra dimensions',shortEl:'Δες φάσμα υποθετικών Kaluza–Klein μαζών.',shortEn:'Explore hypothetical Kaluza–Klein excitations.',group:'Unification',accent:'#f086b0',formula:'Eₙ ≈ nℏc/R    (m₀ = 0)',caveatEl:'Επίπεδη συμπαγοποίηση σε κύκλο και μηδενική βασική μάζα: εκπαιδευτικό toy μοντέλο, όχι πρόβλεψη συγκεκριμένης θεωρίας χορδών ή όριο αποκλεισμού.',caveatEn:'Flat circular compactification and zero base mass: a teaching model, not a particular string-theory prediction or exclusion limit.',source:'https://home.cern/science/physics/extra-dimensions-gravitons-and-tiny-black-holes'},
 {id:'higgs',number:'06',el:'Δυναμικό Higgs',en:'Higgs potential',shortEl:'Χτίσε συμμετρία και σπάσε την με δύο παραμέτρους.',shortEn:'Tune symmetry breaking with two parameters.',group:'Unification',accent:'#8bbc68',formula:'V(φ)=−½μ²φ²+¼λφ⁴    ·    v=μ/√λ',caveatEl:'Πραγματικό μονοδιάστατο πεδίο ως τομή του δυναμικού Higgs στο δενδρικό επίπεδο. Δεν μοντελοποιεί corrections ή θερμοκρασία.',caveatEn:'One-real-field slice of the tree-level Higgs potential. No quantum or thermal corrections.',source:'https://home.cern/science/physics/higgs-boson'},
 {id:'vacuum',number:'07',el:'Πρόβλημα κενού',en:'Vacuum catastrophe',shortEl:'Δοκίμασε ενεργειακά cutoffs έναντι σκοτεινής ενέργειας.',shortEn:'Test naive vacuum cutoffs vs dark energy.',group:'Frontiers',accent:'#ff9b57',formula:'ρₜₒᵧ ∼ E⁴    ·    ρΛ ≈ (2.25 meV)⁴',caveatEl:'Η Ε⁴ εκτίμηση είναι μόνο dimensional analysis. Η φυσική κενού και η ανακανονικοποίηση είναι πιο σύνθετες. Η διαφορά ΔΕΝ είναι κυριολεκτική μέτρηση σφάλματος πρόβλεψης.',caveatEn:'The E⁴ estimate is dimensional analysis only. Renormalized vacuum energy is subtler. Gap is NOT a literal measured prediction error.',source:'https://science.nasa.gov/dark-energy/'},
 {id:'bell',number:'08',el:'Bell inequality arena',en:'Bell inequality arena',shortEl:'Άλλαξε γωνίες και θόρυβο, παραβίασε το κλασικό όριο.',shortEn:'Change angles and visibility; test classical bounds.',group:'Foundations',accent:'#9e8cff',formula:'S = |E(a,b)+E(a,b′)+E(a′,b)−E(a′,b′)|',caveatEl:'Ιδεατό μοντέλο δύο φωτονίων με E=−V cos(2Δθ). Η Bell παραβίαση τεκμηριώνει κβαντικές συσχετίσεις, όχι τη θεωρία των πάντων.',caveatEn:'Idealized polarization model E=−V cos(2Δθ). Bell violation confirms quantum correlations, not a theory of everything.',source:'https://www.nobelprize.org/prizes/physics/2022/summary/'},
 {id:'entanglement',number:'09',el:'Βαρύτητα & διεμπλοκή',en:'Gravity-mediated phases',shortEl:'Εξερεύνησε υποθετικές φάσεις δύο μαζών.',shortEn:'Explore hypothetical phase shifts of two masses.',group:'Frontiers',accent:'#5fcaa8',formula:'Δφₜₒᵧ ≈ (Gm²t/ℏ)(1/d−1/2d)',caveatEl:'Απλοποιημένη εκτίμηση διαφοράς βαρυτικής φάσης, ΟΧΙ πλήρες πρωτόκολλο διαπλοκής ή υπολογισμός πειραματικής εφικτότητας.',caveatEn:'Simplified gravitational phase difference, NOT a full entanglement protocol or experimental feasibility calculation.',source:'https://doi.org/10.1103/RevModPhys.97.015006'},
 {id:'waves',number:'10',el:'Βαρυτικό chirp',en:'Gravitational chirp',shortEl:'Πότε συγχωνεύονται δύο μαύρες τρύπες;',shortEn:'When do two black holes merge?',group:'Frontiers',accent:'#f6c45b',formula:'t(f)=5/256 · (GMc/c³)⁻⁵ᐟ³ · (πf)⁻⁸ᐟ³',caveatEl:'Leading-order κυκλικό inspiral χωρίς spin. Ο χρόνος μέχρι συγχώνευση είναι καλή εκτίμηση μόνο για f αρκετά κάτω από f_ISCO. Δεν είναι πλήρης waveform.',caveatEn:'Leading-order circular inspiral without spin. Time to merger is meaningful only well below f_ISCO. Not a full waveform.',source:'https://ligo.org/science-summaries/GW150914/'},
];
export const DEFAULT_PARAMS:Record<LabId,Record<string,number>>={
 planck:{logE:4.134}, couplings:{logQ:12,alphaS:0.1184,susy:0},blackhole:{logM:30.3},
 uncertainty:{logX:-15,stretch:1}, dimensions:{logR:-17,mode:4},higgs:{lambda:0.13,mu:88.4},
 vacuum:{logCutoff:3},bell:{aPrime:45,visibility:1}, entanglement:{logMass:-12,logDist:-4,logTime:0},
 waves:{mass1:36,mass2:29,frequency:35}
};
