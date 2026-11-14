import { FormEvent, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { isSupabaseConfigured, submitDiscovery } from "../lib/supabase";

const industries = ["Professional Services", "Real Estate & Property", "Hospitality & Tourism", "Health, Wellness & Beauty", "Retail & E-commerce", "Manufacturing & Production", "Construction & Engineering", "Education & Training", "Logistics & Transportation", "Technology", "Agriculture", "Non-profit / Social Enterprise", "Other"];
const platforms = ["Website", "Google Business Profile", "Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube", "WhatsApp Business", "Email marketing", "E-commerce / booking platform", "None currently"];
const systems = ["CRM / customer database", "Accounting / finance", "Inventory / stock", "HR / payroll", "Booking / order management", "POS / payment systems", "ERP", "Email / team collaboration", "Marketing automation", "None currently"];
const challenges = ["Low visibility / brand awareness", "Not getting enough enquiries or leads", "Poor lead follow-up or conversion", "Website is outdated or ineffective", "No clear digital strategy", "Manual / repetitive business processes", "Disconnected business systems", "Poor customer retention", "Limited reporting / performance insight", "Scaling operations", "Other"];
const outcomes = ["Increase qualified leads", "Increase sales / revenue", "Improve brand visibility", "Launch or improve website / digital platforms", "Automate business processes", "Improve customer experience", "Improve lead management and conversion", "Improve operational efficiency", "Build a stronger digital foundation", "Enter new markets", "Other"];
const successMeasures = ["More enquiries / leads", "More bookings / appointments", "More sales / revenue", "Higher website traffic", "Better conversion rate", "Reduced operating time / cost", "Improved customer retention", "More efficient reporting", "Successful launch / implementation", "Other"];
const budgets = ["Below ₦100,000", "₦100,000 – ₦250,000", "₦250,000 – ₦500,000", "₦500,000 – ₦1,000,000", "₦1,000,000 – ₦3,000,000", "Above ₦3,000,000", "Not determined yet", "Prefer to discuss privately"];
const timelines = ["Immediately", "Within 2–4 weeks", "Within 1–3 months", "Within 3–6 months", "Exploring / no fixed timeline"];
const channels = ["WhatsApp", "Phone call", "Email", "Video meeting", "In-person meeting"];
const priorities = ["Business growth and customer acquisition", "Digital marketing and brand visibility", "Website and digital platforms", "Business systems and automation", "Technology / IT infrastructure", "HR systems and workforce solutions", "Strategy and business advisory", "Not sure yet — need guidance"];

type FormState = Record<string, string | string[]>;
const initial: FormState = {
  businessName:"", industry:"", location:"", website:"", businessAge:"", description:"",
  contactName:"", role:"", email:"", phone:"", preferredChannel:"WhatsApp", preferredTime:"",
  offerings:"", priorityOffer:"", targetCustomers:[], marketArea:"", platforms:[], systems:[],
  digitalMaturity:"", previousInvestment:"", previousResults:"", challenges:[], mainPriority:"",
  desiredOutcomes:[], successMeasures:[], timeline:"", budget:"", decisionMaker:"", otherNotes:"", consent:"yes",
};

function Field({label, children, required=false}:{label:string;children:React.ReactNode;required?:boolean}) {
  return <label className="flex flex-col gap-2"><span className="text-xs uppercase tracking-[.14em] text-white/55">{label}{required && <b className="text-cyan"> *</b>}</span>{children}</label>;
}
function TextInput({value,onChange,placeholder="",type="text",required=false}:{value:string;onChange:(v:string)=>void;placeholder?:string;type?:string;required?:boolean}) {
  return <input required={required} type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan placeholder:text-white/25"/>;
}
function SelectInput({value,onChange,options,required=false}:{value:string;onChange:(v:string)=>void;options:string[];required?:boolean}) {
  return <select required={required} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0a0c10] px-4 py-3 text-sm text-white outline-none focus:border-cyan"><option value="">Select an option</option>{options.map(o=><option key={o}>{o}</option>)}</select>;
}
function CheckGroup({options,value,onChange}:{options:string[];value:string[];onChange:(v:string[])=>void}) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map(o=><label key={o} className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${value.includes(o)?"border-cyan/60 bg-cyan/10 text-white":"border-white/10 text-white/65 hover:border-white/25"}`}><input type="checkbox" checked={value.includes(o)} onChange={e=>onChange(e.target.checked?[...value,o]:value.filter(x=>x!==o))} className="mt-1 accent-cyan"/><span>{o}</span></label>)}</div>;
}
function Section({number,title,description,children}:{number:string;title:string;description:string;children:React.ReactNode}) {
  const [open,setOpen] = useState(true);
  return <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">
    <button type="button" onClick={()=>setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"><span className="flex items-start gap-4"><span className="text-xs tracking-widest text-cyan">{number}</span><span><strong className="block text-base text-white sm:text-lg">{title}</strong><span className="mt-1 block text-xs text-white/40">{description}</span></span></span>{open?<ChevronUp className="shrink-0 text-white/45"/>:<ChevronDown className="shrink-0 text-white/45"/>}</button>
    {open&&<div className="grid gap-5 border-t border-white/10 p-5 sm:grid-cols-2 sm:p-7">{children}</div>}
  </section>;
}

export default function BusinessDiscovery() {
  useTitle("Business Growth & Discovery");
  const [form,setForm]=useState<FormState>(initial);
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const set=(key:string,value:string|string[])=>setForm(p=>({...p,[key]:value}));
  const submit=async(e:FormEvent)=>{
    e.preventDefault(); setStatus("sending"); setError("");
    try { await submitDiscovery(form); setStatus("success"); window.scrollTo({top:0,behavior:"smooth"}); }
    catch(err){setError(err instanceof Error?err.message:"Unable to submit. Please try again.");setStatus("error");}
  };
  const ready=isSupabaseConfigured();
  if(status==="success") return <div className="min-h-screen px-5 pb-24 pt-36"><div className="mx-auto max-w-xl rounded-3xl border border-cyan/20 bg-white/[.03] p-10 text-center"><CheckCircle2 size={48} className="mx-auto mb-5 text-cyan"/><p className="mb-3 text-xs uppercase tracking-[.25em] text-cyan">Submission received</p><h1 className="mb-4 text-3xl font-semibold text-white">Thank you for sharing your business goals.</h1><p className="text-sm leading-7 text-white/60">Our team will review your responses and contact you through your preferred channel to discuss practical next steps.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Return to website <ArrowRight size={16}/></Link></div></div>;
  return <div className="min-h-screen px-5 pb-24 pt-32 sm:px-8">
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center"><p className="mb-5 text-xs uppercase tracking-[.28em] text-cyan">Business Growth & Discovery</p><h1 className="hero-heading mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Let's understand your business — <span className="text-cyan">then build what moves it forward.</span></h1><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55">This short discovery helps us understand your business, existing digital environment, growth priorities and the outcomes you want to achieve. It takes approximately 5–7 minutes.</p><div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs text-white/45"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-cyan"/> Your information is treated confidentially</span><span>•</span><span>Approximately 5–7 minutes</span></div></div>
      {!ready&&<div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm text-amber-100/80">The form is being configured and is not accepting submissions yet.</div>}
      <form onSubmit={submit} className="space-y-4">
        <Section number="01" title="Business profile" description="Tell us about the organisation and what it does.">
          <Field label="Business / organisation name" required><TextInput value={form.businessName as string} onChange={v=>set("businessName",v)} placeholder="Registered or trading name" required/></Field>
          <Field label="Industry / sector" required><SelectInput value={form.industry as string} onChange={v=>set("industry",v)} options={industries} required/></Field>
          <Field label="Business location" required><TextInput value={form.location as string} onChange={v=>set("location",v)} placeholder="City, State, Country" required/></Field>
          <Field label="Website or primary online link"><TextInput value={form.website as string} onChange={v=>set("website",v)} placeholder="https://"/></Field>
          <Field label="How long has the business operated?"><SelectInput value={form.businessAge as string} onChange={v=>set("businessAge",v)} options={["Pre-launch / idea stage","Less than 1 year","1–3 years","4–7 years","8–15 years","Over 15 years"]}/></Field>
          <Field label="Briefly describe the business"><textarea rows={3} value={form.description as string} onChange={e=>set("description",e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-white outline-none focus:border-cyan" placeholder="What do you offer and who do you serve?"/></Field>
        </Section>
        <Section number="02" title="Contact & communication" description="Who should we speak with and how should we reach you?">
          <Field label="Contact person's full name" required><TextInput value={form.contactName as string} onChange={v=>set("contactName",v)} required/></Field>
          <Field label="Role / position"><SelectInput value={form.role as string} onChange={v=>set("role",v)} options={["Owner / Founder","CEO / Managing Director","Director / Partner","Manager / Department Head","Marketing / Communications","Operations / Administration","Other"]}/></Field>
          <Field label="Business email" required><TextInput type="email" value={form.email as string} onChange={v=>set("email",v)} required/></Field>
          <Field label="Phone / WhatsApp number" required><TextInput value={form.phone as string} onChange={v=>set("phone",v)} placeholder="+234..." required/></Field>
          <Field label="Preferred contact channel"><SelectInput value={form.preferredChannel as string} onChange={v=>set("preferredChannel",v)} options={channels}/></Field>
          <Field label="Preferred contact time"><SelectInput value={form.preferredTime as string} onChange={v=>set("preferredTime",v)} options={["Morning","Afternoon","Evening","Any convenient time"]}/></Field>
        </Section>
        <Section number="03" title="Products, services & customers" description="Understand your commercial focus and target market.">
          <Field label="Main products / services offered" required><textarea required rows={3} value={form.offerings as string} onChange={e=>set("offerings",e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-white outline-none focus:border-cyan" placeholder="List your main products or services"/></Field>
          <Field label="Priority product / service to grow"><TextInput value={form.priorityOffer as string} onChange={v=>set("priorityOffer",v)} placeholder="Which offer matters most right now?"/></Field>
          <Field label="Who are your target customers?"><TextInput value={form.targetCustomers as string} onChange={v=>set("targetCustomers",v)} placeholder="Individuals, SMEs, corporates, government..."/></Field>
          <Field label="Where do you currently serve customers?"><SelectInput value={form.marketArea as string} onChange={v=>set("marketArea",v)} options={["Within my immediate city / locality","Across my state","Across Nigeria","Across Africa","International / global","Online / location-independent"]}/></Field>
        </Section>
        <Section number="04" title="Digital presence & business systems" description="Select what your business currently uses.">
          <div className="sm:col-span-2"><Field label="Current digital platforms"><CheckGroup options={platforms} value={form.platforms as string[]} onChange={v=>set("platforms",v)}/></Field></div>
          <div className="sm:col-span-2"><Field label="Business / operational systems in use"><CheckGroup options={systems} value={form.systems as string[]} onChange={v=>set("systems",v)}/></Field></div>
          <Field label="How would you describe your current digital setup?"><SelectInput value={form.digitalMaturity as string} onChange={v=>set("digitalMaturity",v)} options={["No formal digital setup yet","Basic presence — a few social pages","Growing — website and some tools","Established — multiple platforms and systems","Integrated — systems work together","Not sure"]}/></Field>
          <Field label="Have you previously invested in digital / technology solutions?"><SelectInput value={form.previousInvestment as string} onChange={v=>set("previousInvestment",v)} options={["Yes, and it delivered good results","Yes, but results were limited","Yes, but implementation was unsuccessful","No, not yet","Prefer not to say"]}/></Field>
          <div className="sm:col-span-2"><Field label="What worked or did not work?"><textarea rows={3} value={form.previousResults as string} onChange={e=>set("previousResults",e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-white outline-none focus:border-cyan" placeholder="Optional context"/></Field></div>
        </Section>
        <Section number="05" title="Challenges & growth priorities" description="Help us identify where support can make the greatest difference.">
          <div className="sm:col-span-2"><Field label="What are your current business challenges?"><CheckGroup options={challenges} value={form.challenges as string[]} onChange={v=>set("challenges",v)}/></Field></div>
          <Field label="What is your most important priority right now?" required><SelectInput value={form.mainPriority as string} onChange={v=>set("mainPriority",v)} options={priorities} required/></Field>
          <div className="sm:col-span-2"><Field label="What outcomes would you like to achieve?"><CheckGroup options={outcomes} value={form.desiredOutcomes as string[]} onChange={v=>set("desiredOutcomes",v)}/></Field></div>
          <div className="sm:col-span-2"><Field label="How would you measure success?"><CheckGroup options={successMeasures} value={form.successMeasures as string[]} onChange={v=>set("successMeasures",v)}/></Field></div>
        </Section>
        <Section number="06" title="Engagement & readiness" description="A few practical details to help us recommend a realistic next step.">
          <Field label="When would you like to begin?"><SelectInput value={form.timeline as string} onChange={v=>set("timeline",v)} options={timelines}/></Field>
          <Field label="Is there an indicative budget for this initiative?"><SelectInput value={form.budget as string} onChange={v=>set("budget",v)} options={budgets}/></Field>
          <Field label="Are you involved in approving this engagement?"><SelectInput value={form.decisionMaker as string} onChange={v=>set("decisionMaker",v)} options={["Yes, I make the final decision","I share the decision with others","I will recommend to the decision-maker","No, I am gathering information"]}/></Field>
          <Field label="Anything else we should know?"><textarea rows={3} value={form.otherNotes as string} onChange={e=>set("otherNotes",e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-white outline-none focus:border-cyan" placeholder="Additional context, constraints or expectations"/></Field>
        </Section>
        <label className="flex items-start gap-3 rounded-xl border border-white/10 p-4 text-xs leading-6 text-white/55"><input type="checkbox" checked={form.consent==="yes"} onChange={e=>set("consent",e.target.checked?"yes":"no")} required className="mt-1 accent-cyan"/><span>I agree that Martinez Knight may use the information provided to assess my business requirements and contact me about relevant services. My information will not be published or shared for unrelated marketing.</span></label>
        {error&&<p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-200">{error}</p>}
        <button disabled={!ready||status==="sending"} className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-40">{status==="sending"?"Submitting...":"Submit business discovery"} <ArrowRight size={17}/></button>
        <p className="text-center text-[11px] leading-5 text-white/30">Submitting this form does not create a service contract or financial commitment.</p>
      </form>
    </div>
  </div>;
}
