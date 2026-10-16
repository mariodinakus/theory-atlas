'use client';
import React from 'react';
export type PlotSeries={name:string,points:[number,number][],color:string,dashed?:boolean};
export function Plot({series,xLabel,yLabel,xRange,yRange,labels=true,height=265,markerX,zeroLine=false}:{series:PlotSeries[],xLabel?:string,yLabel?:string,xRange?:[number,number],yRange?:[number,number],labels?:boolean,height?:number,markerX?:number,zeroLine?:boolean}){
 const all=series.flatMap(s=>s.points).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
 if(!all.length) return null;
 const xs=all.map(p=>p[0]),ys=all.map(p=>p[1]);
 const [xmin,xmax]=xRange??[Math.min(...xs),Math.max(...xs)];
 const yMin0=Math.min(...ys),yMax0=Math.max(...ys),span=yMax0-yMin0||1;
 const [ymin,ymax]=yRange??[yMin0-span*.12,yMax0+span*.12];
 const W=730,H=height,P={l:60,r:18,t:18,b:43};const iw=W-P.l-P.r,ih=H-P.t-P.b;
 const px=(x:number)=>P.l+(x-xmin)/(xmax-xmin||1)*iw;
 const py=(y:number)=>P.t+(ymax-y)/(ymax-ymin||1)*ih;
 const tick=(v:number)=>Math.abs(v)>=10000?v.toExponential(0):Math.abs(v)<.001&&v!==0?v.toExponential(0):Number(v.toFixed(2)).toString();
 return <div className="plot-shell"><svg role="img" aria-label={`${series.map(s=>s.name).join(', ')} chart`} viewBox={`0 0 ${W} ${H}`} className="plot-svg" preserveAspectRatio="xMidYMid meet">
 <defs><linearGradient id="plotGrid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffffff" stopOpacity=".035"/><stop offset="100%" stopColor="#ffffff" stopOpacity=".003"/></linearGradient></defs>
 <rect x={P.l} y={P.t} width={iw} height={ih} rx="10" fill="url(#plotGrid)"/>
 {Array.from({length:5},(_,i)=>{let y=P.t+ih*i/4,v=ymax-(ymax-ymin)*i/4;return <g key={i}><line x1={P.l} x2={W-P.r} y1={y} y2={y} stroke="currentColor" strokeOpacity=".11" strokeDasharray="3 6"/>{labels&&<text x={P.l-12} y={y+4} fontSize="11" textAnchor="end" fill="currentColor" opacity=".58">{tick(v)}</text>}</g>})}
 {Array.from({length:6},(_,i)=>{let x=P.l+iw*i/5,v=xmin+(xmax-xmin)*i/5;return <g key={i}><line x1={x} x2={x} y1={P.t} y2={P.t+ih} stroke="currentColor" strokeOpacity=".06"/>{labels&&<text x={x} y={H-23} fontSize="11" textAnchor="middle" fill="currentColor" opacity=".58">{tick(v)}</text>}</g>})}
 {zeroLine&&ymin<0&&ymax>0&&<line x1={P.l} x2={W-P.r} y1={py(0)} y2={py(0)} stroke="currentColor" strokeOpacity=".5"/>}
 {series.map((s,i)=><polyline key={`${s.name}-${i}`} fill="none" stroke={s.color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={s.dashed?'7 7':undefined} points={s.points.filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1])).map(p=>`${px(p[0])},${py(p[1])}`).join(' ')} />)}
 {markerX!==undefined&&markerX>=xmin&&markerX<=xmax&&<line x1={px(markerX)} x2={px(markerX)} y1={P.t} y2={P.t+ih} stroke="#f8f6f1" strokeWidth="1.6" strokeDasharray="6 5" strokeOpacity=".75"/>}
 {xLabel&&<text x={W/2} y={H-2} fontSize="12" textAnchor="middle" fill="currentColor" opacity=".65">{xLabel}</text>}
 {yLabel&&<text x={16} y={H/2} fontSize="12" textAnchor="middle" fill="currentColor" opacity=".65" transform={`rotate(-90 16 ${H/2})`}>{yLabel}</text>}
 </svg><div className="plot-legend">{series.map((s,i)=><span key={i}><i style={{background:s.color}}/>{s.name}</span>)}</div></div>
}
export function LogMeter({value,start,end,accent='#ff775d',label}:{value:number,start:number,end:number,accent?:string,label?:string}){
 let p=Math.max(0,Math.min(100,100*(value-start)/(end-start)));
 return <div className="log-meter"><div className="log-meter-track"><span style={{width:`${p}%`,background:accent}}/><b style={{left:`${p}%`,background:accent}}/></div><div className="log-meter-label"><span>10^{start}</span>{label&&<em>{label}</em>}<span>10^{end}</span></div></div>
}
export function Metric({label,value,sub,accent}:{label:string,value:string,sub?:string,accent?:string}){
 return <div className="metric-box" style={accent?{'--metric-accent':accent} as React.CSSProperties:undefined}><div className="metric-label">{label}</div><div className="metric-value">{value}</div>{sub&&<div className="metric-sub">{sub}</div>}</div>
}
export function Slider({label,value,onChange,min,max,step=.01,unit='',details}:{label:string,value:number,onChange:(n:number)=>void,min:number,max:number,step?:number,unit?:string,details?:string}){
 return <label className="slider-control"><span className="slider-line"><strong>{label}</strong><span className="slider-reading">{Number(value.toFixed(4)).toLocaleString('en-US')} {unit}</span></span><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{'--slider-pct':`${(value-min)/(max-min)*100}%`} as React.CSSProperties}/><span className="slider-scale"><span>{min}</span>{details&&<small>{details}</small>}<span>{max}</span></span></label>
}
