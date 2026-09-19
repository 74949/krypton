export type IndustryProfile = {
  id: string;
  name: string;
  branches: string[];
  need: number;
  aiExposure: number;
  baseRisk: number;
  lossMin: number;
  lossMax: number;
  currency: "USD";
  lossDrivers: string[];
  sensitiveData: string[];
};

export const industryProfiles: IndustryProfile[] = [
  { id:"healthcare", name:"Healthcare", branches:["Hospitals","Clinics","Diagnostic laboratories","Telemedicine"], need:96, aiExposure:89, baseRisk:92, lossMin:1.6, lossMax:10.9, currency:"USD", lossDrivers:["Patient-data exposure","Clinical disruption","Regulatory response"], sensitiveData:["Health records","Diagnostics","Identity data"] },
  { id:"technology", name:"IT & Technology", branches:["Software companies","SaaS providers","BPO & support","AI companies"], need:95, aiExposure:97, baseRisk:91, lossMin:1.2, lossMax:8.4, currency:"USD", lossDrivers:["Source-code leakage","Credential compromise","Client-data exposure"], sensitiveData:["Source code","API keys","Customer environments"] },
  { id:"manufacturing", name:"Manufacturing", branches:["Automotive","Electronics","Industrial machinery","Textiles"], need:88, aiExposure:76, baseRisk:86, lossMin:1.1, lossMax:9.8, currency:"USD", lossDrivers:["Production interruption","Design theft","Supply-chain impact"], sensitiveData:["CAD files","Trade secrets","Supplier contracts"] },
  { id:"finance", name:"Financial Services", branches:["Banks","Fintech","NBFCs","Insurance"], need:98, aiExposure:91, baseRisk:95, lossMin:2.4, lossMax:14.2, currency:"USD", lossDrivers:["Financial fraud","Regulatory penalties","Customer attrition"], sensitiveData:["Account data","Transactions","KYC records"] },
  { id:"pharma", name:"Pharmaceuticals", branches:["Drug manufacturers","Research laboratories","Clinical research","Distribution"], need:94, aiExposure:84, baseRisk:91, lossMin:2.1, lossMax:15.5, currency:"USD", lossDrivers:["Research theft","Trial-data exposure","Operational delay"], sensitiveData:["Molecule data","Trial records","Formulations"] },
  { id:"education", name:"Education", branches:["Universities","Schools","EdTech","Research institutes"], need:79, aiExposure:90, baseRisk:77, lossMin:.35, lossMax:3.6, currency:"USD", lossDrivers:["Student-data exposure","Research loss","Service interruption"], sensitiveData:["Student records","Research","Credentials"] },
  { id:"government", name:"Government", branches:["Public departments","Municipal bodies","Public-sector units","Citizen services"], need:97, aiExposure:78, baseRisk:94, lossMin:2.8, lossMax:18.5, currency:"USD", lossDrivers:["Citizen-data exposure","Service disruption","National-security impact"], sensitiveData:["Citizen records","Policy documents","Restricted data"] },
  { id:"retail", name:"Retail & E-commerce", branches:["Marketplaces","Retail chains","Consumer brands","Payment operations"], need:86, aiExposure:92, baseRisk:84, lossMin:.8, lossMax:6.1, currency:"USD", lossDrivers:["Payment exposure","Fraud","Customer-trust loss"], sensitiveData:["Payment data","Customer profiles","Pricing"] },
  { id:"telecom", name:"Telecommunications", branches:["Network operators","Infrastructure providers","ISPs","Service partners"], need:93, aiExposure:82, baseRisk:92, lossMin:2.3, lossMax:13.7, currency:"USD", lossDrivers:["Network disruption","Subscriber exposure","Infrastructure compromise"], sensitiveData:["Subscriber data","Network maps","Call metadata"] },
  { id:"logistics", name:"Logistics & Supply Chain", branches:["Warehousing","Transport","Shipping","Supply-chain platforms"], need:83, aiExposure:73, baseRisk:82, lossMin:.7, lossMax:5.9, currency:"USD", lossDrivers:["Delivery disruption","Route exposure","Partner compromise"], sensitiveData:["Routes","Manifests","Partner data"] },
  { id:"legal", name:"Legal & Consulting", branches:["Law firms","Compliance firms","Advisory","Audit practices"], need:92, aiExposure:94, baseRisk:89, lossMin:.9, lossMax:7.2, currency:"USD", lossDrivers:["Privilege breach","Client-data exposure","Reputation loss"], sensitiveData:["Case files","Contracts","Client strategy"] },
  { id:"energy", name:"Energy & Utilities", branches:["Power","Oil & gas","Renewables","Water utilities"], need:95, aiExposure:71, baseRisk:96, lossMin:3.1, lossMax:22.4, currency:"USD", lossDrivers:["Critical-service outage","Safety impact","Infrastructure compromise"], sensitiveData:["Grid operations","Plant data","Infrastructure plans"] },
];
