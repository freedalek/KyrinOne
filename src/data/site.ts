
export interface Localized {
  en: string;
  zh: string;
}

export const identity = {
  // "kyrin.one" — the "in" substring is highlighted in the UI.
  brand: 'kyrin.one',
  brandHighlight: 'in',
  // Alternate spaced form of the title.
  title: 'kyrin one',
  role: { en: 'Digital Investigator', zh: '数字调查员' } as Localized,
  sloganEn: 'Key Your Reasoning INto ONE',
  sloganEnHighlight: ['IN'],
  sloganZh: '将你的思考汇聚于一',
  sloganZhHighlight: ['汇聚'],
  subline: {
    en: 'Digital investigator. I trace data leaks, reconstruct attack paths and hunt dormant threats — turning scattered signals into a coherent picture.',
    zh: '数字调查员。追踪数据泄漏、还原攻击路径、狩猎潜伏威胁——把零散信号拼成完整图景。',
  } as Localized,
};

export interface Service {
  icon: string;
  title: Localized;
  desc: Localized;
}

// Layer 2 — core business (available for engagement).
export const coreServices: Service[] = [
  {
    icon: '◉',
    title: { en: 'Digital Investigation', zh: '数字调查' },
    desc: {
      en: 'Reconstruct incident timelines and user activities through analysis of system artifacts and security tool telemetry. Cross-validate evidence from multiple sources to eliminate false positives and establish reliable facts.',
      zh: '通过系统痕迹与安全软件事件记录，还原事件时间线与用户操作全貌。多源证据交叉验证，排除误报，建立可靠事实。',
    },
  },
  {
    icon: '◇',
    title: { en: 'Data Leak Investigation', zh: '数据泄漏调查' },
    desc: {
      en: 'Locate the leak source, assess the blast radius and trace where the data went — attribution for breaches and leaks.',
      zh: '定位泄漏源头、评估影响范围、追踪数据去向——为数据泄漏事件提供归因。',
    },
  },
  {
    icon: '◈',
    title: { en: 'Threat Analysis', zh: '威胁分析' },
    desc: {
      en: 'Parse attack chains, IOCs and TTPs from SIEM alerts, proxy logs and endpoint telemetry. Correlate suspicious activities to determine scope and intent — understanding the who, how and why behind the attack.',
      zh: '基于 SIEM 告警、代理日志与终端遥测解析攻击链、IOC 与 TTP。关联可疑活动以判定影响范围与攻击意图——解析攻击背后的「谁、如何、为何」。',
    },
  },
  {
    icon: '◆',
    title: { en: 'Threat Hunting', zh: '威胁狩猎' },
    desc: {
      en: 'Hypothesis-driven proactive search for dormant threats across endpoints, networks and logs — using MITRE ATT&CK as a reference framework.',
      zh: '假设驱动的主动式搜索——以 MITRE ATT&CK 为参考框架，在端点、网络与日志中狩猎潜伏威胁。',
    },
  },
];

// Currently researching / learning — future service lines (shown as in-progress).
export const roadmap: Service[] = [
  {
    icon: '◔',
    title: { en: 'AI-Augmented', zh: 'AI 增强' },
    desc: {
      en: 'Enhancing workflows with locally deployed LLMs to automate workflow while ensuring data security.',
      zh: '基于本地部署的大模型增强工作流，在保障数据安全的前提下，实现工作流自动化。',
    },
  },
  {
    icon: '◔',
    title: { en: 'Deep Endpoint Data Flow', zh: '深度终端数据流取证' },
    desc: {
      en: 'Systematic study of USN Journal, MFT ($MFT, $LogFile), AmCache, ShimCache, and Sysmon Event IDs for precise file-timeline reconstruction.',
      zh: '系统性研究 USN Journal、MFT（$MFT、$LogFile）、AmCache、ShimCache 以及 Sysmon 事件 ID，实现精确的文件时间线重建。',
    },
  },
  {
    icon: '◔',
    title: { en: 'AI Security', zh: 'AI 安全' },
    desc: {
      en: 'Attacks and defenses against AI systems, and AI-augmented/automated cyber offense and defense.',
      zh: 'AI 系统自身攻防安全，以及 AI 增强/自动化网络攻防。',
    },
  },
  {
    icon: '◔',
    title: { en: 'Reverse Engineering & Web3', zh: '逆向工程与 Web3' },
    desc: {
      en: 'Firmware/Binary reverse engineering and on-chain forensic tracing (long-term research, not yet service-ready).',
      zh: '固件/二进制逆向与链上溯源（长期研究储备，暂不对外提供服务）。',
    },
  },
];

export interface Contact {
  /** i18n key for the label (see src/i18n/ui.ts). */
  labelKey: string;
  value: string;
  href?: string;
  /** show a copy-to-clipboard button for the value */
  copy?: boolean;
  /** optional QR image path (relative to /public) shown in a lightbox */
  qr?: string;
}

// Layer 4 — contact channels.
export const contacts: Contact[] = [
  {
    labelKey: 'contact.email',
    value: 'kyrin@kyrin.one',
    href: 'mailto:kyrin@kyrin.one',
  },
  {
    labelKey: 'contact.github',
    value: 'github.com/freedalek',
    href: 'https://github.com/freedalek',
  },
  {
    labelKey: 'contact.phone',
    value: '+86 133 5865 9630',
    href: 'tel:+8613358659630',
  },
  {
    labelKey: 'contact.wechat',
    value: '13358659630',
    copy: true,
    qr: '/images/wechat-qr.webp',
  },
];
