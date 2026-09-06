/**
 * Exhaustive Technical Keyword Taxonomy for LearnWithPugazh
 * High-intent search queries targeting developers, network engineers,
 * systems administrators, and computer science students.
 */

export const GLOBAL_KEYWORDS: string[] = [
  'LearnWithPugazh',
  'Pugazhmani K',
  '@learnwithpugazh',
  'systems engineering',
  'computer networking tutorials',
  'interactive networking labs',
  'Cisco packet tracer guide',
  'Linux server administration',
  'fullstack web development',
  'RFC standards explained',
  'packet capture analysis',
  'practical technology education',
  'developer roadmaps 2026',
  'hands-on engineering sandboxes',
  'infrastructure from first principles'
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  networking: [
    'computer networking course',
    'OSI 7 layer model explained',
    'TCP IP protocol suite',
    'IPv4 addressing RFC 1918',
    'CIDR subnetting calculator VLSM',
    'VLAN 802.1Q trunking configuration',
    'Inter-VLAN routing router on a stick',
    'Cisco switch and router CLI',
    'OSPF single area Dijkstra SPF',
    'Wireshark packet capture analysis',
    'DNS recursive iterative resolution',
    'DHCP DORA 4-way handshake',
    'ARP table gratuitous ARP',
    'NAT PAT port address translation',
    'Access Control Lists ACL standard extended',
    'stateful inspection firewall architecture',
    'CCNA networking study guide'
  ],
  'web-development': [
    'modern web development roadmap',
    'React 19 architecture Virtual DOM',
    'React Fiber reconciliation algorithm',
    'TypeScript strict type system interfaces generics',
    'JavaScript event loop call stack microtask queue',
    'asynchronous JavaScript promises async await',
    'RESTful API design idempotency status codes',
    'JWT authentication refresh token rotation',
    'HTTP-only secure cookies session management',
    'CSS box model flexbox grid responsive layout',
    'relational database schema design 3NF normalization',
    'ACID transactions SQL indexing performance',
    'frontend systems design and state machines'
  ],
  'linux-servers': [
    'Linux server administration guide',
    'Unix philosophy standard streams stdin stdout stderr',
    'Linux file permissions chmod chown octal math',
    'SUID SGID sticky bit umask permissions',
    'systemd unit files service creation journalctl',
    'Linux process management signals SIGTERM SIGKILL',
    'SSH hardening ed25519 vs RSA 2048 keys',
    'Linux network diagnostics ip ss netstat tcpdump',
    'production Linux server hardening checklist',
    'bash shell scripting and POSIX standards',
    'sysadmin troubleshooting methodology'
  ]
};

export const TOPIC_SPECIFIC_KEYWORDS: Record<string, string[]> = {
  dns: [
    'DNS resolution flow',
    'domain name system explained',
    'root nameservers TLD authoritative',
    'DNS recursive resolver 1.1.1.1 8.8.8.8',
    'DNS record types A AAAA CNAME MX TXT PTR',
    'dig trace commands',
    'nslookup DNS debugging',
    'UDP port 53 vs TCP port 53 DNS',
    'DNS cache poisoning defense'
  ],
  vlan: [
    'VLAN configuration Cisco',
    'Virtual LAN 802.1Q tagging',
    'broadcast domain segmentation',
    'access port vs trunk port',
    'native VLAN security',
    'VLAN hopping mitigation',
    'switchport mode access switchport trunk'
  ],
  'osi-model': [
    'OSI model 7 layers breakdown',
    'Physical Data Link Network Transport Session Presentation Application',
    'packet encapsulation and decapsulation',
    'PDU protocol data units frame packet segment bit',
    'Layer 2 vs Layer 3 switching',
    'OSI vs TCP IP comparison'
  ],
  'tcp-ip-model': [
    'TCP IP 4 layer model',
    'Transmission Control Protocol vs UDP',
    'TCP 3-way handshake SYN SYN-ACK ACK',
    'TCP 4-way termination FIN ACK',
    'sliding window flow control congestion control'
  ],
  subnetting: [
    'subnetting tutorial for beginners',
    'VLSM variable length subnet masking',
    'CIDR slash notation /24 /28 /30',
    'subnet mask binary calculation',
    'usable host IP calculation formula',
    'network address broadcast address calculator'
  ],
  ipv4: [
    'IPv4 address structure 32 bit',
    'IPv4 classes Class A B C D E',
    'private IP address ranges 10.0.0.0 172.16.0.0 192.168.0.0',
    'RFC 1918 private networking',
    'loopback address 127.0.0.1 APIPA 169.254.0.0'
  ],
  ipv6: [
    'IPv6 128-bit hexadecimal addressing',
    'IPv6 neighbor discovery protocol NDP',
    'IPv6 global unicast link-local SLAAC',
    'IPv4 vs IPv6 migration dual stack'
  ],
  nat: [
    'NAT vs PAT differences',
    'Network Address Translation inside local inside global',
    'Port Address Translation overload',
    'port forwarding router configuration',
    'carrier grade NAT CGNAT'
  ],
  dhcp: [
    'DHCP DORA process Discover Offer Request Acknowledge',
    'DHCP lease time renewal allocation',
    'DHCP relay agent ip helper-address',
    'DHCP scope options 003 gateway 006 dns'
  ],
  arp: [
    'ARP Address Resolution Protocol',
    'ARP request broadcast ARP reply unicast',
    'ARP cache table inspection arp -a',
    'gratuitous ARP duplicate IP detection',
    'ARP poisoning and spoofing mitigation DAI'
  ],
  icmp: [
    'ICMP Internet Control Message Protocol',
    'ping echo request echo reply RFC 792',
    'traceroute TTL time to live expiration',
    'ICMP destination unreachable message codes'
  ],
  'http-https': [
    'HTTP vs HTTPS encryption TLS 1.3',
    'TLS handshake symmetric vs asymmetric encryption',
    'HTTP 1.1 keep-alive HTTP 2 multiplexing HTTP 3 QUIC',
    'SSL certificates CA public key infrastructure'
  ],
  'ethernet-switching': [
    'Ethernet switching fundamentals',
    'CAM table MAC address learning',
    'unicast forwarding vs unknown unicast flooding',
    'store and forward vs cut through switching'
  ],
  trunking: [
    '802.1Q trunking protocol encapsulation',
    'switch-to-switch link aggregation',
    'VLAN tagging 4 byte header tag protocol identifier',
    'DTP dynamic trunking protocol disabling'
  ],
  'inter-vlan-routing-topic': [
    'Inter-VLAN routing methods',
    'Router-on-a-stick subinterfaces encapsulation dot1q',
    'Layer 3 switch SVI switched virtual interface',
    'routing between VLANs default gateway'
  ],
  stp: [
    'Spanning Tree Protocol 802.1D RSTP 802.1w',
    'bridge protocol data units BPDU',
    'root bridge election priority MAC address',
    'STP port states blocking listening learning forwarding',
    'loop prevention broadcast storms'
  ],
  'static-routing-topic': [
    'static routing Cisco CLI ip route',
    'default static route 0.0.0.0 0.0.0.0',
    'administrative distance AD static route',
    'next-hop IP vs exit interface'
  ],
  'dynamic-routing': [
    'dynamic routing protocols comparison',
    'distance vector vs link state vs path vector',
    'routing metrics hop count cost bandwidth delay',
    'convergence time routing loops split horizon'
  ],
  ospf: [
    'OSPF Open Shortest Path First tutorial',
    'OSPF Area 0 backbone link state advertisements LSA',
    'Dijkstra shortest path first algorithm',
    'OSPF neighbor states down init 2-way exstart exchange loading full',
    'DR BDR election designated router'
  ],
  rip: [
    'RIP Routing Information Protocol v1 v2',
    'hop count maximum 15 metric',
    'RIP split horizon with poison reverse',
    'RIP update timer 30 seconds UDP 520'
  ],
  acl: [
    'Access Control Lists Cisco standard extended',
    'wildcard mask calculation vs subnet mask',
    'inbound vs outbound ACL placement',
    'implicit deny any at end of ACL',
    'named ACL vs numbered ACL'
  ],
  firewalls: [
    'stateful inspection firewall rules',
    'packet filtering vs stateful vs application proxy',
    'connection state table ESTABLISHED RELATED',
    'DMZ demilitarized zone perimeter security'
  ],
  wireshark: [
    'Wireshark packet capture analysis guide',
    'pcap filter syntax tcp.port == 80 ip.addr',
    'TCP stream following TCP retransmissions',
    'TCP window size zero window RST flag analysis'
  ],
  'how-the-web-works': [
    'how the web works step by step',
    'browser navigation lifecycle DNS TCP TLS HTTP rendering',
    'critical rendering path DOM CSSOM render tree paint'
  ],
  'html5-semantics': [
    'HTML5 semantic elements main header article section',
    'accessibility ARIA landmarks screen readers',
    'SEO friendly HTML document structuring'
  ],
  'css-box-model': [
    'CSS box model content padding border margin',
    'box-sizing border-box margin collapse',
    'flexbox vs grid layout architecture',
    'responsive modern CSS media queries'
  ],
  'js-event-loop': [
    'JavaScript event loop concurrency model',
    'call stack Web APIs microtask queue macrotask queue',
    'Promise.then vs setTimeout execution order',
    'requestAnimationFrame rendering cycle'
  ],
  typescript: [
    'TypeScript strict mode type safety',
    'interfaces vs type aliases union types',
    'generics keyof typeof type narrowing',
    'TypeScript compiler tsconfig best practices'
  ],
  'async-await': [
    'JavaScript promises async await error handling',
    'Promise.all Promise.allSettled Promise.race',
    'try catch finally with asynchronous code',
    'unhandled promise rejection debugging'
  ],
  react: [
    'React 19 architecture Virtual DOM',
    'React Fiber reconciliation diffing algorithm',
    'pure components idempotent rendering',
    'hooks rules lifecycle useEffect useState'
  ],
  'react-state-management': [
    'React state management patterns',
    'lifting state up useReducer context API',
    'custom hooks composition reusable state logic'
  ],
  'rest-api-design': [
    'RESTful API design best practices',
    'HTTP methods GET POST PUT PATCH DELETE',
    'idempotency REST API status codes 200 201 400 401 403 404 500',
    'API pagination filtering versioning'
  ],
  'jwt-auth': [
    'JWT JSON Web Token authentication flow',
    'JWT header payload signature HMAC SHA256',
    'access token refresh token rotation',
    'HTTP-only cookies XSS and CSRF prevention'
  ],
  'unix-philosophy': [
    'Unix philosophy do one thing well',
    'standard streams stdin stdout stderr pipes',
    'redirection operators > >> < 2>&1',
    'POSIX shell fundamentals'
  ],
  'linux-permissions': [
    'Linux file permissions chmod chown tutorial',
    'octal permission notation 755 644 600',
    'SUID SGID sticky bit 4755 2755 1777',
    'umask calculation default permissions'
  ],
  'users-and-groups': [
    'Linux user management useradd groupadd',
    '/etc/passwd /etc/shadow /etc/group files',
    'sudoers file visudo permission configuration'
  ],
  'linux-processes': [
    'Linux process management ps top htop',
    'PID PPID fork exec process lifecycle',
    'kill signals SIGTERM 15 SIGKILL 9 SIGHUP 1',
    'background processes jobs fg bg nohup systemd'
  ],
  'systemd-services': [
    'systemd custom service unit file creation',
    'systemctl enable start stop status restart',
    'journalctl log filtering -u service -f',
    'Restart=always WantedBy=multi-user.target'
  ],
  ssh: [
    'SSH server hardening best practices',
    'Ed25519 vs RSA 2048 key authentication',
    'sshd_config PasswordAuthentication no PermitRootLogin no',
    'ssh-agent ssh-keygen -t ed25519',
    'jump host bastion server SSH tunneling'
  ],
  'linux-network-tools': [
    'Linux network commands ip addr ip route',
    'ss command vs netstat listening ports ss -tuln',
    'curl wget tcpdump traceroute ping diagnostics'
  ]
};

export const LAB_SPECIFIC_KEYWORDS: Record<string, string[]> = {
  'inter-vlan-routing': [
    'Cisco Packet Tracer inter VLAN routing lab',
    'router on a stick ROAS configuration',
    'subinterfaces Gi0/0.10 Gi0/0.20 dot1q',
    'Cisco 2960 switch trunk Gi0/1 1941 router',
    'CCNA inter-VLAN routing step-by-step',
    'cross-VLAN ICMP verification',
    'Packet Tracer download topology'
  ],
  'cisco-ospf-single-area': [
    'OSPF single area configuration Cisco lab',
    'router ospf 1 network area 0 wildcard mask',
    'Cisco OSPF neighbor adjacency verification',
    'show ip ospf neighbor show ip route ospf',
    'CCNA OSPF laboratory exercises'
  ],
  'wireshark-tcp-handshake': [
    'Wireshark TCP 3-way handshake analysis',
    'SYN SYN-ACK ACK packet capture pcap',
    'sequence number acknowledgment number analysis',
    'TCP window scale Wireshark trace'
  ]
};

export const ROADMAP_SPECIFIC_KEYWORDS: Record<string, string[]> = {
  networking: [
    'Network Engineer Roadmap 2026',
    'how to become a network engineer',
    'CCNA certification study roadmap',
    'step by step computer networking guide',
    'enterprise switching and routing curriculum',
    'packet analysis and network troubleshooting roadmap'
  ],
  'web-development': [
    'Fullstack Web Developer Roadmap',
    'modern frontend and backend engineering path',
    'React TypeScript Node.js learning roadmap',
    'REST API and database architecture roadmap'
  ],
  'linux-servers': [
    'Linux System Administrator Roadmap',
    'Linux sysadmin career progression',
    'server administration and devops roadmap',
    'systemd and shell automation learning path'
  ]
};

export const PROJECT_SPECIFIC_KEYWORDS: Record<string, string[]> = {
  'network-monitoring-dashboard': [
    'network monitoring telemetry dashboard open source',
    'real time packet latency visualizer',
    'TypeScript React Node.js WebSocket monitoring',
    'SNMP ICMP ping telemetry streaming',
    'zero allocation ring buffer Float32Array metrics',
    'Pugazhmani K engineering portfolio project'
  ]
};

/**
 * Resolve an enriched, deduplicated list of SEO keywords based on context
 */
export function getKeywordsForRoute(
  categorySlug?: string,
  topicSlug?: string,
  labSlug?: string,
  roadmapSlug?: string,
  projectSlug?: string
): string[] {
  const result = new Set<string>();

  // Always include top core brand keywords
  GLOBAL_KEYWORDS.slice(0, 5).forEach((kw) => result.add(kw));

  if (categorySlug && CATEGORY_KEYWORDS[categorySlug]) {
    CATEGORY_KEYWORDS[categorySlug].forEach((kw) => result.add(kw));
  }

  if (topicSlug && TOPIC_SPECIFIC_KEYWORDS[topicSlug]) {
    TOPIC_SPECIFIC_KEYWORDS[topicSlug].forEach((kw) => result.add(kw));
  }

  if (labSlug && LAB_SPECIFIC_KEYWORDS[labSlug]) {
    LAB_SPECIFIC_KEYWORDS[labSlug].forEach((kw) => result.add(kw));
  }

  if (roadmapSlug && ROADMAP_SPECIFIC_KEYWORDS[roadmapSlug]) {
    ROADMAP_SPECIFIC_KEYWORDS[roadmapSlug].forEach((kw) => result.add(kw));
  }

  if (projectSlug && PROJECT_SPECIFIC_KEYWORDS[projectSlug]) {
    PROJECT_SPECIFIC_KEYWORDS[projectSlug].forEach((kw) => result.add(kw));
  }

  return Array.from(result);
}
